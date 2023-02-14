import { Configuration, OpenAIApi } from "openai";
import { PHRASES } from "../constants/phrases";

export class API {
  // Get text response from Chat GPT given a prompt
  async ask(prompt: string): Promise<string> {
    try {
      const configuration = new Configuration({
        organization: "org-Np4HymGGeRwOkIWELqmFdUv7",
        apiKey: process.env.OPEN_AI_KEY,
      });
      const api = new OpenAIApi(configuration);
      const response = await api.createCompletion({
        model: "text-davinci-003",
        temperature: 0,
        prompt,
      });

      const answer = response?.data?.choices?.[0]?.text || PHRASES.API_ERROR;
      return answer;
    } catch (err) {
      return PHRASES.API_ERROR;
    }
  }
}
