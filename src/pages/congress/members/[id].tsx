import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from 'next/router'

import {
  MemberDocument,
  MemberQuery,
} from "../../../lib/page-graphql/query-member.graphql.interface";

import { initApolloClientWithLocale } from "../../../lib/with-apollo";

import { Loading } from "../../../components/loading";
import { Layout } from "../../../components/layout";
import MemberBriefCard from "../../../components/member-brief-card";

// brief - if props exist => user it
//         other => don't exist => query

// full - query

type MemberPageProps = {
  member_data?: MemberQuery['member']
};

const MemberPage: NextPage<MemberPageProps> = ({ member_data }) => {
  const router = useRouter();
  const rt_id = router.query.id;

  if (!member_data) {
    return <Loading />;
  }

  // TODO: add title in layout

  return (
    <Layout>
      <MemberBriefCard
        member_data={ member_data } />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
}


export const getStaticProps: GetStaticProps<MemberPageProps> = async ({
  params,
  locale
}) => {
  if (!params?.id || Array.isArray(params.id)) {
    return { notFound: true };
  }

  const id = params.id;
  if (!RegExp(/^[A-Z][0-9]{6}$/).test(id)) {
    return { notFound: true };
  }

  const apolloClient = initApolloClientWithLocale(locale);

  try {
    const data = await apolloClient.query({
      query: MemberDocument,
      variables: { bioGuideId: id },
      fetchPolicy: "network-only",
    });

    const member_data = data.data.member;
    if (!member_data) {
      return { notFound: true};
    }

    return {
      props: { member_data },
      revalidate: 3600, // In seconds
    };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }

};

export default MemberPage;
