<template>
  <div class="mood-app">
    <div class="card">
      <h2>🧍 Mood Check-in</h2>
      
      <div class="form-group">
        <label for="name">Full Name</label>
        <input 
          id="name"
          v-model="name" 
          placeholder="Enter your name..." 
          :disabled="loading" 
        />

        <label for="mood">How are you feeling?</label>
        <textarea 
          id="mood"
          v-model="mood" 
          placeholder="Describe your current mood or thoughts..." 
          :disabled="loading"
        ></textarea>
        
        <button @click="submitMood" :disabled="loading || !mood">
          <span v-if="loading">⏳ Processing...</span>
          <span v-else>Submit Mood</span>
        </button>
      </div>

      <p v-if="error" class="error-msg">❌ {{ error }}</p>

      <div v-if="aiMessage" class="response-box">
        <h3>✨ AI Advisor:</h3>
        <p>{{ aiMessage }}</p>
      </div>
    </div>

    <div v-if="history.length > 0" class="history-section">
      <h3>📜 Recent History</h3>
      <ul>
        <li v-for="(item, index) in history" :key="index">
          <span class="time-stamp">{{ item.time }}</span>
          <span class="history-text">{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      name: '',
      mood: '',
      aiMessage: '',
      loading: false,
      error: null,
      history: [] 
    };
  },
  methods: {
    async submitMood() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.post('/', {
          full_name: this.name,
          mood_text: this.mood
        });
        
        this.aiMessage = res.data.ai_message;

        // Add to history list with current time
        this.history.unshift({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: this.mood
        });

        this.mood = ''; // Clear input field
      } catch (err) {
        this.error = "Connection failed. Please ensure the api-server is running on Port 5001.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Main Container */
.mood-app { 
  font-family: 'Segoe UI', Roboto, Arial, sans-serif; 
  max-width: 550px; 
  margin: 40px auto; 
  padding: 0 20px;
  color: #2d3748;
}

/* Main Card */
.card { 
  padding: 30px; 
  border-radius: 16px; 
  box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
  background: #ffffff; 
  border: 1px solid #e2e8f0; 
}

h2 { 
  margin: 0 0 20px 0; 
  color: #1a202c; 
  text-align: center;
  font-size: 1.6rem;
}

/* Form Styling */
.form-group { display: flex; flex-direction: column; gap: 8px; }

label {
  font-weight: 600;
  font-size: 14px;
  color: #4a5568;
  margin-top: 10px;
}

input, textarea { 
  padding: 12px; 
  border: 2px solid #edf2f7; 
  border-radius: 10px; 
  font-size: 15px; 
  transition: all 0.3s ease;
  font-family: inherit;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #42b883;
  background: #fff;
}

textarea { height: 100px; resize: vertical; }

/* Button Styling */
button { 
  margin-top: 15px;
  padding: 14px; 
  background: #42b883; 
  color: white; 
  border: none; 
  border-radius: 10px; 
  font-size: 16px; 
  font-weight: bold; 
  cursor: pointer; 
  transition: background 0.2s ease; 
}

button:hover { background: #33a06f; }
button:disabled { background: #cbd5e0; cursor: not-allowed; }

/* AI Response Box */
.response-box { 
  margin-top: 25px; 
  padding: 18px; 
  background: #f0fff4; 
  border-left: 6px solid #42b883; 
  border-radius: 8px; 
}

.response-box h3 { margin: 0 0 8px 0; color: #276749; font-size: 1.1rem; }
.response-box p { margin: 0; line-height: 1.5; color: #2d3748; }

/* History Section */
.history-section { 
  margin-top: 35px; 
  border-top: 2px solid #e2e8f0;
  padding-top: 20px;
}

.history-section h3 { font-size: 1.1rem; color: #718096; margin-bottom: 15px; }

.history-section ul { list-style: none; padding: 0; }

.history-section li { 
  display: flex;
  justify-content: space-between;
  padding: 12px; 
  background: #f8fafc;
  margin-bottom: 8px;
  border-radius: 8px;
  font-size: 14px; 
  border: 1px solid #edf2f7;
}

.time-stamp { font-weight: bold; color: #42b883; margin-right: 15px; white-space: nowrap; }
.history-text { color: #4a5568; text-align: right; }

/* Error Message */
.error-msg { 
  color: #e53e3e; 
  background: #fff5f5; 
  padding: 12px; 
  border-radius: 8px; 
  margin-top: 15px; 
  font-size: 14px;
  text-align: center;
  border: 1px solid #feb2b2;
}
</style>