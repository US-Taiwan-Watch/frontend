import { Layout } from "../../components/layout";
import { useI18n } from "../../context/i18n";
import { GetStaticProps, NextPage } from "next";
import { BillsDocument, BillsQuery, BillsQueryVariables } from "../../lib/page-graphql/query-bills.graphql.interface";
import { createApolloClient } from "../../lib/apollo-client";
import { CardList } from "../../components/card-list";
import { Banner } from "../../components/banner";

type BillListPageProps = {
  bills: BillsQuery['bills']['items'],
}

const BillListPage: NextPage<BillListPageProps> = ({ bills }) => {
  console.log(bills)
  const { i18n } = useI18n();
  return (
    <Layout
      title={i18n.strings.bills.title}
      description={i18n.strings.bills.desc}>
      <Banner
        title={i18n.strings.bills.title}
        subtitle={i18n.strings.bills.desc}>
      </Banner>
      <CardList
        cards={bills
          .map((bill) => ({
            title: bill.title?.text || "",
            displayDate: new Date(bill.introducedDate || 0).toLocaleDateString(), // change to pub date
            content: "",
            url: `/bill/${bill.id}`,
          }))}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<BillListPageProps> = async () => {
  return {
    props: {
      bills: await getStaticPaginatedBills(),
    },
    revalidate: 300, // In seconds
  }
};

export const getStaticPaginatedBills = async (): Promise<BillsQuery['bills']['items']> => {
  const client = createApolloClient();
  const res = await client.query({
    query: BillsDocument,
    variables: { offset: 0 as number, limit: 20 as number },
    fetchPolicy: "network-only",
  });
  return res.data.bills.items.map((bill) => ({
    ...bill,
  }));

};

export default BillListPage;