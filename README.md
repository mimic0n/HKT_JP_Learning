# 🌸 HKT JP Learning - Washi Blossom

Welcome to the **HKT_JP_Learning** project! This is a personal Spaced Repetition System (SRS) web application designed specifically for learning Japanese Vocabulary and Kanji.

## 🌟 Special Features

- **Spaced Repetition System (SRS)**: Integrates the SM-2 algorithm to automatically schedule vocabulary reviews based on your memory retention, optimizing your learning process.
- **Interactive Flashcards**: A smooth and interactive flashcard UI that makes daily studying and memorization effortless and effective.
- **Daily Review Tracking**: The system automatically calculates and displays exactly how many words you need to review today.
- **Vocabulary Management (CRUD)**: Allows you to freely add, edit, delete, and manage your own custom Kanji/Vocabulary lists.
- **Kana Charts**: Built-in Hiragana and Katakana tables for quick reference without leaving the app.
- **Unique "Washi Blossom" Aesthetic**: A stunning visual experience blending **Glassmorphism**, **Neomorphism**, and **Skeuomorphism** (simulating washi paper, bamboo wood, and calligraphy ink). The design evokes the peaceful, poetic feeling of "studying late at night under a cherry blossom tree."

## 🛠️ Technologies Used

### Frontend (`/frontend`)
- **React 19** & **Vite**: Builds a modern user interface, providing a smooth experience with lightning-fast build times.
- **React Router DOM v7**: Handles flexible page navigation in this Single Page Application (SPA).
- **Lucide React**: A minimalist, beautiful, and consistent icon library.
- **Custom CSS**: The UI is styled with pure CSS (Vanilla CSS) utilizing powerful CSS variables for the Color System, completely independent of any UI frameworks like Tailwind.

### Backend (`/backend`)
- **Node.js** & **Express.js**: Provides a lightweight, stable, and highly responsive RESTful API architecture.
- **SQLite3** (`better-sqlite3`): A local database (contained in a single `.db` file), highly optimized for a personal application without the need to install or configure complex database servers.
- **CORS**: Configured to ensure seamless and secure communication between the Frontend and Backend.

## 📁 Project Structure

- `frontend/`: Contains the source code for the React web application (User Interface).
- `backend/`: Contains the Express server, API logic, SRS algorithms, and the SQLite database.
- `Design MD/`: Contains detailed design specifications, system architecture, and UI/UX guidelines (`DesignFE.md`, `DesignBE.md`).

## 🚀 Getting Started

This project is designed primarily to run in a local environment.

1. **Start the Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
