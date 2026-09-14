# 🐾 Pawfect Match — Premium Pet Playmate Matching & Wellness Platform

Pawfect Match is a modern, pet-first web application designed to help pet parents discover compatible playmates for their dogs and cats, organize neighborhood playdates, track comprehensive health & vaccination records, and verify official veterinary certifications.

---

## ✨ Features

- 🐶 **Tinder-Style Playmate Discovery**: Smooth swipe deck powered by Framer Motion with compatibility percentages, energy match metrics, and play style breakdown.
- 📸 **Custom Profile Photos**: Pet parents can upload custom photos for both their companion and themselves using the device camera or photo library.
- 🛡️ **Private Vaccine Document Intake**: Type/size validation, SHA-256 fingerprinting, private Supabase Storage, and an explicit pending-review state. Uploading never automatically grants medical verification.
- 📄 **Private Vaccine Record Access**: Authenticated owners receive short-lived signed links to their original documents.
- 🩺 **Health & Wellness Companion**: Weight logs, booster reminders, preventative medication tracking, clinic direct dial simulator, and breed-specific health advisors.
- 📅 **Playdate Scheduling & Map Spots**: Propose meetups at local dog parks, coordinate times in chat, and sync dates to Google Calendar or Apple Calendar (`.ics`).
- 🔐 **Supabase Authentication & Persistence**: Secure email signup/login, row-level-security-protected cloud state, and local-only guest mode.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Icons & UI**: Lucide React, Canvas Confetti
- **Authentication**: Supabase Auth (`@supabase/supabase-js`)
- **Document Engine**: HTML5 Canvas certificate generation & instant download

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22.12 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ambi35912-ship-it/PawfectMatch.git
   cd PawfectMatch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the Supabase table, storage bucket, and row-level-security policies by running [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor.

4. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are browser-safe Supabase project settings. `GROQ_API_KEY` is server-only and must be configured in Vercel—never expose it through a `VITE_` variable.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to:
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

### Quality checks

```bash
npm run lint
npm test
npm audit
```

GitHub Actions runs linting, tests, a production build, and a production-dependency audit for every pull request.

## Product boundaries

- The included discovery profiles, matches, and incoming messages are demo fixtures.
- User changes persist locally in guest mode and sync to the authenticated user's private Supabase row after the schema is installed.
- Chat notes are private user data, not live two-party messaging. Production two-party chat requires a server-owned match-membership model and participant-level authorization.
- Veterinary documents remain **pending review** until a qualified reviewer approves them. File validation or OCR must never be presented as medical verification.

## Security response

If a credential has ever been committed, revoke it at the provider before deploying. Removing it from the current source does not invalidate copies in Git history.

---

## 📄 License

MIT License. Designed with ❤️ for pets and pet parents everywhere.
