import api from './api';

export const aiService = {
  /**
   * Send a message to the AI chatbot
   * @param {string} message 
   * @returns {Promise<Object>}
   */
  chat(message) {
    return api.post('/ai/chatbot', { message });
  }
};

export default aiService;
