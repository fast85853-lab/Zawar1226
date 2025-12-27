
import { GoogleGenAI } from "@google/genai";

export const generatePropertyDescription = async (details: any) => {
  // Always use a new instance to ensure it uses the current process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      // Localization: Include the target language in the prompt for more relevant descriptions.
      contents: `Write a catchy real estate description in ${details.language || 'English'} for a ${details.style} house for ${details.type} in ${details.area}, ${details.city}, ${details.country}. It has ${details.bedrooms} bedrooms, ${details.bathrooms} bathrooms. Utilities: Gas: ${details.hasGas ? 'Yes' : 'No'}, Electricity: ${details.hasElectricity ? 'Yes' : 'No'}. Keep it professional and under 100 words.`
    });
    // Use .text property to access the generated content string directly.
    return response.text || "Freshly listed property ready for viewing.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Beautifully maintained home in a prime location.";
  }
};
