
const axios = require('axios');
const { load } = require('cheerio');
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Importing the Google Generative AI library
require('dotenv').config();

const genAI = new GoogleGenerativeAI(`AIzaSyAVfaNvl6IxcXgCzCe-l7bwzEOtQbE1KRs`); // Initialize the client with your API key

const fetchArticleContent = async (url) => {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;
    const $ = load(htmlContent);
    let articleText = '';

    $('article p').each((index, element) => {
      articleText += $(element).text() + '\n';
    });

    if (!articleText) {
      $('p').each((index, element) => {
        articleText += $(element).text() + '\n';
      });
    }

    return articleText.trim();
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('Error fetching article content');
  }
};

const summarizeArticle = async (articleText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Specify the model you want to use
    const prompt = `Summarize the following article:\n\n${articleText}`; // Prepare your prompt

    const result = await model.generateContent([prompt]); // Call the method to generate content
    const summary = result.response.text(); // Get the generated summary text
    return summary;
  } catch (error) {
    console.error('Error summarizing article:', error);
    throw new Error('Error summarizing article');
  }
};
// Implement the checkSourceReliability function

const checkSourceReliability = async (articleText) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Based on the following article content, evaluate the reliability of the source. Article content: ${articleText}`;
  
      const result = await model.generateContent([prompt]);
      const reliability = result.response.text();
      return reliability;
    } catch (error) {
      console.error('Error assessing source reliability:', error);
      return 'Unable to assess reliability';
    }
  };
  
const summarizeNews = async (req, res) => {
  const { url, text } = req.body; // Expecting URL and text in the request body

  // Check if both URL and text are empty
  if (!url && !text) {
    return res.status(400).json({ error: 'Either URL or text is required' });
  }

  try {
    let articleText;

    // If text is provided, use it directly
    if (text) {
      articleText = text;
    } 
    // If URL is provided, fetch the article content
    else if (url) {
      articleText = await fetchArticleContent(url);
    }
    const reliability = await checkSourceReliability(articleText)

    // Summarize the article text using the Google Generative AI
    const summary = await summarizeArticle(articleText);
    
    res.status(200).json({ summary,reliability }); // Send back the summary
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  summarizeNews,
};
