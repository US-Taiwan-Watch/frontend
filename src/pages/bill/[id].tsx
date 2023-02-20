import { Layout } from "../../components/layout";
import { BillCard } from "../../components/bill-card";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { BillDocument, BillQueryVariables, BillQuery } from "../../lib/page-graphql/query-bill.graphql.interface";
import { createApolloClient } from "../../lib/apollo-client";
import { getStaticPaginatedBills } from ".";
import { Loading } from "../../components/loading";
import { Banner } from "../../components/banner";

type BillPageProps = {
  bill: BillQuery['bill'],
}

const BillPage: NextPage<BillPageProps> = ({ bill }) => {
  if (!bill) {
    return <Loading />;
  }
  console.log(bill)
  return (
    <Layout>
      <Banner>
        <BillCard
          billNumber={bill.billNumber}
          billType={bill.billType}
          congress={bill.congress}
          title={bill.title?.zh || undefined}
          introducedDate={bill.introducedDate || undefined}
          sponsor={bill.sponsor || undefined}
          cosponsorCount={bill.cosponsorsCount || undefined}
          trackers={bill.trackers || undefined}>
        </BillCard>
      </Banner>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: (await getStaticPaginatedBills()).map((bill) => {
      return {
        params: {
          id: bill.id as string,
        },
      }
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<BillPageProps> = async ({ params }) => {
  console.log(params)
  const id = params?.id;
  if (!id) {
    return { notFound: true };
  }
  const client = createApolloClient();
  try {
    const data = await client.query({
      query: BillDocument,
      variables: { billId: id as string },
      fetchPolicy: "network-only"
    });
    const bill = data.data.bill;
    console.log(bill);
    return {
      props: {
        bill,
      }
    }
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default BillPage;