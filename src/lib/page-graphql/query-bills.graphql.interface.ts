import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BillsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Float']>;
  limit?: Types.InputMaybe<Types.Scalars['Float']>;
  sortFields?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  sortDirections?: Types.InputMaybe<Array<Types.Scalars['Float']> | Types.Scalars['Float']>;
}>;


export type BillsQuery = { __typename?: 'Query', bills: { __typename?: 'PaginatedBills', total: number, hasMore: boolean, items: Array<{ __typename?: 'Bill', id: string, congress: number, billType: string, billNumber: number, introducedDate?: string | null | undefined }> } };


export const BillsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bills"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortFields"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirections"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bills"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortFields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortFields"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirections"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirections"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"congress"}},{"kind":"Field","name":{"kind":"Name","value":"billType"}},{"kind":"Field","name":{"kind":"Name","value":"billNumber"}},{"kind":"Field","name":{"kind":"Name","value":"introducedDate"}}]}}]}}]}}]} as unknown as DocumentNode<BillsQuery, BillsQueryVariables>;