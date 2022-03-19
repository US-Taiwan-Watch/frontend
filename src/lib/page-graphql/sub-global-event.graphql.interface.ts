import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type OnGlobalEventSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OnGlobalEventSubscription = { __typename?: 'Subscription', onGlobalEvent: { __typename?: 'EventPayloadPublish', data?: string | null | undefined } };


export const OnGlobalEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onGlobalEvent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onGlobalEvent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<OnGlobalEventSubscription, OnGlobalEventSubscriptionVariables>;