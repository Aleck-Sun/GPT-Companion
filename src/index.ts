import * as Alexa from "ask-sdk";
import * as BasicHandler from "./handlers/basicHandlers";
import { AskIntentHandler } from "./handlers/askHandlers/askHandler";

import { DB_NAME } from "./constants/variables";
import { getPersistenceAdapter } from "./helpers/alexaHelpers";

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    BasicHandler.LaunchRequestHandler,
    AskIntentHandler,
    BasicHandler.HelloIntentHandler,
    BasicHandler.CancelOrStopIntentHandler,
    BasicHandler.HelpIntentHandler,
    BasicHandler.UnhandledIntent
  )
  .addErrorHandler(() => true, BasicHandler.ErrorHandler)
  .withPersistenceAdapter(getPersistenceAdapter(DB_NAME))
  .lambda();
