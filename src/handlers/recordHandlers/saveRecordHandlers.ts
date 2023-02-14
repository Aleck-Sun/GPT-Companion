import * as Alexa from "ask-sdk";
import * as api from "../../apis/openApi";
import { isIntent } from "../../helpers/alexaHelpers";

import { State } from "../../models/state";
import { Records } from "../../models/records";
import { PHRASES } from "../../constants/phrases";
import { STATES, NAME_SLOT } from "../../constants/variables";

export const SaveRecordIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    const sessionAttributes: State =
      handlerInput.attributesManager.getSessionAttributes();
    return (
      isIntent("SaveRecordIntent")(handlerInput) &&
      sessionAttributes.state === STATES.SAVE
    );
  },
  async handle(handlerInput: Alexa.HandlerInput) {
    const { attributesManager, requestEnvelope } = handlerInput;
    const sessionAttributes: State = attributesManager.getSessionAttributes();
    const persistentAttributes: Records =
      (await attributesManager.getPersistentAttributes()) || {};

    const recordName = Alexa.getSlotValue(requestEnvelope, NAME_SLOT) || "all";
    const speechOutput = `Saving record under ${recordName}. ${PHRASES.NEXT}`;

    persistentAttributes[recordName] = persistentAttributes[recordName] || [];
    if (sessionAttributes.lastRecord) {
      persistentAttributes[recordName]?.push(sessionAttributes.lastRecord);
    }

    attributesManager.setPersistentAttributes(persistentAttributes);
    await attributesManager.savePersistentAttributes();

    sessionAttributes.state = STATES.NONE;
    attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};

export const NoRecordHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    const sessionAttributes: State =
      handlerInput.attributesManager.getSessionAttributes();
    return (
      isIntent("NoRecordHandler")(handlerInput) &&
      sessionAttributes.state === STATES.SAVE
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    handlerInput.attributesManager.setSessionAttributes({ state: STATES.NONE });
    return handlerInput.responseBuilder
      .speak(`${PHRASES.NO_RECORD} ${PHRASES.NEXT}`)
      .withShouldEndSession(false)
      .getResponse();
  },
};
