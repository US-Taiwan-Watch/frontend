import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MembersQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Float']>;
  filters: Types.MemberFiltersInput;
  limit?: Types.InputMaybe<Types.Scalars['Float']>;
}>;


export type MembersQuery = { __typename?: 'Query', members: { __typename?: 'PaginatedMembers', total: number, hasMore: boolean, items: Array<{ __typename?: 'Member', id: string, firstName?: string | null | undefined, firstName_zh?: string | null | undefined, lastName?: string | null | undefined, lastName_zh?: string | null | undefined, profilePictureUri?: string | null | undefined, congressRoles: Array<{ __typename?: 'MemberRole', chamber: string, congressNumbers: Array<number>, district?: number | null | undefined, startDate: string, state: string, senatorClass?: number | null | undefined, endDate: string, parties: Array<{ __typename?: 'PartyRecord', party: string, startDate: string, endDate: string }> }> }> } };


export const MembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Members"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberFiltersInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName_zh"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName_zh"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUri"}},{"kind":"Field","name":{"kind":"Name","value":"congressRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chamber"}},{"kind":"Field","name":{"kind":"Name","value":"congressNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"senatorClass"}},{"kind":"Field","name":{"kind":"Name","value":"parties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"party"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MembersQuery, MembersQueryVariables>;