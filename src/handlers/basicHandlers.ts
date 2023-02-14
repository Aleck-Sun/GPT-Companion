import * as Alexa from "ask-sdk";
import { escapeXmlCharacters } from "ask-sdk";
import { isIntent } from "../helpers/alexaHelpers";
import { PHRASES } from "../constants/phrases";

export const LaunchRequestHandler: Alexa.RequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      Alexa.isNewSession(handlerInput.requestEnvelope) ||
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    // const sessionAttributes: GameState = {
    //   gameState: GAME_STATES.GAME_END_STATE,
    //   score: START_SCORE,
    // };
    // handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
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

// export const FallbackIntentHandler: Alexa.RequestHandler = {
//   canHandle: isIntent(
//     "AMAZON.FallbackIntent",
//     "EndGameIntent",
//     "RollDiceIntent",
//     "SaveHighscoreIntent",
//     "NoHighscoreIntent",
//     "SetHighscoreNameIntent",
//     "ViewTopHighscoresIntent"
//   ),
//   handle(handlerInput: Alexa.HandlerInput) {
//     const sessionAttributes: GameState =
//       handlerInput.attributesManager.getSessionAttributes();
//     let speechOutput: string;
//     switch (sessionAttributes.gameState) {
//       case GAME_STATES.GAME_END_STATE: {
//         speechOutput = PHRASES.NO_GAME_FALLBACK;
//         break;
//       }
//       case GAME_STATES.GAME_START_STATE: {
//         speechOutput = PHRASES.IN_GAME_FALLBACK;
//         break;
//       }
//       case GAME_STATES.SAVE_HIGHSCORE_STATE: {
//         speechOutput = PHRASES.SAVE_HIGHSCORE_FALLBACK;
//         break;
//       }
//       case GAME_STATES.SET_HIGHSCORENAME_STATE: {
//         speechOutput = PHRASES.ASK_HIGHSCORE_NAME;
//         break;
//       }
//       default: {
//         speechOutput = PHRASES.UNHANDLED_INTENT;
//         break;
//       }
//     }
//     return handlerInput.responseBuilder
//       .speak(speechOutput)
//       .withShouldEndSession(false)
//       .getResponse();
//   },
// };

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
