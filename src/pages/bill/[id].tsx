import { Layout } from "../../components/layout";
import { BillCard } from "../../components/bill-card";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  BillDocument,
  BillQuery,
} from "../../lib/page-graphql/query-bill.graphql.interface";
import { createApolloClient } from "../../lib/apollo-client";
import { getStaticPaginatedBills } from ".";
import { Loading } from "../../components/loading";
import { Banner } from "../../components/banner";
import { USStatesMap } from "../../components/us-states-map";
import {
  Avatar,
  Box,
  Chip,
  Container,
  ListItemButton,
  Paper,
  styled,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "../../components/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { initApolloClient } from "../../lib/with-apollo";

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

  let cosponsorStates = Object.fromEntries(
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
                  onClick={() => {}}
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
                  label={member.firstName}
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

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: (await getStaticPaginatedBills()).map((bill) => {
      return {
        params: {
          id: bill.id as string,
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<BillPageProps> = async ({
  params,
}) => {
  const id = params?.id;
  if (!id) {
    return { notFound: true };
  }
  const client = createApolloClient();
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
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default BillPage;
