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
import { GetStaticProps } from "next";
import { BillDocument, BillQueryVariables } from "../../lib/page-graphql/query-bill.graphql.interface";

type BillPageProps = {
  data?: any
}

const BillPage: NextPageWithApollo<BillPageProps> = ({ data }) => {
  console.log(data)
  return (
    // <Layout>
    //   {/* <BillCard id={bill.id} title={bill.title} introducedDate={bill.introducedDate} sponsor={bill.sponsor}></BillCard> */}
    // </Layout>
    <pre></pre>
  );
};

BillPage.getInitialProps = async ({ req, query, apolloClient }) => {
  try {
    console.log(apolloClient);
    const data = await apolloClient?.query({
      query: BillDocument,
      variables: { billId: "116-hr-2002" as string },
      fetchPolicy: "network-only",
    });

    // const bill = data?.bill;
    return {
      props: {
        data,
      }
    };
  } catch (err) {
    console.error(err);
    return { data: undefined };

  }

}

export default withApollo()(BillPage);