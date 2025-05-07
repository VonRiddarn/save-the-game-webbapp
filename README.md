# 🎮 Save the Game

## 🧠 About

**Save the Game** is a web app for browsing video games, as well as characters and companies related to them.

You can:

-   🔖 Save games, companies, and characters as favorites
-   📝 Add personal notes
-   ✅ Mark games as _ongoing_ or _completed_ in your playlist

It's a personalized way to explore, track, and manage your gaming interests!

---

## 🚀 Getting Started

### 📦 Prerequisites

You’ll need **Twitch API credentials** (used to access the [IGDB API](https://api-docs.igdb.com)).

---

### 🔑 Don't have a client ID and secret?

1. Go to the official [IGDB API documentation](https://api-docs.igdb.com/#account-creation).
2. Follow the steps to create an app via the [Twitch Developer Console](https://dev.twitch.tv/console/apps).
3. Once created, you’ll receive a **Client ID** and **Client Secret**.
4. Reference screenshots (helpful!):
    - ![Twitch App Creation - Step 1](/repo/images/twitch-1.png)
    - ![Twitch App Creation - Step 2](/repo/images/twitch-2.png)

---

### ✅ Already have a client ID and secret?

Let’s go!!

1. **Clone the repo**

```bash
git clone https://github.com/your-username/save-the-game.git
cd save-the-game
```

2. **Install dependencies**

```bash
npm install
```

3. **Create your environment file**
   In root (the folder above `src`) create a file and call it: `.env.local`

4. **Add your credentials**

```bash
NEXT_PUBLIC_IGDB_CLIENT_ID=your_client_id_here
IGDB_CLIENT_SECRET=your_client_secret_here
```

Replace `your_client_id_here` and `your_client_secret_here` with your actual credentials from Twitch.

5. **Run the project**

```bash
npm run dev
```
