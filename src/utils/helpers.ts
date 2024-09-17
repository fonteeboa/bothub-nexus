/**
 * Helper function to get the language of the chat from a Telegram message.
 * @param msg - The message object received from Telegram.
 * @returns The language code of the chat, or 'en' if not available.
 */
export const getLanguageFromChat = async (msg: any) => {
    return msg?.from?.language_code || 'en';
};

/**
 * Helper function to calculate the difference in hours between a given date and the current date.
 * @param date - The date to compare against the current date.
 * @returns A boolean indicating whether the difference is less than or equal to 24 hours.
 */
export const calculateDiffHours = (date: any) => {
    const dateToCompare = new Date(date);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - dateToCompare.getTime();
    const differenceInHours = differenceInTime / (1000 * 3600);
    return Math.floor(differenceInHours) <= 24;
};