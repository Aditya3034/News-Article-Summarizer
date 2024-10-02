import React, { useState } from 'react';

const ArticleSummarizer = ({ onSummarize }) => {
  const [articleURL, setArticleURL] = useState('');
  const [articleText, setArticleText] = useState('');

  const handleSummarize = () => {
    if (articleURL || articleText) {
      onSummarize(articleURL, articleText);
    } else {
      alert('Please provide a URL or text.');
    }
  };

  return (
    <div>
      <h3>News Article Summarizer</h3>
      <input
        type="text"
        placeholder="Enter Article URL"
        value={articleURL}
        onChange={(e) => setArticleURL(e.target.value)}
      />
      <textarea
        placeholder="Or paste the article text"
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
      />
      <button onClick={handleSummarize}>Summarize</button>
    </div>
  );
};

export default ArticleSummarizer;
