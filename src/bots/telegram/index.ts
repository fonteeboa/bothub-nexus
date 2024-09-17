import punycode from 'punycode';
import { start } from './controllers/commandController';
import { config } from '../../config';

/**
 * Function to initialize the Telegram bot.
 * Checks if the Telegram bot is enabled in the configuration and starts it if enabled.
 * Logs a message indicating whether the bot was started successfully or if it is disabled.
 */
export const initTelegramBot = () => {
    if (config.telegram.enabled) {
        start();
        console.info('Telegram bot started successfully!');
    } else {
        console.warn('Telegram bot is disabled in the configuration.');
    }
};