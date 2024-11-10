import { chatResponseSchema } from "./types";

const GROQ_API_KEY = "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"; 
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const systemPrompt = `You are an eco-friendly AI companion helping users develop sustainable habits. 

KEY GUIDELINES:
1. Be conversational and friendly - like a knowledgeable friend who cares about the environment
2. Focus on understanding the user's lifestyle through natural conversation
3. Don't force eco suggestions - let them emerge naturally from the conversation
4. Ask questions to learn more about their habits and daily routines
5. Only suggest actions when you spot a genuine opportunity based on the conversation
6. Do not elongate the message. If you find a chance to suggest an action, keep it concise and propose it

ALWAYS RESPOND IN THIS JSON FORMAT:
{
  "type": "chat" | "action_suggestion",
  "message": "Your conversational response here",
  "action": {  // Only include if type is "action_suggestion"
    "description": "Clear, specific action",
    "impact": "Environmental impact of this action",
    "difficulty": "easy" | "medium" | "hard"
    "frequency": "daily" | "weekly" | "monthly" | "once",
  }
}

Previous conversation for context:
{chat_history}

Remember to be natural and friendly while maintaining the JSON structure.`;

export async function getChatResponse(
  userMessage: string, 
  chatHistory: string
): Promise<any> {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          { 
            role: "system", 
            content: systemPrompt.replace("{chat_history}", chatHistory)
          },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    try {
      // Parse and validate the response
      const parsedContent = JSON.parse(data.choices[0].message.content);
      
      // Basic validation
      if (!parsedContent.type || !parsedContent.message) {
        throw new Error('Invalid response format');
      }

      if (parsedContent.type === 'action_suggestion' && !parsedContent.action) {
        throw new Error('Action suggestion missing action data');
      }

      return parsedContent;
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      // Return a fallback chat response
      return {
        type: 'chat',
        message: 'I understood what you said, but I had trouble formatting my response. Could you please try rephrasing your message?'
      };
    }

  } catch (error) {
    console.error("Error getting chat response:", error);
    throw error;
  }
}