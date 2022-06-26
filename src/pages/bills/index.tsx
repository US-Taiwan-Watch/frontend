/* SSR -> Bill list */
// incremental-static-regeneration -> Bill
// To Do:
// 1. GraphQL setting & query
// 2. table ui
// 3. Typescript setting

import { NextPageWithApollo, withApollo } from "../../lib/with-apollo";
import { useApolloClient } from "@apollo/client";
import { BillsDocument, BillsQueryVariables } from "../../lib/page-graphql/query-bills.graphql.interface";

import { GetServerSideProps } from "next";
import * as React from "react";
import { gql } from "@apollo/client";
// import client from "../apollo-client";

interface BillsPageProps {
  data?: any; // To Do: 換成query params
}

// Page Component
const BillsPage: NextPageWithApollo<BillsPageProps> = ({ data }) => {
  console.log('data', data)
  return <></>;
};

BillsPage.getInitialProps = async ({ apolloClient }) => {
  const data = await apolloClient?.query({
    query: BillsDocument,
    variables: {
      // offset,
      // limit,
    },
    fetchPolicy: "network-only",
  });
  return {
    data
  };
};
// export default BillsPage;
export default withApollo()(BillsPage);
