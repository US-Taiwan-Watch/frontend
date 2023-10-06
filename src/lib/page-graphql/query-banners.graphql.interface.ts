import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BannersQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BannersQueryQuery = { __typename?: 'Query', banners: Array<{ __typename?: 'Banner', imageSource: string, cta?: string | null | undefined }> };


export const BannersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BannersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageSource"}},{"kind":"Field","name":{"kind":"Name","value":"cta"}}]}}]}}]} as unknown as DocumentNode<BannersQueryQuery, BannersQueryQueryVariables>;