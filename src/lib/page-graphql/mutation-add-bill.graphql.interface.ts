import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { BillFieldsFragmentDoc } from './query-bills.graphql.interface';
export type AddBillMutationVariables = Types.Exact<{
  bill: Types.BillInput;
}>;


export type AddBillMutation = { __typename?: 'Mutation', addBill?: { __typename?: 'Bill', id: string, congress: number, billType: string, billNumber: number, introducedDate?: string | null | undefined, cosponsorsCount?: number | null | undefined, isSyncing: boolean, sponsor?: { __typename?: 'Member', firstName?: string | null | undefined, firstName_zh?: string | null | undefined, id: string, lastName?: string | null | undefined, lastName_zh?: string | null | undefined } | null | undefined, title?: { __typename?: 'I18NText', zh?: string | null | undefined, en?: string | null | undefined, text?: string | null | undefined } | null | undefined, trackers?: Array<{ __typename?: 'BillTracker', stepName: string, selected: boolean }> | null | undefined, summary?: { __typename?: 'I18NText', en?: string | null | undefined, zh?: string | null | undefined, text?: string | null | undefined } | null | undefined } | null | undefined };


export const AddBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bill"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bill"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bill"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"billFields"}}]}}]}},...BillFieldsFragmentDoc.definitions]} as unknown as DocumentNode<AddBillMutation, AddBillMutationVariables>;