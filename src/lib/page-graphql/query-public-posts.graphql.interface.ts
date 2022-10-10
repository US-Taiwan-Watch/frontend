import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PublicPostsQueryVariables = Types.Exact<{
  lang?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type PublicPostsQuery = { __typename?: 'Query', getAllArticles: Array<{ __typename?: 'Article', id: string, content?: string | null | undefined, slug?: string | null | undefined, preview?: string | null | undefined, isPublished?: boolean | null | undefined, publishedTime?: number | null | undefined, imageSource?: string | null | undefined, type?: Types.ArticleType | null | undefined, title?: { __typename?: 'I18NText', text?: string | null | undefined } | null | undefined }> };


export const PublicPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lang"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllArticles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lang"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lang"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"publishedTime"}},{"kind":"Field","name":{"kind":"Name","value":"imageSource"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<PublicPostsQuery, PublicPostsQueryVariables>;