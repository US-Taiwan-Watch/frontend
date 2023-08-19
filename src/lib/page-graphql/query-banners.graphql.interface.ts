import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BannersQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BannersQueryQuery = { __typename?: 'Query', banners: Array<string> };


export const BannersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BannersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banners"}}]}}]} as unknown as DocumentNode<BannersQueryQuery, BannersQueryQueryVariables>;