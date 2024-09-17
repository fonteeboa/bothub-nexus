import i18n from 'i18next';
import { enTranslations } from '../locales/en';
import { ptTranslations } from '../locales/pt';

/**
 * Initializes the i18n instance with configuration settings.
 * Sets up the fallback language, translation resources, and interpolation options.
 */
i18n.init({
  fallbackLng: 'en',
  resources: {
    en: enTranslations,
    pt: ptTranslations,
  },
  interpolation: {
    escapeValue: false,
  },
  debug: false,
});

export default i18n;
