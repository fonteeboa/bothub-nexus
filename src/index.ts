import punycode from 'punycode';
import { exit } from 'process';
import { config } from './config';
import i18n from './config/i18n';
import { initTelegramBot } from './bots/telegram';
import { broadcastMessage } from './bots/telegram/controllers/commandController';
import { initListeners } from './listeners/eventHandlers';

try {
  // Initialize the Telegram bot if it is enabled in the configuration
  if (config.telegram.enabled) {
    initTelegramBot();
  }

  // Initialize event listeners if GitHub or Dev.to services are enabled
  if (config.github.enabled || config.devTo.enabled) {
    initListeners();
    console.info('Listeners started successfully!');
  }

  console.info('Bots initializer executed successfully!');
} catch (error) {
  console.error(`Error initializing the centralized bot: ${error}`);
  
  // Send the error message to Telegram, if the Telegram bot is enabled
  if (config.telegram.enabled) {
    broadcastMessage('centralized_bot_error');
  }
  
  // Exit the process with a failure code
  exit(1);
}