# 🐾 Pawfect Match — Premium Pet Playmate Matching & Wellness Platform

Pawfect Match is a modern, pet-first web application designed to help pet parents discover compatible playmates for their dogs and cats, organize neighborhood playdates, track comprehensive health & vaccination records, and verify official veterinary certifications.

---

## ✨ Features

- 🐶 **Tinder-Style Playmate Discovery**: Smooth swipe deck powered by Framer Motion with compatibility percentages, energy match metrics, and play style breakdown.
- 📸 **Custom Profile Photos**: Pet parents can upload custom photos for both their companion and themselves using the device camera or photo library.
- 🛡️ **Mandatory Vaccine Health Certification**: Registration guardrail requiring official veterinary vaccination records to ensure every playmate is medically verified for safe, off-leash outdoor play.
- 📄 **Digital Vaccine Certificate & Download**: Viewable official veterinary health certificate document with instant high-resolution download (`.png` / `.pdf`).
- 🩺 **Health & Wellness Companion**: Weight logs, booster reminders, preventative medication tracking, clinic direct dial simulator, and breed-specific health advisors.
- 📅 **Playdate Scheduling & Map Spots**: Propose meetups at local dog parks, coordinate times in chat, and sync dates to Google Calendar or Apple Calendar (`.ics`).
- 🔐 **Supabase Authentication**: Secure email signup/login, session persistence, and instant Guest Mode bypass.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Icons & UI**: Lucide React, Canvas Confetti
- **Authentication**: Supabase Auth (`@supabase/supabase-js`)
- **Document Engine**: HTML5 Canvas certificate generation & instant download

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pawfect-match.git
   cd pawfect-match
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Production Build

To build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

---

## 📄 License

MIT License. Designed with ❤️ for pets and pet parents everywhere.
