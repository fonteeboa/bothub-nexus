import axios from 'axios';
import { config } from '../../config';
import { broadcastMessage } from '../../bots/telegram/controllers/commandController';

/**
 * Creates an instance of the axios client configured to interact with the Dev.to API.
 * The instance is authenticated using an API key from the configuration file.
 */
const devtoAPI = axios.create({
    baseURL: 'https://dev.to/api',
    headers: {
        'api-key': config.devTo.apiKey,
    },
});

/**
 * Asynchronous function that fetches posts for a specified user from the Dev.to API.
 * @param username - The username of the Dev.to user whose posts are to be fetched.
 * @returns An array of posts for the specified user.
 * @throws Will broadcast an error message and rethrow the error if the API request fails.
 */
export const getUserPosts = async (username: string) => {
    try {
        // Make a GET request to the Dev.to API to fetch posts for the specified user
        const response = await devtoAPI.get(`/articles?username=${username}`);
        return response.data;
    } catch (error) {
        // Broadcast an error message using the Telegram bot if the API request fails
        broadcastMessage('error_fetching_posts');
        throw error;
    }
};