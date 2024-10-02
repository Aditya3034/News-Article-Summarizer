# News Article Summarizer

## Project Overview

The **News Article Summarizer** is a web-based tool that allows users to input a news article URL or text to generate a concise summary using AI. Additionally, the application provides a reliability check for the article's source and generates a downloadable PDF reliability report.

You can try out the application live here: [News Article Summarizer](https://news-article-summarizer.vercel.app/)

## Features
- Summarizes news articles by URL or text using AI.
- Checks the reliability of the news source.
- Provides a downloadable PDF reliability report.

## Prerequisites

To run this project locally, ensure that you have the following software installed:
- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/news-article-summarizer.git
cd news-article-summarizer
```

### 2. Install Dependencies
Frontend
Navigate to the frontend folder and install the necessary dependencies:

```bash
cd frontend
npm install
```

Backend
Navigate to the backend folder and install the necessary dependencies:

```bash
cd ../backend
npm install
```
### 3. Start the Project

Running the Frontend
To start the frontend React application, run the following commands:

```bash
cd frontend
npm start
```

This will start the frontend on http://localhost:3000.

Running the Backend
To start the backend Node.js server in different terminal, run the following commands:

```bash
cd ../backend
npm start
```

This will start the backend on http://localhost:5000.

### 4. Environment Variables
The backend requires environment variables for API keys. Set up the .env file as follows:

Create a .env file in the backend folder:

```bash
touch backend/.env
Add your API keys:
```

```bash
echo "GEMINI_API_KEY=your_gemini_api_key" > backend/.env
```
