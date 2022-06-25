import { gql, useApolloClient, useSubscription } from "@apollo/client";
import * as React from "react";
import { Layout } from "../../components/layout";
import { useFetchUser } from "../../lib/user";
import { NextPageWithApollo, withApollo } from "../../lib/with-apollo";
import { ImUserDocument } from "../../lib/page-graphql/query-imuser.graphql.interface";
import { BillsDocument, BillsQuery } from "../../lib/page-graphql/query-bills.graphql.interface";
import { Box } from "@mui/material";
import { Bill } from "../../generated/graphql-types";
import { createApolloClient } from "../../lib/apollo-client";

// Server side code
export async function getStaticProps() {
  // useApolloClient is a React hook, can only be used at client side.
  const client = createApolloClient();
  const { data } = await client.query({
    query: BillsDocument,  //ImUserDocument,
    fetchPolicy: "network-only",
  });
  // console.log(data.bills);
  return {
    props: {
      bills: data.bills.slice(0, 10),
    }
  }
}

/*
const DisplayBills: React.FC<{bills: Bill[]}> = ({ bills })=> {
  // const client = useApolloClient();
  // const [data, setData] = React.useState<BillsQuery>();

  // React.useEffect(() => {
  //   if (client) {
  //     (async () => {
  //       const data = await client.query({
  //         query: BillsDocument,  //ImUserDocument,
  //         fetchPolicy: "network-only",
  //       });
  //       console.log(data.data);
  //       setData(data.data);
  //     })();
  //   }
  // }, [client]);
  return (<Box sx={{ backgroundColor: "darkcyan" }}>
    {"Bills: "}
    {bills.map((bill: Bill) => (
      <pre>{JSON.stringify(bill)}</pre>
    ))}
  </Box>);
};
*/

interface PageProps {
  bills?: Bill[];
}

// Client side code (React)
const DisplayBills: NextPageWithApollo<PageProps> = ({ bills }) => {
  const { user, loading } = useFetchUser();
  console.log(bills);

  return (
    <Layout user={user} loading={loading}>
      <h1>Next.js and Auth0 Example</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in{" "}
            <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      {user?.email}

      {bills && <pre>{`PAGE_PROPS = ${JSON.stringify(bills)}`}</pre>}
    </Layout>
  );
};

// withApollo is needed only if this page requires fetching data from CLIENT SIDE.
// It can be used along with either both SSR or SSG page.
// By default (ssr: true) it adds getInitialProps to let SERVER SIDE RENDER the initial page
// (ref: https://nextjs.org/docs/api-reference/data-fetching/get-initial-props)
// which is not compatible with STATIC SITE GENERATION.
// We could remove withApollo if no client side fetching data is needed.
export default withApollo({ ssr: false })(DisplayBills);
// export default DisplayBills;
