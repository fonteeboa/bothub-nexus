import { config } from '../../config';
import TelegramBot from 'node-telegram-bot-api';

/**
 * Checks if the Telegram bot is enabled in the configuration file.
 * Throws an error if the bot token is missing.
 */
if (!config.telegram.botToken) {
    throw new Error('Telegram bot token is missing in the configuration.');
}

/**
 * Creates a singleton instance of the Telegram bot.
 * The bot is configured to use polling to receive updates.
 */
export const bot = new TelegramBot(config.telegram.botToken, { polling: true });