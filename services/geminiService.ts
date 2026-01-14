
import { GoogleGenAI } from "@google/genai";

export const generatePropertyDescription = async (details: any) => {
  // Directly initialize GoogleGenAI with the API key from environment variables.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a catchy real estate description in ${details.language || 'English'} for a ${details.style} house for ${details.type} in ${details.area}, ${details.city}, ${details.country}. It has ${details.bedrooms} bedrooms, ${details.bathrooms} bathrooms. Utilities: Gas: ${details.hasGas ? 'Yes' : 'No'}, Electricity: ${details.hasElectricity ? 'Yes' : 'No'}. Keep it professional and under 100 words.`
    });
    // Access the text property directly on the response object.
    return response.text || "Freshly listed property ready for viewing.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Beautifully maintained home in a prime location.";
  }
};
