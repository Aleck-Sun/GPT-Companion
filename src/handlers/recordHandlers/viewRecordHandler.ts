import * as Alexa from "ask-sdk";
import { isIntent } from "../../helpers/alexaHelpers";

import { State } from "../../models/state";
import { Records } from "../../models/records";
import { PHRASES } from "../../constants/phrases";
import { STATES, NAME_SLOT } from "../../constants/variables";

export const ViewRecordIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    const sessionAttributes: State =
      handlerInput.attributesManager.getSessionAttributes();
    return (
      isIntent("ViewRecordIntent")(handlerInput) &&
      sessionAttributes.state === STATES.NONE
    );
  },
  async handle(handlerInput: Alexa.HandlerInput) {
    const { attributesManager, requestEnvelope } = handlerInput;
    const persistentAttributes: Records =
      (await attributesManager.getPersistentAttributes()) || {};

    let speechOutput = PHRASES.NO_RECORD;
    const recordName = Alexa.getSlotValue(requestEnvelope, NAME_SLOT) || "all";
    if (persistentAttributes[recordName]?.length) {
      speechOutput = `Here are the records under ${recordName}: `;
      let i = 1;
      for (const record in persistentAttributes[recordName]) {
        speechOutput += `${i++}) ${record}`;
      }
    }

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};
