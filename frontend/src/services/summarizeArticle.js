// services/summarizeArticle.js
import axios from 'axios';

export const summarizeArticle = async (url, text) => {
  try {
    const response = await axios.post('https://nas-lovat.vercel.app/api/summarize', {
      url,
      text,
    });
    return response.data; // Assuming your backend returns the summary like { summary: '...' }
  } catch (error) {
    console.error('Error summarizing article:', error);
    throw new Error('Error summarizing article');
  }
};
