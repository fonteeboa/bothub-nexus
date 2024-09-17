import cron from 'node-cron';
import { broadcastMessage } from '../../bots/telegram/controllers/commandController';
import { monitorRepos } from '../../services/github/monitorRepos';
import { monitorNotifications } from '../../services/github/monitorNotifications';
import { config } from '../../config';

/**
 * Function to start monitoring Github posts.
 * Sets up a cron job to run the monitoring function at a specified interval.
 */
export const startGitHubMonitoring = () => {
    if (config.devTo.enabled) {
        console.info('Starting Github posts monitoring...');

        // Cron configuration to run every minute (adjust as needed)
        cron.schedule('0 7 * * *', async () => {
            try {
                // Calls the function that monitors posts
                //await monitorRepos();  
                // Calls the function that monitors notifications
                await monitorNotifications();  
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
 * Sends a message indicating whether the Github monitoring service is enabled or disabled.
 */
const logStatus = async () => {
    const key = config.github.enabled ? 'Github monitoring started.' : 'Github service is disabled.';

    try {
        await broadcastMessage(key);  // Sends a status message to Telegram
        console.info(`Message sent to Telegram: ${key}`);
    } catch (error) {
        console.error(`Error sending message to Telegram: ${error}`);
    }
};