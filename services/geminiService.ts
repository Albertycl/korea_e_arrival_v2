
import { GoogleGenAI } from "@google/genai";

/**
 * Generates travel advice using the Gemini API.
 * Adheres to SDK guidelines:
 * 1. Uses `new GoogleGenAI({ apiKey: process.env.API_KEY })`.
 * 2. Instantiates the client right before making the API call.
 * 3. Uses 'gemini-3-flash-preview' for basic text/Q&A tasks.
 */
export const generateTravelAdvice = async (
  query: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    // Creating the GenAI instance directly inside the function to ensure up-to-date config
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct a chat history context mapping to the expected parts structure
    const chatHistory = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    const systemInstruction = `
      你是一位專業的韓國旅遊助手，專門協助旅客了解韓國入境流程。
      
      你的知識庫應包含以下重點：
      1. 入境卡(Arrival Card)填寫規則：全英文填寫、韓國地址需具體（飯店名稱/電話）、職商務需填寫聯絡人。
      2. 海關申報(Customs)：無申報物走綠色通道免填單。
      3. Q-Code：非強制但推薦，可加速檢疫。
      4. K-ETA：台灣旅客至2024年底前暫時免申請（具體日期視最新公告而定，請回答時保持保守，建議旅客確認最新官方消息）。
      
      請用繁體中文回答，語氣親切，回答簡潔有力。
      若使用者詢問非韓國旅遊相關問題，請禮貌婉拒。
    `;

    // Initiating chat with system instruction provided in the config
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory
    });

    // sendMessage call; accessing .text property directly from the response
    const result = await chat.sendMessage({ message: query });
    return result.text || "抱歉，我現在無法回答您的問題，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "系統發生錯誤，請檢查 API Key 或網路連線。";
  }
};
