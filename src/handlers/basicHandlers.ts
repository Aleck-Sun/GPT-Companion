import * as Alexa from "ask-sdk";
import { escapeXmlCharacters } from "ask-sdk";
import { isIntent } from "../helpers/alexaHelpers";

import { State } from "../models/state";
import { PHRASES } from "../constants/phrases";
import { STATES } from "../constants/variables";

export const LaunchRequestHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      Alexa.isNewSession(handlerInput.requestEnvelope) ||
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const sessionAttributes: State = {
      state: STATES.NONE,
    };
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    return handlerInput.responseBuilder
      .speak(PHRASES.LAUNCH)
      .withShouldEndSession(false)
      .getResponse();
  },
};

export const HelloIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return isIntent("HelloWorldIntent")(handlerInput);
  },
  handle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.responseBuilder
      .speak(PHRASES.HELLO)
      .withShouldEndSession(true)
      .getResponse();
  },
};

export const CancelOrStopIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("AMAZON.CancelIntent", "AMAZON.StopIntent"),
  handle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.responseBuilder
      .speak(PHRASES.GOODBYE)
      .withShouldEndSession(true)
      .getResponse();
  },
};

export const HelpIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("AMAZON.HelpIntent"),
  handle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.responseBuilder
      .speak(PHRASES.HELP)
      .withShouldEndSession(true)
      .getResponse();
  },
};

export const FallbackIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent(
    "AMAZON.FallbackIntent",
    "AskIntent",
    "SaveRecordIntent",
    "NoRecordIntent",
    "ViewRecordIntent"
  ),
  handle(handlerInput: Alexa.HandlerInput) {
    const sessionAttributes: State =
      handlerInput.attributesManager.getSessionAttributes();
    let speechOutput: string;
    switch (sessionAttributes.state) {
      case STATES.NONE: {
        speechOutput = PHRASES.NO_SAVE;
        break;
      }
      case STATES.SAVE: {
        speechOutput = PHRASES.SAVE_PROGRESS;
        break;
      }
      default: {
        speechOutput = PHRASES.UNHANDLED_INTENT;
        break;
      }
    }
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};

export const UnhandledIntent: Alexa.RequestHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(PHRASES.UNHANDLED_INTENT)
      .withShouldEndSession(false)
      .getResponse();
  },
};

export const ErrorHandler = (
  handlerInput: Alexa.HandlerInput,
  error: Error
) => {
  return handlerInput.responseBuilder
    .speak(
      ` <amazon:emotion name="excited" intensity="high">
          Abort mission, repeating, abort mission!
        </amazon:emotion>
        <sub alias=",">${escapeXmlCharacters(error.message)}</sub>`
    )
    .withShouldEndSession(true)
    .getResponse();
};
