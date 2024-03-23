/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateGame = /* GraphQL */ `subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
  onCreateGame(filter: $filter) {
    id
    Team1Name
    Team1Score
    Team2Name
    Team2Score
    live
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGameSubscriptionVariables,
  APITypes.OnCreateGameSubscription
>;
export const onUpdateGame = /* GraphQL */ `subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
  onUpdateGame(filter: $filter) {
    id
    Team1Name
    Team1Score
    Team2Name
    Team2Score
    live
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGameSubscriptionVariables,
  APITypes.OnUpdateGameSubscription
>;
export const onDeleteGame = /* GraphQL */ `subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
  onDeleteGame(filter: $filter) {
    id
    Team1Name
    Team1Score
    Team2Name
    Team2Score
    live
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGameSubscriptionVariables,
  APITypes.OnDeleteGameSubscription
>;
