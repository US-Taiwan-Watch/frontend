import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ImUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ImUserQuery = { __typename?: 'Query', imUser?: { __typename?: 'User', id: string, email?: string | null | undefined } | null | undefined };


export const ImUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"imUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ImUserQuery, ImUserQueryVariables>;