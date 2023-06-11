import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { OperationDefinitionNode } from "graphql";
import { createClient } from "graphql-ws";
import { appConfig } from "../../config";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

let accessToken: string | undefined;

export const requestAccessToken = async () => {
  if (accessToken) {
    return accessToken;
  }

  const res = await fetch(`/api/session`);
  if (res.ok) {
    const json = await res.json();
    return json.idToken;
  }
  return null;
};

const createHttpLink = (headers?: any) => {
  const httpLink = new HttpLink({
    uri: appConfig.graphql.httpHost,
    headers, // auth token is fetched on the server side
    fetch,
    ...(headers?.authorization && { credentials: "include" }),
  });
  return httpLink;
};

const createWSLink = () =>
  new GraphQLWsLink(
    createClient({
      url: appConfig.graphql.wsHost,
      connectionParams: async () => {
        await requestAccessToken(); // happens on the client
        return { authentication: accessToken ? `Bearer ${accessToken}` : "" };
      },
    })
  );

export const createApolloClient = (
  headers?: any,
  initialState?: NormalizedCacheObject,
  authLink?: ApolloLink
) => {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink(headers);
  } else {
    // link = createWSLink();
    const wsLink = createWSLink();
    const httpLink = createHttpLink(headers);
    link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(
          query
        ) as OperationDefinitionNode;
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLink
    );
  }

  if (authLink) {
    link = authLink.concat(link);
  }

  const cache = new InMemoryCache();
  initialState && cache.restore(initialState);

  return new ApolloClient({
    ssrMode,
    link,
    cache,
  });
};
