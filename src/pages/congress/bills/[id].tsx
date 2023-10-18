import { Layout } from "../../../components/layout";
import { BillCard } from "../../../components/bill-card";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  BillDocument,
  BillQuery,
} from "../../../lib/page-graphql/query-bill.graphql.interface";
import { getPaginatedBills } from ".";
import { Loading } from "../../../components/loading";
import { Banner } from "../../../components/banner";
import { USStatesMap } from "../../../components/us-states-map";
import { Avatar, Box, Chip, Container, styled } from "@mui/material";
import { Link } from "../../../components/link";
import { initApolloClientWithLocale } from "../../../lib/with-apollo";
import { useApolloClient } from "@apollo/client";
import { getStaticPathsWithLocale } from "../../../utils/page-utils";

type BillPageProps = {
  bill: BillQuery["bill"];
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const BillPage: NextPage<BillPageProps> = ({ bill }) => {
  if (!bill) {
    return <Loading />;
  }

  const cosponsorStates = Object.fromEntries(
    bill.cosponsors
      .reduce((map, member) => {
        const state = member.congressRoleSnapshot?.state;
        if (!state) {
          return map;
        }
        if (map.has(state)) {
          map.set(state, map.get(state)! + 1);
        } else {
          map.set(state, 1);
        }
        return map;
      }, new Map<string, number>())
      .entries()
  );
  return (
    <Layout draftMode={true}>
      <Banner>
        <BillCard
          id={bill.id}
          billNumber={bill.billNumber}
          billType={bill.billType}
          congress={bill.congress}
          title={bill.title || undefined}
          introducedDate={bill.introducedDate || undefined}
          sponsor={bill.sponsor || undefined}
          cosponsorsCount={bill.cosponsorsCount || undefined}
          trackers={bill.trackers || undefined}
        ></BillCard>
      </Banner>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            border: 0,
          }}
          component="ul"
        >
          {bill.cosponsors?.map((member) => (
            <ListItem key={member.id}>
              <Link href={`/congress/members/${member.id}`}>
                <Chip
                  // onClick={() => {}}
                  avatar={
                    <Avatar
                      sx={{
                        background: getPartyColor(
                          member.congressRoleSnapshot?.party
                        ),
                      }}
                    >
                      {member.congressRoleSnapshot?.state}
                    </Avatar>
                  }
                  label={member.displayName?.text}
                />
              </Link>
            </ListItem>
          ))}
        </Box>
        <USStatesMap
          heatData={cosponsorStates}
          onStateClick={(code) => {
            console.log(code);
          }}
          // sameHeat={true}
        />
      </Container>
    </Layout>
  );
};

const getPartyColor = (party?: string | null) => {
  switch (party) {
    case "Republican":
      return "red";
    case "Democrat":
      return "blue";
    default:
      return null;
  }
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async ({
  locales,
}) => {
  const client = initApolloClientWithLocale();
  return {
    paths: getStaticPathsWithLocale(
      (await getPaginatedBills(1, 10, client)).items.map((bill) => {
        return {
          params: {
            id: bill.id as string,
          },
        };
      }),
      locales
    ),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<BillPageProps> = async ({
  params,
  locale,
}) => {
  const id = params?.id;
  if (!id) {
    return { notFound: true };
  }
  const client = initApolloClientWithLocale(locale);
  try {
    const data = await client.query({
      query: BillDocument,
      variables: { billId: id as string },
      fetchPolicy: "network-only",
    });
    const bill = data.data.bill;
    return {
      props: {
        bill,
      },
      revalidate: 300,
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default BillPage;
