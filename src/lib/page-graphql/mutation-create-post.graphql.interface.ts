import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CreatePostMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreatePostMutation = { __typename?: 'Mutation', createEmptyArticle?: { __typename?: 'Article', id: string } | null | undefined };


export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEmptyArticle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;