<template>
  <div class="mood-app">
    <h2>🧍 Mood Check-in</h2>

    <div class="form-group">
      <label for="name">Full Name</label>
      <input
        id="name"
        v-model="name"
        placeholder="Enter your full name..."
      />

      <label for="mood">How are you feeling?</label>
      <textarea
        id="mood"
        v-model="mood"
        placeholder="Describe your current mood..."
      ></textarea>

      <button @click="submitEntry" :disabled="!name || !mood">
        Submit Mood
      </button>
    </div>

    <div class="chatbox" ref="chatbox">
      <div
        v-for="(entry, index) in history"
        :key="index"
        :class="['message', entry.sender]"
      >
        <p>{{ entry.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'; 

export default {
  name: "MoodForm",
  data() {
    return {
      name: "",
      mood: "",
      history: [],
    };
  },
  methods: {
    getAIResponse(moodText) {
      const lower = moodText.toLowerCase();
      if (lower.includes("happy") || lower.includes("joy") || lower.includes("excited")) {
        return "That's wonderful! Keep spreading positivity 😊";
      } else if (lower.includes("sad") || lower.includes("down") || lower.includes("crying")) {
        return "I'm sorry to hear that. Remember to take deep breaths and maybe talk to someone you trust 💛";
      } else if (lower.includes("angry") || lower.includes("frustrated")) {
        return "It’s okay to feel anger. Try calming exercises or go for a short walk 💨";
      } else if (lower.includes("anxious") || lower.includes("nervous")) {
        return "Take a few moments to breathe deeply. Mindfulness helps 🧘‍♀️";
      } else {
        return "Thank you for sharing your feelings! Every emotion is valid 🌟";
      }
    },
    async submitEntry() {
      // 1. Capture current values
      const currentName = this.name;
      const currentMood = this.mood;

      // 2. Add user message to the UI history
      this.history.push({
        sender: "user",
        text: `${currentName}: ${currentMood}`,
      });

      // 3. Send to Backend (Render -> Railway)
      try {
        await api.post('/mood', {
          full_name: currentName,
          mood_text: currentMood
        });
        console.log("✅ Data saved to Railway successfully!");
      } catch (error) {
        console.error("❌ Database error:", error);
        this.history.push({
          sender: "ai",
          text: "System: Note saved locally, but database connection failed."
        });
      }

      // 4. Generate and show AI response
      const aiReply = this.getAIResponse(currentMood);
      this.history.push({
        sender: "ai",
        text: `AI Advisor: ${aiReply}`,
      });

      // 5. Reset input and scroll down
      this.mood = "";
      this.$nextTick(() => {
        const box = this.$refs.chatbox;
        if (box) {
          box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
        }
      });
    },
  },
};
</script>

<style scoped>
.mood-app {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

h2 { color: #2c3e50; text-align: center; }

.form-group { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
  margin-bottom: 25px; 
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

label { font-weight: bold; color: #4a5568; }

input, textarea { 
  padding: 12px; 
  border-radius: 8px; 
  border: 1px solid #cbd5e0; 
  font-size: 16px;
}

textarea { resize: vertical; min-height: 80px; }

button { 
  padding: 12px; 
  background: #42b883; 
  color: white; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer; 
  font-weight: bold;
  font-size: 16px;
  transition: background 0.3s;
}

button:hover { background: #3aa876; }
button:disabled { background: #cbd5e0; cursor: not-allowed; }

.chatbox { 
  max-height: 350px; 
  overflow-y: auto; 
  background: #edf2f7; 
  padding: 15px; 
  border-radius: 8px; 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
}

.message { 
  padding: 12px 16px; 
  border-radius: 18px; 
  max-width: 85%; 
  line-height: 1.4;
}

.user { 
  background: #42b883; 
  color: white; 
  align-self: flex-end; 
  border-bottom-right-radius: 2px;
}

.ai { 
  background: #ffffff; 
  color: #2d3748; 
  align-self: flex-start; 
  border-bottom-left-radius: 2px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
</style>