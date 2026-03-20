Mental Health & Wellness Companion (Lab 7)
A full-stack, AI-powered mood tracking application designed to provide empathetic support and maintain a relational history of user check-ins. Developed as part of SE2 Laboratory 7.

Live Links
Frontend (UI): https://aishtria.github.io/mental-health-ui/

Backend (API): [Your-Render-URL-Here]

Key Features
Aesthetic UI: A responsive, mobile-friendly interface with a calming pink and purple theme.

AI Advisor: Integrated with Groq (Llama 3.3-70B) to provide context-aware, empathetic feedback.

Auto-User Registration: Automatically detects new users and registers them in the database.

Relational Data: Uses MySQL (Railway) with a Foreign Key relationship between users and mood_entries.

Tech Stack
Frontend: Vue.js 3, Vite, Axios

Backend: Node.js, Express.js

AI Engine: Groq SDK (Llama-3.3-70b-versatile)

Database: MySQL (hosted on Railway)

Deployment: GitHub Pages (Frontend) and Render (Backend)

Database Schema
This project uses a relational structure:

users: Stores user identity (id, full_name, email).

mood_entries: Stores moods linked to users via user_id (Foreign Key).

Developer
Trishia Soriano (3rd Year Computer Science Student / Frontend and UI/UX Developer)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
