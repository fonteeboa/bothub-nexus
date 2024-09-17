import cron from 'node-cron';
import { broadcastMessage } from '../../bots/telegram/controllers/commandController';
import { monitorPosts } from '../../services/devto/monitorPosts';
import { config } from '../../config';

/**
 * Function to start monitoring Dev.to posts.
 * Sets up a cron job to run the monitoring function at a specified interval.
 */
export const startMonitoring = () => {
    if (config.devTo.enabled) {
        console.info('Starting Dev.to posts monitoring...');
        // Cron configuration to run every minute (adjust as needed)
        cron.schedule('0 7 * * *', async () => {
            try {
                await monitorPosts();  // Calls the function that monitors posts
                console.info('Posts monitored successfully.');
            } catch (error) {
                console.error(`Error monitoring posts: ${error}`);
            }
        });
    }
    logStatus();
};

/**
 * Function to send status to Telegram and log it to the console.
 * Sends a message indicating whether the Dev.to monitoring service is enabled or disabled.
 */
const logStatus = async () => {
    const key = config.devTo.enabled ? 'Dev.to monitoring started.' : 'Dev.to service is disabled.';

    try {
        await broadcastMessage(key);  // Sends a status message to Telegram
        console.info(`Message sent to Telegram: ${key}`);
    } catch (error) {
        console.error(`Error sending message to Telegram: ${error}`);
    }
};