<template>
  <div class="mood-app">
    <h2>🧍 Mood Check-in</h2>

    <div class="form-group">
      <label for="name">Full Name</label>
      <input
        id="name"
        v-model="name"
        placeholder="Enter your full name..."
        :disabled="loading"
      />

      <label for="mood">How are you feeling?</label>
      <textarea
        id="mood"
        v-model="mood"
        placeholder="Describe your current mood..."
        :disabled="loading"
      ></textarea>

      <button @click="submitEntry" :disabled="!name || !mood || loading">
        {{ loading ? 'Saving...' : 'Submit Mood' }}
      </button>
    </div>

    <div class="chatbox" ref="chatbox">
      <!-- Welcome message -->
      <div v-if="history.length === 0 && !loading" class="message ai">
        <p>AI Advisor: Hello! How can I help you today?</p>
      </div>

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
      loading: false,
    };
  },
  mounted() {
    this.fetchHistory(); 
  },
  methods: {
    async fetchHistory() {
      try {
        const response = await api.get('/mood-history');
        
        // Ensure we handle both { data: [...] } and direct array responses
        const rawData = response.data?.data || response.data || [];
        
        // Map backend columns to frontend chat display
        const formattedHistory = [];
        rawData.forEach(entry => {
          formattedHistory.push({ 
            sender: "user", 
            text: `${entry.full_name || 'User'}: ${entry.mood_text || entry.mood}` 
          });
          formattedHistory.push({ 
            sender: "ai", 
            text: `AI Advisor: ${entry.ai_response || 'Thinking...'}` 
          });
        });

        // Show newest messages at the bottom
        this.history = formattedHistory;
        this.scrollToBottom();

      } catch (error) {
        console.error("❌ Error loading history:", error.message);
      }
    },

    async submitEntry() {
      if (this.loading) return;

      // Ensure the payload keys match exactly what your backend checks
   const payload = {
  full_name: this.name, // Matches 'full_name' in your table
  mood_text: this.mood   // Matches 'mood_text' in your table
};

      this.loading = true;

      try {
        const response = await api.post('/mood', payload);
        
        // Check for success and handle different possible AI reply keys
        if (response.data.success) {
            const aiMsg = response.data.ai_reply || response.data.ai_response;

            // Update UI
            this.history.push({
              sender: "user",
              text: `${this.name}: ${this.mood}`
            });

            this.history.push({
              sender: "ai",
              text: `AI Advisor: ${aiMsg}`
            });

            this.mood = ""; // Clear only the mood field
        }

      } catch (error) {
        // Detailed diagnostic for Lab 7
        console.error("❌ API Failure:", error.response?.data?.error || error.message);
        
        this.history.push({
          sender: "ai",
          text: `System Error: ${errorDetail}.`
        });
      } finally {
        this.loading = false;
        this.scrollToBottom();
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const box = this.$refs.chatbox;
        if (box) box.scrollTop = box.scrollHeight;
      });
    }
  }
};
</script>