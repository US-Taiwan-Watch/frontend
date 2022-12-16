import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AddBillMutationVariables = Types.Exact<{
  bill: Types.BillInput;
}>;


export type AddBillMutation = { __typename?: 'Mutation', addBill?: { __typename?: 'Bill', congress: number, billType: string, billNumber: number, id: string, title?: { __typename?: 'I18NText', zh?: string | null | undefined, en?: string | null | undefined } | null | undefined, summary?: { __typename?: 'I18NText', zh?: string | null | undefined, en?: string | null | undefined } | null | undefined } | null | undefined };


export const AddBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bill"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bill"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bill"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"congress"}},{"kind":"Field","name":{"kind":"Name","value":"billType"}},{"kind":"Field","name":{"kind":"Name","value":"billNumber"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zh"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"summary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zh"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}}]} as unknown as DocumentNode<AddBillMutation, AddBillMutationVariables>;