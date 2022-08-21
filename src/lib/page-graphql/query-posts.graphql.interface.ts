import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', allArticles: Array<{ __typename?: 'Article', id: string, title?: string | null | undefined, content?: string | null | undefined, status?: string | null | undefined, author?: Array<string> | null | undefined, pusblishTime?: string | null | undefined, imageSource?: string | null | undefined, tags?: Array<string> | null | undefined }> };


export const PostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"pusblishTime"}},{"kind":"Field","name":{"kind":"Name","value":"imageSource"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;