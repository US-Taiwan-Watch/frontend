import * as Types from '../../generated/graphql-types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UserRolesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserRolesQuery = { __typename?: 'Query', myRoles?: Array<Types.Auth0RoleName> | null | undefined };


export const UserRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myRoles"}}]}}]} as unknown as DocumentNode<UserRolesQuery, UserRolesQueryVariables>;