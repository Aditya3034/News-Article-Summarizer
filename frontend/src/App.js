
import React, { useState } from 'react';
import ArticleSummarizer from './components/ArticleSummarizer';
import Loader from './components/Loader'; // Import the loader component
import ArticleReliabilityReport from './components/ArticleReliabilityReport'; // Import your report component
import './App.css';
import { summarizeArticle } from './services/summarizeArticle';
// import { checkSourceReliability } from './services/checkSourceReliability'; // Import your check reliability service

function App() {
  const [summary, setSummary] = useState('');
  const [reliabilityAssessment, setReliabilityAssessment] = useState(''); // State for reliability assessment
  const [loading, setLoading] = useState(false); // State for loading

  const handleSummarize = async (url, text) => {
    if (url || text) {
      setLoading(true); // Set loading to true before fetching
      try {
        const {summary, reliability} = await summarizeArticle(url, text);
        setSummary(summary);
        
        // Check the reliability of the source using the generated summary
        // const assessment = await checkSourceReliability(summary);
        setReliabilityAssessment(reliability);
      } catch (error) {
        console.log('Failed to summarize the article.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
  };

  return (
    <div className="App">
      <ArticleSummarizer onSummarize={handleSummarize} />
      {loading ? ( // Conditional rendering for loader
        <Loader />
      ) : (
        <>
          {summary && (
            <div className="summary-container">
              <h4 className="summary-title">Summary:</h4>
              <p>{summary}</p>
            </div>
          )}
          {reliabilityAssessment && (
            <ArticleReliabilityReport 
              summary={summary} 
              reliabilityAssessment={reliabilityAssessment} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
