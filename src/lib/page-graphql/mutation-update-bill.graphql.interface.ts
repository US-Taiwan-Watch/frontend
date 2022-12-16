import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UpdateBillMutationVariables = Types.Exact<{
  bill: Types.BillInput;
}>;


export type UpdateBillMutation = { __typename?: 'Mutation', updateBill?: { __typename?: 'Bill', id: string, congress: number, billType: string, billNumber: number, introducedDate?: string | null | undefined, title?: { __typename?: 'I18NText', en?: string | null | undefined, zh?: string | null | undefined } | null | undefined, summary?: { __typename?: 'I18NText', zh?: string | null | undefined, en?: string | null | undefined } | null | undefined } | null | undefined };


export const UpdateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bill"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bill"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bill"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"congress"}},{"kind":"Field","name":{"kind":"Name","value":"billType"}},{"kind":"Field","name":{"kind":"Name","value":"billNumber"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"zh"}}]}},{"kind":"Field","name":{"kind":"Name","value":"summary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zh"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"introducedDate"}}]}}]}}]} as unknown as DocumentNode<UpdateBillMutation, UpdateBillMutationVariables>;