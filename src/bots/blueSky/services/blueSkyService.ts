import { BskyAgent } from '@atproto/api';
import { config } from '../../../config';
import { broadcastMessage } from '../../telegram/controllers/commandController';

/**
 * Creates an instance of the BskyAgent class, which is used to interact with the Blue Sky API.
 * The instance is configured to use the Blue Sky service URL.
 */
const agent = new BskyAgent({
    service: 'https://bsky.social',
});

/**
 * Authenticates the agent with the Blue Sky service using credentials from the configuration.
 * Logs a message indicating whether authentication was successful or failed.
 * @throws Will throw an error if authentication fails.
 */
async function authenticate() {
    try {
        await agent.login({
            identifier: config.blueSky.username!,
            password: config.blueSky.password!,
        });
        console.info('Authenticated with Blue Sky');
    } catch (error) {
        console.error('Authentication failed:', error);
        throw new Error('Failed to authenticate with Blue Sky');
    }
}

/**
 * Logs out the agent from the Blue Sky service.
 * Logs a message indicating whether logout was successful or failed.
 */
async function logout() {
    try {
        await agent.logout();
        console.info('Logged out from Blue Sky');
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

/**
 * Creates a post on Blue Sky with the specified message.
 * Authenticates the agent, creates the post, and logs out the agent.
 * Broadcasts a message to Telegram if configured.
 * @param message - The message content to be posted to Blue Sky.
 * @returns The response from the Blue Sky API.
 * @throws Will throw an error if creating the post fails.
 */
export async function createPost(message: any) {
    await authenticate();

    try {
        const response = await agent.post({ text: message });

        if (!response) {
            throw new Error('Failed to create post');
        }

        // Send a message to Telegram if configured
        if (config.telegram.enabled) {
            const telegramMessage = `Novo post no Blue Sky: ${message}`;
            await broadcastMessage(telegramMessage);
        }

        return response;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    } finally {
        await logout();
    }
}