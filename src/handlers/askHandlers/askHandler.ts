import * as Alexa from "ask-sdk";
import * as api from "../../apis/openApi";
import { isIntent } from "../../helpers/alexaHelpers";

import { State } from "../../models/state";
import { PHRASES } from "../../constants/phrases";
import { STATES, QUESTION_SLOT } from "../../constants/variables";

export const AskIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    const sessionAttributes: State =
      handlerInput.attributesManager.getSessionAttributes();
    return (
      sessionAttributes.state === STATES.NONE &&
      isIntent("AskIntent")(handlerInput)
    );
  },
  async handle(handlerInput: Alexa.HandlerInput) {
    const { attributesManager, requestEnvelope } = handlerInput;
    const question = Alexa.getSlotValue(requestEnvelope, QUESTION_SLOT);
    const response = await api.ask(question);

    // Ask user if they would like to save gpt response
    if (response !== PHRASES.API_ERROR) {
      attributesManager.setSessionAttributes({
        state: STATES.SAVE,
        lastRecord: response,
      });
    }
    return handlerInput.responseBuilder
      .speak(response)
      .withShouldEndSession(false)
      .getResponse();
  },
};
