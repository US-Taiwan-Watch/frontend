import { NextPageWithApollo, withApollo } from "../../lib/with-apollo";
import { gql, useApolloClient } from "@apollo/client";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box
} from '@mui/material';
import { Link } from "../../components/link";
import { Layout } from "../../components/layout";
import { BillCard } from "../../components/bill-card";
import { useI18n } from "../../context/i18n";
import { Bill } from "../../../common/models";
import { useFetchUser } from "../../lib/user";
import { GetStaticProps, NextPage } from "next";
import { BillDocument, BillQueryVariables } from "../../lib/page-graphql/query-bill.graphql.interface";
import { createApolloClient } from "../../lib/apollo-client";
import { DenormalizedBill } from "../../generated/graphql-types";

type BillPageProps = {
  bill: DenormalizedBill,
}

const BillPage: NextPage<BillPageProps> = ({ bill }) => {
  console.log(bill)
  return (
    <Layout>
      <BillCard
        billNumber={bill.billNumber}
        billType={bill.billType}
        congress={bill.congress}
        title={bill.title.zh || undefined}
        introducedDate={bill.introducedDate || undefined}
        sponsor={"" + bill.sponsor?.firstName_zh + " " + bill.sponsor?.lastName_zh || undefined}
        cosponsorCount={bill.cosponsorsCount || undefined}
        trackers={bill.trackers || undefined}></BillCard>
    </Layout>
    // <pre></pre>
  );
};

export const getStaticProps: GetStaticProps<BillPageProps> = async ({ req, query }) => {
  const client = createApolloClient();
  console.log(client);
  const data = await client.query({
    query: BillDocument,
    variables: { billId: "116-hr-2002" as string },
    fetchPolicy: "network-only"
  });
  const bill = data.data.bill;
  console.log(bill);
  return {
    props: {
      bill,
    }
  }
};

export default BillPage;