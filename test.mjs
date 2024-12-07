import { GoogleGenerativeAI } from '@google/generative-ai';
import readline from 'readline'; // For reading user input
import fetch from 'node-fetch'; // Add this import


// Initialize readline interface to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Replace 'YOUR_API_KEY' with your actual API key
const genAI = new GoogleGenerativeAI("AIzaSyCkd89x9TxFsA69f05Qoq6f8LlDGNl4brs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function chatWithModel(userInput, childAge) {
  const prompt = `A ${childAge}-year-old child says: "${userInput}". Please respond in a friendly and age-appropriate manner.`;

  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: prompt }] },
    ],
  });

  const response = await chat.sendMessage("");

  // Placeholder for sentiment analysis (update with actual sentiment analysis code)
  const sentiment_scores = { compound: 0 }; // This should be replaced with real sentiment scores

  // Determine the dominant sentiment
  let inferredEmotion;
  if (sentiment_scores['compound'] >= 0.05) {
    inferredEmotion = "Positive";
  } else if (sentiment_scores['compound'] <= -0.05) {
    inferredEmotion = "Negative";
  } else {
    inferredEmotion = "Neutral";
  }

  console.log("User's Inferred Emotion:", inferredEmotion);
  console.log("Model's Response:", response.response.text());
}

// Get user input for age and input text
rl.question("Please enter the child's age: ", (age) => {
  rl.question("Please enter the user's input: ", (input) => {
    // Call the function with the input values
    chatWithModel(input, age);
    rl.close(); // Close the readline interface
  });
});
