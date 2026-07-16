import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateServerCode(userPrompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const systemPrompt = `You are an expert JavaScript developer. Generate clean, well-documented JavaScript/Node.js code for Superserver based on user requirements.

IMPORTANT:
- Generate only the JavaScript code that will run on Superserver
- Include proper error handling
- Add comments explaining the code
- Make it production-ready
- The code should export a default function that handles requests
- Use modern JavaScript (async/await preferred)

Example format:
\`\`\`javascript
export default async (request) => {
  // Your code here
  return new Response(JSON.stringify({ message: "Hello" }));
};
\`\`\``;

    const response = await model.generateContent(`${systemPrompt}\n\nUser Request: ${userPrompt}`);
    const result = response.response.text();
    
    // Extract code block if wrapped in markdown
    const codeMatch = result.match(/\`\`\`(?:javascript|js)?\n([\s\S]*?)\`\`\`/);
    const code = codeMatch ? codeMatch[1] : result;
    
    return {
      success: true,
      code: code,
      fullResponse: result
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}
