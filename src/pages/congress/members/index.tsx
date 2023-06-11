import { Layout } from "../../../components/layout";
import { useI18n } from "../../../context/i18n";
import { GetServerSideProps, NextPage } from "next";
import { createApolloClient } from "../../../lib/apollo-client";
import { CardList } from "../../../components/card-list";
import { Banner } from "../../../components/banner";
import { Autocomplete, Pagination, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CongressUtils } from "../../../../common/utils/congress-utils";
import {
  MembersDocument,
  MembersQuery,
} from "../../../lib/page-graphql/query-members.graphql.interface";
import {
  REGIONS,
  STATES,
  TERRITORIES,
} from "../../../../common/constants/member-constants";
import { MemberFiltersInput } from "../../../generated/graphql-types";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { initApolloClientWithLocale } from "../../../lib/with-apollo";

const PAGE_SIZE = 10;

type MemberListPageProps = {
  paginatedMembers: MembersQuery["members"];
  page: number;
  pageSize: number;
  filters: MemberFiltersInput;
};

const ALL_CONGRESS_NUMBERS = Array.from(
  { length: CongressUtils.getCurrentCongress() },
  (_, index) => (CongressUtils.getCurrentCongress() - index).toString()
);

const ALL_STATES = [...STATES, ...TERRITORIES, ...REGIONS];

const MemberListPage: NextPage<MemberListPageProps> = (prefetched) => {
  const { i18n } = useI18n();
  const [page, setPage] = useState(prefetched.page);
  const [pageSize, setPageSize] = useState(prefetched.pageSize);
  const [filters, setFilters] = useState(prefetched.filters);
  const [totalCount, setTotalCount] = useState(
    prefetched.paginatedMembers.total
  );
  const [members, setMembers] = useState(prefetched.paginatedMembers.items);
  const initialRender = useRef(true);
  const client = useApolloClient();

  useEffect(() => {
    // Skip the effect on the first render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    getPaginatedMembers(page, pageSize, filters, client).then(
      (paginatedMembers) => {
        setMembers(paginatedMembers.items);
        setTotalCount(paginatedMembers.total);
      }
    );
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
          title: member.displayName?.text || "",
          displayDate: "", // change to pub date
          content: "",
          image: member.profilePictureUri || undefined,
          url: `/bill/${member.id}`,
        }))}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<MemberListPageProps> = async ({
  locale,
}) => {
  const filters = { congress: CongressUtils.getCurrentCongress() };
  const client = initApolloClientWithLocale(locale);
  return {
    props: {
      paginatedMembers: await getPaginatedMembers(
        1,
        PAGE_SIZE,
        filters,
        client
      ),
      page: 1,
      pageSize: PAGE_SIZE,
      filters,
    },
  };
};

export const getPaginatedMembers = async (
  page: number,
  pageSize: number,
  filters: MemberFiltersInput,
  client: ApolloClient<object>
): Promise<MembersQuery["members"]> => {
  const res = await client.query({
    query: MembersDocument,
    variables: { offset: (page - 1) * pageSize, limit: pageSize, filters },
    fetchPolicy: "cache-first",
  });
  return res.data.members;
};

export default MemberListPage;
