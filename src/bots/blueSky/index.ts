import { config } from '../../config';
import { broadcastMessage } from '../telegram/controllers/commandController';
import { handlePostRequest } from './controllers/blueSkyController';

/**
 * Checks if the Blue Sky service is active.
 * Logs a warning and broadcasts a message if the service is disabled.
 * @returns A boolean indicating whether the Blue Sky service is enabled.
 */
function isBlueSkyActive() {
    if (!config.blueSky.enabled) {
        console.warn('Blue Sky Service is disabled.');
        broadcastMessage('Blue Sky Service is disabled.');
        return false;
    }
    return true;
}

/**
 * Function to post a message to Blue Sky.
 * Checks if the Blue Sky service is active before attempting to post.
 * Broadcasts a success or error message based on the outcome of the post operation.
 * @param message - The message content to be posted to Blue Sky.
 * @returns A boolean indicating whether the post operation was successful.
 */
export async function postToBlueSky(message: any) {
    if (!isBlueSkyActive()) return false;

    try {
        await handlePostRequest(message);
        await broadcastMessage('Post sent successfully to Blue Sky.');
        return true;
    } catch (error) {
        console.error('Error during Blue Sky Service post operation:', error);
        broadcastMessage('Error during Blue Sky Service post operation:');
        return false;
    }
}