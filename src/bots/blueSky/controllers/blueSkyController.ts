import { createPost } from '../services/blueSkyService';

/**
 * Handles a post request to create a new post on Blue Sky.
 * Calls the createPost function and logs the outcome.
 * @param message - The message content to be posted to Blue Sky.
 */
export async function handlePostRequest(message: any) {
    try {
        await createPost(message);
        console.info('Post successfully created on Blue Sky.');
    } catch (error) {
        console.error('Error handling post request:', error);
    }
}