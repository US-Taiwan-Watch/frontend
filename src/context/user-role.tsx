import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { UserRolesDocument } from "../lib/page-graphql/query-user-roles.graphql.interface";
import { Auth0RoleName } from "../generated/graphql-types";
import { useFetchUser } from "../lib/user";

type IUserRoleContext = {
  roles: Auth0RoleName[],
  isAdmin: boolean,
  isEditor: boolean,
}

export const UserRoleContext = React.createContext({
  roles: [] as Auth0RoleName[],
  isAdmin: false,
  isEditor: false,
});

export const useUserRole = () => React.useContext(UserRoleContext);

export const UserRoleProvider = React.memo(({ children }) => {
  const client = useApolloClient();
  const { user } = useFetchUser();
  const [roles, setRoles] = useState<Auth0RoleName[]>([]);

  React.useEffect(() => {
    if (client && user) {
      client.query({
        query: UserRolesDocument,
        fetchPolicy: "network-only",
      }).then(res => {
        setRoles(res.data.myRoles ?? []);
      });
    }
  }, [client, user]);

  return <UserRoleContext.Provider value={{
    roles,
    isAdmin: roles.includes(Auth0RoleName.Admin),
    isEditor: roles.includes(Auth0RoleName.Admin) || roles.includes(Auth0RoleName.Editor)
  }}>
    {children}
  </UserRoleContext.Provider>;
});
