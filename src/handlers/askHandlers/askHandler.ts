import * as Alexa from "ask-sdk";
import { API } from "../../apis/openAI";
import { isIntent } from "../../helpers/alexaHelpers";
import { PHRASES } from "../../constants/phrases";

export const AskIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return isIntent("AskIntent")(handlerInput);
  },
  async handle(handlerInput: Alexa.HandlerInput) {
    const api = new API();
    const response = await api.ask("Tell me this is a test");
    return handlerInput.responseBuilder
      .speak(response)
      .withShouldEndSession(false)
      .getResponse();
  },
};
