import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";



const GeminiComponent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
    const genAI = new GoogleGenerativeAI("AIzaSyBHCmcf12ieByX5__DNDBivdQu0iwYYP8E");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();
      setOutput(text);
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt here..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {output && (
        <div>
          <h3>Output:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};
export default GeminiComponent;

