import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BillsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BillsQuery = { __typename?: 'Query', bills: Array<{ __typename?: 'Bill', congress: number, billType: string, billNumber: number, introducedDate?: string | null | undefined }> };


export const BillsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Bills" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "bills" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "congress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "billType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "billNumber" } }, { "kind": "Field", "name": { "kind": "Name", "value": "introducedDate" } }] } }] } }] } as unknown as DocumentNode<BillsQuery, BillsQueryVariables>;