import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Auth0RoleName } from "../generated/graphql-types";
import { UserRolesDocument } from "./page-graphql/query-user-roles.graphql.interface";
import { initApolloClient } from "./with-apollo";

export interface IUser {
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email?: string;
  email_verified?: boolean;
  sub: string;
}

export interface USTWWindow extends Window {
  __user?: IUser;
  __userRoles?: Auth0RoleName[];
}

export const fetchUser = async (cookie = "") => {
  const asWindow = (window as USTWWindow) ?? undefined;

  if (typeof window !== "undefined" && asWindow.__user) {
    return asWindow.__user;
  }

  const res = await fetch(
    "/api/me",
    cookie
      ? {
          headers: {
            cookie,
          },
        }
      : {}
  );

  if (!res.ok) {
    delete asWindow.__user;
    delete asWindow.__userRoles;
    return null;
  }

  const json = await res.json();
  if (typeof window !== "undefined") {
    asWindow.__user = json;
  }
  return json;
};

export const useFetchUser = ({ required }: { required?: boolean } = {}) => {
  const { asPath } = useRouter();
  const [loading, setLoading] = useState(
    () => !(typeof window !== "undefined" && (window as USTWWindow).__userRoles)
  );
  const client = useApolloClient();
  const [roles, setRoles] = useState(
    () => typeof window === "undefined" ? undefined : (window as USTWWindow).__userRoles);

  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return;
    }
    return (window as USTWWindow).__user;
  });

  const callback = process.env.NEXT_PUBLIC_BASE_URL + asPath.replace(/[#|?].*$/, '');

  useEffect(
    () => {
      if (user) {
        return;
      }
      setLoading(true);
      let isMounted = true;

      fetchUser().then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = `/api/login?callback=${callback}`;
            return;
          }
          setUser(user);
        }
      });

      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (roles || !user) {
      return;
    }
    client.query({
      query: UserRolesDocument,
      fetchPolicy: "network-only",
    }).then(res => {
      setRoles(res.data.myRoles ?? []);
      if (!res.data.myRoles) {
        delete (window as USTWWindow).__userRoles;
      }
      setLoading(false);
      (window as USTWWindow).__userRoles = res.data.myRoles || undefined;
    });
  }, [client, user]);

  return {
    user,
    loading,
    roles,
    isAdmin: roles?.includes(Auth0RoleName.Admin),
    isEditor: roles?.includes(Auth0RoleName.Admin) || roles?.includes(Auth0RoleName.Editor),
  };
};
