import { getUserPosts } from './devToService';
import EventEmitter from '../../utils/eventEmitter';
import { config } from '../../config';
import { broadcastMessage } from '../../bots/telegram/controllers/commandController';
import { calculateDiffHours } from '../../utils/helpers';

/**
 * Asynchronous function that monitors Dev.to posts for a specified user.
 * Uses the Dev.to API to list posts and emits events for newly published posts.
 */
export const monitorPosts = async () => {
    try {
        // Check if the Dev.to username is set in the configuration
        if (!config.devTo.username) {
            return false;
        }

        // Fetch the list of posts for the specified user using the Dev.to API
        const posts = await getUserPosts(config.devTo.username);

        // Iterate over each received post
        posts.forEach((post: any) => {
            const postDate = new Date(post.published_at);

            // Check if the post was recently published using the calculateDiffHours function
            if (calculateDiffHours(postDate)) {
                // Emit an event for each newly published post
                EventEmitter.emit('devto:newPost', post);
            }
        });
    } catch (error) {
        // Log an error to the console if there is an issue monitoring Dev.to posts
        console.error('Error monitoring Dev.to posts:', error);

        // Broadcast an error message using the Telegram bot
        broadcastMessage('error_monitoring_posts');
    }
};