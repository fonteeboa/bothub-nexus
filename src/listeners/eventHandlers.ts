import EventEmitterUtil from '../utils/eventEmitter';
import { postToBlueSky } from '../bots/blueSky';
import { broadcastMessage } from '../bots/telegram/controllers/commandController';
import i18n from '../config/i18n';
import { config } from '../config';
import { getLanguageFromChat } from '../utils/helpers';
import { startMonitoring } from '../controllers/devto';
import { startGitHubMonitoring } from '../controllers/github';

/**
 * Function to initialize all event listeners.
 * Sets up listeners for new Dev.to posts, new GitHub repositories, and GitHub notifications.
 */
export const initListeners = () => {
    // Start monitoring Dev.to posts
    startMonitoring();
    
    // Start monitoring GitHub repositories and notifications
    startGitHubMonitoring();

    // Listener for new articles published on Dev.to
    EventEmitterUtil.on('devto:newPost', async (article: any) => {
        // Get the language of the chat for localization
        const lang = await getLanguageFromChat(config.telegram.chatIds[0]);
        // Translate the message for a new article
        const message = i18n.t('new_article_published', { lng: lang, title: article.title, url: article.url });

        try {
            // Broadcast the message to Telegram and BlueSky
            await broadcastMessage(message);
            await postToBlueSky(message);
        } catch (error) {
            // Broadcast an error message if notification fails
            broadcastMessage(`Error notifying Dev.to article: ${error}`);
        }
    });

    // Listener for new repositories created on GitHub
    EventEmitterUtil.on('github:newRepo', async (repo: any) => {
        // Get the language of the chat for localization
        const lang = await getLanguageFromChat(config.telegram.chatIds[0]);
        // Translate the message for a new repository
        const message = i18n.t('new_repo_created', { lng: lang, name: repo.name, url: repo.html_url });

        try {
            // Broadcast the message to Telegram and BlueSky
            await broadcastMessage(message);
            await postToBlueSky(message);
            broadcastMessage('Repository notified on Telegram and BlueSky');
        } catch (error) {
            // Broadcast an error message if notification fails
            broadcastMessage(`Error notifying GitHub repository: ${error}`);
        }
    });

    // Listener for new notifications received from GitHub
    EventEmitterUtil.on('github:notification', async (notification: any) => {
        // Get the language of the chat for localization
        const lang = await getLanguageFromChat(config.telegram.chatIds[0]);
        // Translate the message for a new notification
        const message = i18n.t('new_github_notification', notification);

        try {
            // Broadcast the message to Telegram
            await broadcastMessage(message);
        } catch (error) {
            // Broadcast an error message if notification fails
            broadcastMessage(`Error sending GitHub notification: ${error}`);
        }
    });
};