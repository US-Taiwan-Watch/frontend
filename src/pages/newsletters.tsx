import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layout";
import { useI18n } from "../context/i18n";
import { Banner } from "../components/banner";
import { CardList } from "../components/card-list";
import { getNewsLetters, NewsLetter } from "../utils/newsletters-utils";

type NewsLetterPageProps = {
  newsletters: NewsLetter[],
}

const NewsLetterPage: NextPage<NewsLetterPageProps> = ({ newsletters }) => {
  const { i18n } = useI18n();
  return (
    <Layout>
      <Banner title={i18n.strings.header.subscribe} subtitle={i18n.strings.landing.subscribeDesc} />
      <CardList cards={newsletters.map(p => ({
        ...p,
        displayDate: new Date(p.pubDate).toDateString(),
        url: p.link,
        content: p.preview
      }))} />

    </Layout >
  );
};

export const getStaticProps: GetStaticProps<NewsLetterPageProps> = async () => {
  return {
    props: {
      newsletters: await getNewsLetters(),
    },
    revalidate: 300, // In seconds
  }
}

export default NewsLetterPage;
