# 🧩 Bothub Nexus

Para a versão em português deste README, clique [aqui](README.md).

## 🌐 Project Overview

**Bothub Nexus** is a comprehensive **monitoring and notification system** designed to track activities across multiple platforms, including **GitHub**, **Dev.to**, and **Blue Sky**. By fetching data from these platforms via their APIs, it processes and broadcasts notifications to a **Telegram bot**. The project is built using **TypeScript** and leverages a variety of libraries and services to provide real-time monitoring and posting capabilities.

## 🔑 Key Features

### GitHub Monitoring

- Monitors notifications and repositories for the authenticated user.
- Fetches recent releases from repositories.
- Emits events for new notifications and repositories.

### Dev.to Monitoring

- Fetches posts for the specified user.
- Iterates over each post and checks if it was recently published using `calculateDiffHours`.
- Emits events for newly published posts.

### Blue Sky Posting

- Posts updates to Blue Sky via the **`/post`** command in Telegram.
- Authenticates with Blue Sky using user credentials.
- Broadcasts messages to Telegram upon successful posting.

### Telegram Bot Integration

- Receives commands and messages from users.
- Posts to **Blue Sky** via **Telegram** using the `/post` command.
- Broadcasts notifications and updates to configured chat IDs.
- Supports localization for **English** and **Portuguese**.

### Localization

**Bothub Nexus** supports localization in **English** and **Portuguese** via **i18next**. Translation files are located in the `locales` directory, and the localization settings are initialized in `i18n.ts`.

## 🛠 Technical Details

### Configuration

Bothub Nexus uses **environment variables** to manage configuration settings. These settings are loaded from a `.env` file using the **dotenv** package. The configuration includes API keys, usernames, and other credentials necessary for the services being monitored.

## 📂 Project Structure

```bash
bothutb-nexus
├── src
│   ├── bots
│   │   ├── blueSky
│   │   │   ├── controllers
│   │   │   └── services
│   │   ├── telegram
│   │   │   ├── controllers
│   │   │   └── services
│   ├── config
│   ├── controllers
│   │   ├── devto
│   │   └── github
│   ├── listeners
│   ├── locales
│   │   ├── en
│   │   └── pt
│   ├── services
│   │   ├── devto
│   │   └── github
│   ├── test
│   │   ├── mocks
│   │   └── src
│   └── utils
```

### Directory Descriptions

- **src/bots**:
  - **blueSky**: Directory for the logic related to Blue Sky platform.
    - **controllers**: Handles interactions and post management for Blue Sky.
    - **services**: Contains services that handle API requests to Blue Sky.
  - **telegram**: Directory for integration with the Telegram Bot.
    - **controllers**: Manages commands received from the Telegram bot.
    - **services**: Handles API requests to the Telegram Bot API.

- **src/config**: Configuration files used across the project for different settings.

- **src/controllers**:
  - **devto**: Controllers responsible for monitoring and processing posts on Dev.to.
  - **github**: Controllers that monitor notifications and releases from GitHub.

- **src/listeners**: Configuration of listeners to capture events and respond to system actions.

- **src/locales**:
  - **en**: Translation files for English.
  - **pt**: Translation files for Portuguese.

- **src/services**:
  - **devto**: Services that handle communication with the Dev.to API.
  - **github**: Services that manage communication with the GitHub API to retrieve data for notifications, releases, etc.

- **src/test**:
  - **mocks**: Contains mock data used for unit testing.
  - **src**: Directory containing unit and integration tests.

- **src/utils**: Utility functions and helpers to facilitate code reuse across different parts of the project.

This structure is designed to be modular, ensuring easy maintenance and scalability, with each functionality clearly separated into specific folders.

### 🧪 Unit Tests (Coming in the Next PR)

The project structure includes the **test** folder, which will contain **unit tests** and **integration tests**. These tests are currently under development and will be included in the next PR. Mock data is already in place, ready to support comprehensive testing. Stay tuned for future updates!

## ⚙️ How It Works

### Initialization

- Loads environment settings from the `.env` file.
- Initializes the Telegram bot and sets up event listeners for monitoring activities on **GitHub** and **Dev.to**.

### Monitoring

- **GitHub** and **Dev.to** monitoring tasks are scheduled to run at specific intervals using **node-cron**.
- The monitoring functions fetch data from their respective APIs and emit events for any new activities.

### Event Handling

- Event listeners capture these emitted events and broadcast messages to the **Telegram bot**.
- The **Telegram bot** handles incoming messages and executes commands such as posting updates to **Blue Sky** via the `/post` command.
- Any errors during API requests are logged and can be broadcasted to the Telegram bot for real-time tracking.

## 🕒 Cron Scheduling

The project uses **cron jobs** to schedule monitoring tasks. The following job is scheduled to run daily at **7 AM**:

```javascript
cron.schedule('0 7 * * *', async () => {
    console.log('Starting daily monitoring at 7 AM...');
    await monitorReleases(); // Or monitorNotifications
    console.log('Monitoring completed.');
});
```

## How to Run

Clone the repository:

```bash
git clone https://github.com/your-username/bothub-nexus.git
cd bothub-nexus
```

Install dependencies:

```bash
npm install
```

Create and configure .env file: Add your API tokens and keys to the .env file:

```ini
# Telegram bot authentication token
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN

# Chat IDs that will receive notifications on Telegram (comma-separated if more than one)
TELEGRAM_CHAT_IDS=YOUR_TELEGRAM_CHAT_IDS

# Blue Sky account username
BLUESKY_USERNAME=YOUR_BLUESKY_USERNAME

# Blue Sky account password
BLUESKY_PASSWORD=YOUR_BLUESKY_PASSWORD

# GitHub authentication token for API access
GITHUB_TOKEN=YOUR_GITHUB_TOKEN

# GitHub username
GITHUB_USERNAME=YOUR_GITHUB_USERNAME

# Dev.to API key
DEV_TO_API_KEY=YOUR_DEVTO_API_KEY

# Dev.to username
DEV_TO_USERNAME=YOUR_DEVTO_USERNAME
```

Start the project:

```bash
npm start
```

Once running, Bothub Nexus will monitor activities across platforms and send notifications to the configured Telegram bot. You can also use the /post (message) command to post updates to Blue Sky.

## 📱 Usage

Interact with the Telegram bot using the following commands:

```bash
/start: Initialize the bot and start receiving notifications.
/post (message): Posts the specified message to Blue Sky and sends a success confirmation to Telegram.
```

The bot will automatically monitor and notify about:

- GitHub notifications and releases.
- Dev.to posts.

## 🤝 Contributing

We welcome contributions from the community! Feel free to submit issues, pull requests, and suggestions for improvements. For significant changes, please open an issue first to discuss the proposed changes.

## 📄 License

Bothub Nexus is licensed under the MIT License. You are free to use, modify, and distribute this project with proper attribution.
