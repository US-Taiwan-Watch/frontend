import { Layout } from "../../../components/layout";
import { useI18n } from "../../../context/i18n";
import { GetServerSideProps, NextPage } from "next";
import { CardList } from "../../../components/card-list";
import { Banner } from "../../../components/banner";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
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
import { PaginationControl } from "../../../components/pagination-control";

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
  const [filters, setFilters] = useState(prefetched.filters);
  const [members, setMembers] = useState(prefetched.paginatedMembers.items);
  const client = useApolloClient();

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
      <PaginationControl
        defaultPage={page}
        defaultPageSize={PAGE_SIZE}
        total={prefetched.paginatedMembers.total}
        params={filters}
        updateItems={async (page, pageSize) => {
          const paginatedMembers = await getPaginatedMembers(
            page,
            pageSize,
            filters,
            client
          );
          setMembers(paginatedMembers.items);
          setPage(page);
        }}
      />
      <CardList
        cards={members.map((member) => ({
          title: member.displayName?.text || "",
          displayDate: "", // change to pub date
          content: "",
          image: member.profilePictureUri || undefined,
          url: `/congress/members/${member.id}`,
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
