import * as Alexa from "ask-sdk";
import * as DynamoAdapter from "ask-sdk-dynamodb-persistence-adapter";

export function isIntent(...intents: string[]) {
  return (handlerInput: Alexa.HandlerInput) =>
    Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
    intents.some(
      (x) => Alexa.getIntentName(handlerInput.requestEnvelope) === x
    );
}

export function getPersistenceAdapter(
  tableName: string
): DynamoAdapter.DynamoDbPersistenceAdapter {
  return new DynamoAdapter.DynamoDbPersistenceAdapter({
    tableName: tableName,
    createTable: true,
  });
}
