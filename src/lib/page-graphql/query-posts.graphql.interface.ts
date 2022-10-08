import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AdminAllPostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AdminAllPostsQuery = { __typename?: 'Query', getAllArticles: Array<{ __typename?: 'Article', id: string, title?: string | null | undefined, content?: string | null | undefined, slug?: string | null | undefined, preview?: string | null | undefined, isPublished?: boolean | null | undefined, publishedTime?: number | null | undefined, createdTime?: number | null | undefined, lastModifiedTime?: number | null | undefined, imageSource?: string | null | undefined, tags?: Array<string> | null | undefined, type?: Types.ArticleType | null | undefined }> };


export const AdminAllPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAllPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"publishedTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedTime"}},{"kind":"Field","name":{"kind":"Name","value":"imageSource"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<AdminAllPostsQuery, AdminAllPostsQueryVariables>;