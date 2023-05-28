import { Layout } from "../../components/layout";
import { useI18n } from "../../context/i18n";
import { GetServerSideProps, NextPage } from "next";
import { createApolloClient } from "../../lib/apollo-client";
import { CardList } from "../../components/card-list";
import { Banner } from "../../components/banner";
import { Autocomplete, Pagination, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CongressUtils } from "../../../common/utils/congress-utils";
import {
  MembersDocument,
  MembersQuery,
} from "../../lib/page-graphql/query-members.graphql.interface";
import {
  REGIONS,
  STATES,
  TERRITORIES,
} from "../../../common/constants/member-constants";
import { MemberFiltersInput } from "../../generated/graphql-types";

const PAGE_SIZE = 10;

type MemberListPageProps = {
  preFetchedPaginatedMembers: MembersQuery["members"];
};

const ALL_CONGRESS_NUMBERS = Array.from(
  { length: CongressUtils.getCurrentCongress() },
  (_, index) => (CongressUtils.getCurrentCongress() - index).toString()
);

const ALL_STATES = [...STATES, ...TERRITORIES, ...REGIONS];

const firstStates: [number, number, MemberFiltersInput] = [
  1,
  PAGE_SIZE,
  { congress: CongressUtils.getCurrentCongress() },
];

const MemberListPage: NextPage<MemberListPageProps> = ({
  preFetchedPaginatedMembers,
}) => {
  const { i18n } = useI18n();
  const [page, setPage] = useState(firstStates[0]);
  const [pageSize, setPageSize] = useState(firstStates[1]);
  const [filters, setFilters] = useState(firstStates[2]);
  const [totalCount, setTotalCount] = useState(
    preFetchedPaginatedMembers.total
  );
  const [members, setMembers] = useState(preFetchedPaginatedMembers.items);
  const initialRender = useRef(true);

  useEffect(() => {
    // Skip the effect on the first render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    getPaginatedMembers(page, pageSize, filters).then((paginatedMembers) => {
      setMembers(paginatedMembers.items);
      setTotalCount(paginatedMembers.total);
    });
  }, [page, filters]);

  return (
    <Layout
      title={i18n.strings.bills.title}
      description={i18n.strings.bills.desc}
    >
      <Banner
        title={i18n.strings.bills.title}
        subtitle={i18n.strings.bills.desc}
      ></Banner>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={filters.congress?.toString()}
        options={ALL_CONGRESS_NUMBERS}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Congress Number" />
        )}
        onChange={(_e, value) => {
          setPage(1);
          setFilters({
            ...filters,
            congress: value == null ? null : parseInt(value),
          });
        }}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={filters.state}
        options={ALL_STATES}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="State" />}
        onChange={(_e, value) => {
          setPage(1);
          setFilters({
            ...filters,
            state: value,
          });
        }}
      />
      <Pagination
        page={page}
        count={Math.ceil(totalCount / pageSize)}
        onChange={(_e, page) => setPage(page)}
      />
      <CardList
        cards={members.map((member) => ({
          title: `${member.firstName} ${member.lastName}`,
          displayDate: "", // change to pub date
          content: "",
          image: member.profilePictureUri || undefined,
          url: `/bill/${member.id}`,
        }))}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  MemberListPageProps
> = async () => {
  return {
    props: {
      preFetchedPaginatedMembers: await getPaginatedMembers(...firstStates),
    },
  };
};

export const getPaginatedMembers = async (
  page: number,
  pageSize: number,
  filters: MemberFiltersInput
): Promise<MembersQuery["members"]> => {
  const client = createApolloClient();
  const res = await client.query({
    query: MembersDocument,
    variables: { offset: (page - 1) * pageSize, limit: pageSize, filters },
    fetchPolicy: "cache-first",
  });
  return res.data.members;
};

export default MemberListPage;
