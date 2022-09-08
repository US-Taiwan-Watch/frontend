import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  NextLink,
  NormalizedCacheObject,
  Operation,
} from "@apollo/client";
import { NextComponentType, NextPage, NextPageContext } from "next";
import React from "react";
import { createApolloClient, requestAccessToken } from "./apollo-client";
import { getS2SToken } from "./ustw-api-s2s";
import { auth0 } from "./auth0";
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */
// export const initOnContext = (ctx) => {
//   const inAppContext = Boolean(ctx.ctx);

//   // We consider installing `withApollo({ ssr: true })` on global App level
//   // as antipattern since it disables project wide Automatic Static Optimization.
//   if (process.env.NODE_ENV === "development") {
//     if (inAppContext) {
//       console.warn(
//         "Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n" +
//           "Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n"
//       );
//     }
//   }

//   // Initialize ApolloClient if not already done
//   const apolloClient =
//     ctx.apolloClient ||
//     initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);

//   // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
//   // Otherwise, the component would have to call initApollo() again but this
//   // time without the context. Once that happens, the following code will make sure we send
//   // the prop as `null` to the browser.
//   apolloClient.toJSON = () => null;

//   // Add apolloClient to NextPageContext & NextAppContext.
//   // This allows us to consume the apolloClient inside our
//   // custom `getInitialProps({ apolloClient })`.
//   ctx.apolloClient = apolloClient;
//   if (inAppContext) {
//     ctx.ctx.apolloClient = apolloClient;
//   }

//   return ctx;
// };

export const getHeaders = async (
  ctx?: NextPageContextWithApollo,
  s2s?: boolean
) => {
  if (typeof window !== "undefined") return null;

  const token = s2s
    ? await getS2SToken()
    : ctx?.req && ctx?.res
    ? (await auth0.getSession(ctx.req, ctx.res))?.idToken
    : null;

  return !token
    ? null
    : {
        authorization: `Bearer ${token}`,
      };
};

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
export const initApolloClient = (
  headers?: any,
  initialState?: NormalizedCacheObject,
  authLink?: ApolloLink
) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  // but allow using the same client in build time
  if (typeof window === "undefined" && process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    return createApolloClient(headers, initialState);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(headers, initialState, authLink);
  }

  return globalApolloClient;
};

/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */
export interface WithApolloProps {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  apolloState?: NormalizedCacheObject;
}

export interface NextPageContextWithApollo extends NextPageContext {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
}

export type NextPageWithApollo<P = unknown> = NextComponentType<
  NextPageContextWithApollo,
  P & WithApolloProps,
  P & WithApolloProps
>;

export interface WithApolloCreate {
  ssr?: boolean;
  s2s?: boolean;
}

export const useInitApolloClient = (
  apolloClient?: ApolloClient<NormalizedCacheObject>,
  apolloState?: NormalizedCacheObject
) => {
  let _client: ApolloClient<NormalizedCacheObject>;
  if (apolloClient) {
    // Happens on: getDataFromTree & next.js ssr
    _client = apolloClient;
  } else {
    // Happens on: next.js csr
    // client = initApolloClient(apolloState, undefined);
    _client = initApolloClient(undefined, apolloState);
  }

  const [client, setClient] = React.useState(_client);
  React.useEffect(() => {
    if (!apolloClient) {
      (async () => {
        const accessToken = await requestAccessToken();
        if (accessToken) {
          const authorization = `Bearer ${accessToken}`;
          const authLink = new ApolloLink(
            (operation: Operation, forward: NextLink) => {
              const ticket = localStorage.getItem("currentTicket");
              operation.setContext({
                headers: {
                  ...(authorization && { authorization }),
                  ...(ticket && { ticket }),
                },
              });
              return forward(operation);
            }
          );

          globalApolloClient = undefined;
          const c = initApolloClient(undefined, apolloState, authLink);
          setClient(c);
        }
      })();
    }
  }, [apolloClient, apolloState]);

  return client;
};

export const withApollo =
  ({ ssr = true, s2s = false }: WithApolloCreate = {}) =>
  <P extends object>(PageComponent: NextPage<P>) => {
    const WithApollo: NextPageWithApollo<P> = ({
      apolloClient,
      apolloState,
      ...pageProps
    }) => {
      const client = useInitApolloClient(apolloClient, apolloState);
      return (
        <ApolloProvider client={client}>
          <PageComponent {...(pageProps as P)} />
        </ApolloProvider>
      );
    };

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== "production") {
      const displayName =
        PageComponent.displayName || PageComponent.name || "Component";
      WithApollo.displayName = `withApollo(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
      WithApollo.getInitialProps = async (ctx) => {
        const { AppTree } = ctx;

        // Initialize ApolloClient, add it to the ctx object so
        // we can use it in `PageComponent.getInitialProp`.
        const headers = await getHeaders(ctx, s2s);
        const apolloClient = initApolloClient(headers);
        ctx.apolloClient = apolloClient;

        // Run wrapped getInitialProps methods
        let pageProps = {} as P;
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx);
        }

        // Only on the server:
        if (typeof window === "undefined") {
          // When redirecting, the response is finished.
          // No point in continuing to render
          if (ctx.res && ctx.res.writableEnded) {
            return pageProps;
          }

          // Only if ssr is enabled
          if (ssr) {
            try {
              // Run all GraphQL queries
              const { getDataFromTree } = await import(
                "@apollo/client/react/ssr"
              );

              const html = await getDataFromTree(
                <AppTree
                  pageProps={{
                    ...pageProps,
                    apolloClient,
                  }}
                />
              );

              console.dir(html);
            } catch (error) {
              // Prevent Apollo Client GraphQL errors from crashing SSR.
              // Handle them in components via the data.error prop:
              // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
              console.error("Error while running `getDataFromTree`", error);
            }
          }
        }

        // Extract query data from the Apollo store
        const apolloState = apolloClient.cache.extract();

        return {
          ...pageProps,
          apolloState,
        } as P & WithApolloProps;
      };
    }

    return WithApollo;
  };
