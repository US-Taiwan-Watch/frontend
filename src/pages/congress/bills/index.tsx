import { Layout } from "../../../components/layout";
import { useI18n } from "../../../context/i18n";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import {
  BillsDocument,
  BillsQuery,
  BillsQueryVariables,
} from "../../../lib/page-graphql/query-bills.graphql.interface";
import { createApolloClient } from "../../../lib/apollo-client";
import { CardList } from "../../../components/card-list";
import { Banner } from "../../../components/banner";
import { initApolloClientWithLocale } from "../../../lib/with-apollo";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { useState } from "react";
import { PaginationControl } from "../../../components/pagination-control";
import { Container, Grid, Typography } from "@mui/material";
// import { MediaCard } from "../../components/media-card";
import { BillCardList } from "../../../components/bill-card-list";

const PAGE_SIZE = 10;

type BillListPageProps = {
  paginatedBills: BillsQuery["bills"];
  page: number;
  pageSize: number;
};

const BillListPage: NextPage<BillListPageProps> = (prefetched) => {
  const { i18n } = useI18n();
  const [bills, setBills] = useState(prefetched.paginatedBills.items);
  const client = useApolloClient();
  return (
    <Layout
      title={i18n.strings.bills.title}
      description={i18n.strings.bills.desc}
      draftMode={true}
    >
      <Banner
        title={i18n.strings.bills.title}
        subtitle={i18n.strings.bills.desc}
      ></Banner>
      <Container sx={{ my: 5 }}>
        <Grid container spacing={2}>
          <Grid item md={9}>
            <PaginationControl
              defaultPage={1}
              defaultPageSize={PAGE_SIZE}
              total={prefetched.paginatedBills.total}
              updateItems={async (page, pageSize) => {
                const paginatedBills = await getPaginatedBills(
                  page,
                  pageSize,
                  client
                );
                setBills(paginatedBills.items);
              }}
            />
            {/* <CardList
                cards={bills
                  .map((bill) => ({
                    title: bill.title?.text || "",
                    displayDate: new Date(bill.introducedDate || 0).toLocaleDateString(), // change to pub date
                    content: "",
                    url: `/bill/${bill.id}`,
                  }))}
              /> */}
            <BillCardList
              cards={bills.map((bill) => ({
                id: bill.id,
                billNumber: bill.billNumber,
                billType: bill.billType,
                congress: bill.congress,
                title: bill.title || undefined,
                introducedDate: bill.introducedDate || undefined,
                sponsor: bill.sponsor || undefined,
                cosponsorsCount: bill.cosponsorsCount || undefined,
                trackers: bill.trackers || undefined,
              }))}
            />
          </Grid>
          {/* <Grid item md={3}>
            <MediaCard />
          </Grid> */}
        </Grid>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  BillListPageProps
> = async ({ locale }) => {
  const client = initApolloClientWithLocale(locale);
  return {
    props: {
      paginatedBills: await getPaginatedBills(1, PAGE_SIZE, client),
      page: 1,
      pageSize: PAGE_SIZE,
    },
  };
};

export const getPaginatedBills = async (
  page: number,
  pageSize: number,
  client: ApolloClient<object>
): Promise<BillsQuery["bills"]> => {
  // const client = createApolloClient();
  const res = await client.query({
    query: BillsDocument,
    variables: {
      offset: (page - 1) * pageSize,
      limit: pageSize,
      query: { keywords: [] },
    },
    fetchPolicy: "network-only",
  });
  return {
    ...res.data.bills,
    items: res.data.bills.items.map((b) => ({
      ...b,
    })),
  };
};

export default BillListPage;
