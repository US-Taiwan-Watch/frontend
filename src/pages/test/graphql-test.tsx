import { gql, useApolloClient, useSubscription } from "@apollo/client";
import * as React from "react";
import { Layout } from "../../components/layout";
import { useFetchUser } from "../../lib/user";
import { NextPageWithApollo, withApollo } from "../../lib/with-apollo";
import { ImUserDocument } from "../../lib/page-graphql/query-imuser.graphql.interface";
import { BillsDocument, BillsQuery } from "../../lib/page-graphql/query-bills.graphql.interface";
import { OnUserEventDocument as OnUserEvent } from "../../lib/page-graphql/sub-user-event.graphql.interface";
import { Box } from "@mui/material";

const TestGraphQL: React.FC = () => {
  const client = useApolloClient();
  const [data, setData] = React.useState<BillsQuery>();

  React.useEffect(() => {
    if (client) {
      (async () => {
        const data = await client.query({
          query: BillsDocument,  //ImUserDocument,
          fetchPolicy: "network-only",
        });
        console.log(data.data);
        setData(data.data);
      })();
    }
  }, [client]);
  return (<Box sx={{ backgroundColor: "darkcyan" }}>
    {"Bills: "}
    {data?.bills.map((bill) => (
      <pre>{JSON.stringify(bill)}</pre>
    ))}
  </Box>);
};

const SubscriptionTest: React.FC = () => {
  const { data } = useSubscription(OnUserEvent, {
    variables: { userId: "u1" },
  });
  const event = data?.onUserEvent.data;
  const [lines, setLines] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (event) {
      setLines((l) => [event, ...l]);
    }
  }, [event]);

  return (
    <Box sx={{ backgroundColor: "darkcyan" }}>
      {"Subscription Data: "}
      {lines.map((line) => (
        <pre>{JSON.stringify(line)}</pre>
      ))}
    </Box>
  );
};

interface PageProps {
  data?: any;
}

const Page: NextPageWithApollo<PageProps> = ({ data }) => {
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

      {user && <TestGraphQL />}
      {/* <SubscriptionTest /> */}

      {data && <pre>{`PAGE_PROPS = ${JSON.stringify(data)}`}</pre>}
    </Layout>
  );
};

Page.getInitialProps = async ({ apolloClient }) => {
  const data = await apolloClient?.query({
    query: ImUserDocument,
    variables: {},
    fetchPolicy: "network-only",
  });
  return {};
};

export default withApollo()(Page);
