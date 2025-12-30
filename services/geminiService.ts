
import { GoogleGenAI } from "@google/genai";

export const generatePropertyDescription = async (details: any) => {
  // Safety check for API Key availability
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) ? process.env.API_KEY : '';
  
  if (!apiKey) {
    console.warn("Gemini API Key missing. Returning default description.");
    return "A beautiful property listed on Global Real Estate Connect. Contact us for more details.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a catchy real estate description in ${details.language || 'English'} for a ${details.style} house for ${details.type} in ${details.area}, ${details.city}, ${details.country}. It has ${details.bedrooms} bedrooms, ${details.bathrooms} bathrooms. Utilities: Gas: ${details.hasGas ? 'Yes' : 'No'}, Electricity: ${details.hasElectricity ? 'Yes' : 'No'}. Keep it professional and under 100 words.`
    });
    return response.text || "Freshly listed property ready for viewing.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Beautifully maintained home in a prime location.";
  }
};
