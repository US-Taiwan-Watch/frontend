import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BillsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Float']>;
  limit?: Types.InputMaybe<Types.Scalars['Float']>;
}>;


export type BillsQuery = { __typename?: 'Query', bills: { __typename?: 'PaginatedBills', total: number, hasMore: boolean, items: Array<{ __typename?: 'DenormalizedBill', congress: number, billType: string, billNumber: number, introducedDate?: string | null | undefined }> } };


export const BillsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"bills"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bills"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"congress"}},{"kind":"Field","name":{"kind":"Name","value":"billType"}},{"kind":"Field","name":{"kind":"Name","value":"billNumber"}},{"kind":"Field","name":{"kind":"Name","value":"introducedDate"}}]}}]}}]}}]} as unknown as DocumentNode<BillsQuery, BillsQueryVariables>;