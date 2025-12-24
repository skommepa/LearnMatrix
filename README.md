# LearnMatrix - Student Learning Hub
![LearnMatrix Home](https://github.com/skommepa/LearnMatrix/blob/main/screenshots/Home%20Page.png?raw=true)

**LearnMatrix** is a comprehensive Student Learning Hub designed for the **FBLA Website Design Competition (2025-2026)**. The topic "Design to Learn" focuses on creating a platform where students can access resources, track progress, and collaborate in real-time.

## 🚀 Live Demo
[Insert Deployment Link Here]

## 🌟 Key Features

### 1. **Student Personalization (FBLA Requirement)**
- **Dashboard (`/dashboard.html`)**: A personalized view for students to track their progress in AP courses (Micro, Macro, Stats, Euro).
- **Gamification**: Includes "Streak" counters and progress bars to motivate learning.

### 2. **Collaboration Tools**
- **Live Schedule (`/schedule.html`)**: A booking system for live tutoring sessions, study groups, and workshops.
- **Interactive Calendar**: Filter sessions by day to easily find group study opportunities.

### 3. **Academic Resources**
- **AP Subject Hubs**: Dedicated pages for AP Microeconomics, Macroeconomics, Statistics, and European History.
- **Unit Reviews**: Structured access to unit videos, notes (via "ATT" icon), and practice problems.

### 4. **FBLA Compliance**
- **Citations Page (`/citations.html`)**: strict adherence to copyright guidelines, listing all AI-generated assets, libraries, and fonts.
- **Responsive Design**: Fully functional on Mobile, Tablet, and Desktop devices (featuring a custom Hamburger Menu).

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3 (Custom Properties/Variables), Vanilla JavaScript
- **Backend (Local Dev)**: Node.js, Express.js (for serving static files and simulating an app environment)
- **Deployment**: Ready for Heroku / GitHub Pages

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/skommepa/LearnMatrix.git
    cd LearnMatrix
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the local server**
    ```bash
    npm run start
    ```
    The app will listen on `http://localhost:3000`.

## 📁 Project Structure
```
LearnMatrix/
├── src/
│   ├── assets/
│   │   ├── css/        # Global styles & Responsive CSS
│   │   ├── js/         # Mobile menu logic & interactions
│   │   └── images/     # Logos, AI-generated assets, & icons
│   ├── resources/      # AP specific content pages
│   ├── index.html      # Landing Page
│   ├── dashboard.html  # Student Dashboard
│   ├── schedule.html   # Live Session Booking
│   ├── citations.html  # Copyright & Credits
│   └── ...
├── server.js           # Express server entry point
├── package.json
└── README.md
```

## 📜 License & Copyright
This project is created for educational purposes as part of the FBLA 2025-2026 competition. All original assets are copyright LearnMatrix. External libraries and fonts are used under their respective open-source licenses (see `/citations.html`).
