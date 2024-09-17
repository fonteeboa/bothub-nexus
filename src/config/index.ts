import dotenv from 'dotenv';
dotenv.config();

/**
 * Configuration object that holds various service settings.
 * These settings are loaded from environment variables using the dotenv package.
 */
export const config = {
    telegram: {
        enabled: !!process.env.TELEGRAM_BOT_TOKEN && !!process.env.TELEGRAM_CHAT_IDS,
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatIds: process.env.TELEGRAM_CHAT_IDS ? process.env.TELEGRAM_CHAT_IDS.split(',') : [],
    },
    blueSky: {
        enabled: !!process.env.BLUESKY_USERNAME && !!process.env.BLUESKY_PASSWORD,
        username: process.env.BLUESKY_USERNAME,
        password: process.env.BLUESKY_PASSWORD,
    },
    github: {
        enabled: !!process.env.GITHUB_TOKEN && !!process.env.GITHUB_USERNAME,
        token: process.env.GITHUB_TOKEN,
        username: process.env.GITHUB_USERNAME,
    },
    devTo: {
        enabled: !!process.env.DEV_TO_API_KEY && !!process.env.DEV_TO_USERNAME,
        apiKey: process.env.DEV_TO_API_KEY,
        username: process.env.DEV_TO_USERNAME,
    },
};
