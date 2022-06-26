export const appConfig = {
  graphql: {
    httpHost: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_HOST,
    wsHost: process.env.NEXT_PUBLIC_GRAPHQL_WS_HOST || '',
  },
};
