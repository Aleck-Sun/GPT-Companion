import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";
import { PHRASES } from "../constants/phrases";
import { GPT_MODEL } from "../constants/variables";

// Get text response from Chat GPT given a prompt
export const ask = async (prompt: string): Promise<string> => {
  try {
    const configuration = new Configuration({
      organization: "org-Np4HymGGeRwOkIWELqmFdUv7",
      apiKey: process.env.OPEN_AI_KEY,
    });
    const api = new OpenAIApi(configuration);
    const params: CreateCompletionRequest = { ...GPT_MODEL, prompt };
    const response = await api.createCompletion(params);
    const answer = response?.data?.choices?.[0]?.text || PHRASES.API_ERROR;
    return `Chat GPT responded with: ${answer} Would you like to save this response as a record?`;
  } catch (err) {
    return PHRASES.API_ERROR;
  }
};
