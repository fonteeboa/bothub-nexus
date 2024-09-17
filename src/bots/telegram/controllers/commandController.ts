import { bot } from '../telegramBot';
import { config } from '../../../config';
import { sendCustomMessage, handleMessage } from '../services/telegramService';

/**
 * Starts the Telegram bot and listens for incoming messages.
 * For each received message, the handleMessage function is called to process it.
 */
export const start = () => {
    bot.on('message', (msg: any) => {
        handleMessage(msg, config.telegram.chatIds, bot);
    });
};

/**
 * Function to broadcast messages to all configured chat IDs.
 * Sends a custom message to each chat ID specified in the configuration.
 * @param message - The message content to be broadcasted.
 * @returns A boolean indicating whether the broadcast was successful.
 */
export const broadcastMessage = async (message: any) => {
    try {
        const sendMessages = config.telegram.chatIds.map(async (chatId) => {
            await sendCustomMessage(chatId, message, bot);
        });
        await Promise.all(sendMessages);
        return true;
    } catch (error) {
        console.error(`Error broadcasting message: ${error}`);
        return false;
    }
};