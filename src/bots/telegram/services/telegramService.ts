import { postToBlueSky } from '../../blueSky';
import i18n from '../../../config/i18n';
import { getLanguageFromChat } from '../../../utils/helpers';

/**
 * Handles incoming messages from the Telegram bot.
 * Processes commands and sends appropriate responses based on the message content.
 * @param msg - The message object received from Telegram.
 * @param chatIds - The list of authorized chat IDs.
 * @param bot - The Telegram bot instance.
 */
export const handleMessage = async (msg: any, chatIds: any, bot: any) => {
  // Get the language of the chat for localization
  const lang = await getLanguageFromChat(msg);
  const chatId = msg.chat.id;
  const text = msg.text;

  // Check if the chat ID is authorized
  if (!chatIds.includes(chatId)) {
    const errorMessage = i18n.t('user_permission_denied', { lng: lang });
    await bot.sendMessage(chatId, errorMessage);
  }

  // Process commands based on the message text
  switch (true) {
    // Handle the /post command to post content to Blue Sky
    case /^\/post /.test(text):
      const content = text.split('/post ')[1];
      try {
        const response = await postToBlueSky(content);
        if (!response) {
          throw new Error('Error posting to Blue Sky');
        }
        const successMessage = i18n.t('bluesky_post_success', { lng: lang });
        await bot.sendMessage(chatId, successMessage);
      } catch (error) {
        console.error('Error posting to Blue Sky:', error);
        const errorMessage = i18n.t('bluesky_post_error', { lng: lang });
        await bot.sendMessage(chatId, errorMessage);
      }
      break;

    // Handle the /start command to send a start message
    case /^\/start/.test(text):
      const startMessage = i18n.t('bot_started', { lng: lang });
      await bot.sendMessage(chatId, startMessage);
      break;
  }
};

/**
 * Sends a custom message to a specified chat using the Telegram bot.
 * @param chatId - The ID of the chat to send the message to.
 * @param message - The message content to be sent.
 * @param bot - The Telegram bot instance.
 */
export const sendCustomMessage = async (chatId: any, message: any, bot: any) => {
  await bot.sendMessage(chatId, message);
};