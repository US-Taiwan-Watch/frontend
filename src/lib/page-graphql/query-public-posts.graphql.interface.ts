import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PublicPostsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Float']>;
  limit?: Types.InputMaybe<Types.Scalars['Float']>;
  sortFields?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  sortDirections?: Types.InputMaybe<Array<Types.Scalars['Float']> | Types.Scalars['Float']>;
  type: Types.ArticleType;
}>;


export type PublicPostsQuery = { __typename?: 'Query', getPostsWithType: { __typename?: 'PaginatedArticles', total: number, hasMore: boolean, items: Array<{ __typename?: 'Article', id: string, content?: string | null | undefined, slug?: string | null | undefined, publishedTime?: number | null | undefined, imageSource?: string | null | undefined, type?: Types.ArticleType | null | undefined, isPublished?: boolean | null | undefined, title?: { __typename?: 'I18NText', text?: string | null | undefined } | null | undefined, preview?: { __typename?: 'I18NText', text?: string | null | undefined } | null | undefined }> } };


export const PublicPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortFields"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirections"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArticleType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostsWithType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortFields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortFields"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirections"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirections"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"publishedTime"}},{"kind":"Field","name":{"kind":"Name","value":"imageSource"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}}]}}]}}]}}]} as unknown as DocumentNode<PublicPostsQuery, PublicPostsQueryVariables>;