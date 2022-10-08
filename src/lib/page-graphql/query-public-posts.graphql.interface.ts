import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PublicPostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PublicPostsQuery = { __typename?: 'Query', getAllArticles: Array<{ __typename?: 'Article', id: string, title?: string | null | undefined, content?: string | null | undefined, slug?: string | null | undefined, preview?: string | null | undefined, isPublished?: boolean | null | undefined, pusblishTime?: number | null | undefined, imageSource?: string | null | undefined, type?: Types.ArticleType | null | undefined }> };


export const PublicPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"pusblishTime"}},{"kind":"Field","name":{"kind":"Name","value":"imageSource"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<PublicPostsQuery, PublicPostsQueryVariables>;