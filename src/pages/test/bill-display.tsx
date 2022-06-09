import { gql, useApolloClient, useSubscription } from "@apollo/client";
import * as React from "react";
import { Layout } from "../../components/layout";
import { useFetchUser } from "../../lib/user";
import { NextPageWithApollo, withApollo } from "../../lib/with-apollo";
import { ImUserDocument } from "../../lib/page-graphql/query-imuser.graphql.interface";
import { BillsDocument, BillsQuery } from "../../lib/page-graphql/query-bills.graphql.interface";
import { Box } from "@mui/material";
import { Bill } from "../../generated/graphql-types";

export async function getStaticProps() {
  const client = useApolloClient();
  const { data } = await client.query({
    query: BillsDocument,  //ImUserDocument,
    fetchPolicy: "network-only",
  });
  console.log(data.bills);
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

const DisplayBills: NextPageWithApollo<PageProps> = ({ bills }) => {
  const { user, loading } = useFetchUser();

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

      {user}

      {bills && <pre>{`PAGE_PROPS = ${JSON.stringify(bills)}`}</pre>}
    </Layout>
  );
};

export default withApollo()(DisplayBills);
