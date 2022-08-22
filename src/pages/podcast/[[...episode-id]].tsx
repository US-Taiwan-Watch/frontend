import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { useI18n } from "../../context/i18n";
import { Banner } from "../../components/banner";
import { parseStringPromise } from "xml2js";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Section } from "../../components/section";
import { useRouter } from "next/router";
import Head from "next/head";
import { podcastPlatforms } from "../../components/social-media";
import Error from "next/error";

export type PodcastEpisode = {
  id: string,
  title: string,
}

export const getPodcastEpisodes = async (): Promise<PodcastEpisode[]> => {
  const response = await fetch('https://feeds.soundon.fm/podcasts/6cdfccc6-7c47-4c35-8352-7f634b1b6f71.xml');
  const text = await response.text();
  const xml = await parseStringPromise(text);
  return xml.rss.channel[0].item.map((item: any) => ({
    id: item.guid[0]['_'],
    title: item.title[0],
  }));
}

type PodcastPageProps = {
  episodes: PodcastEpisode[],
}

const PodcastPage: NextPage<PodcastPageProps> = ({ episodes }) => {
  const { i18n } = useI18n();
  const router = useRouter();
  const episodeID = router.query['episode-id'] ? router.query['episode-id'][0] : episodes[0].id;
  const isIndex = router.query['episode-id'] ? false : true;
  const episode = episodes.find(e => e.id === episodeID);
  if (!episode) {
    return <Error statusCode={404} />
  }

  return (
    <Layout>
      <Head>
        <title>{`${isIndex ? '觀測站底加辣' : episode.title} - ${i18n.strings.brand.fullName}`}</title>
        <meta property="og:title" content={i18n.strings.newsletter.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL + router.pathname} />
        <meta property="og:description" content={i18n.strings.landing.subscribeDesc} />
      </Head>
      <Banner
        title={'觀測站底加辣'}
        subtitle={i18n.strings.social.podcast}
        actions={podcastPlatforms.map(p => ({ text: p.name, url: p.link }))}
      />
      <Section id="podcast" title="播放單集" >
        <iframe src={`https://player.soundon.fm/embed/?podcast=6cdfccc6-7c47-4c35-8352-7f634b1b6f71&episode=${episodeID}`}
          style={{
            marginBottom: 20,
            height: "140px",
            width: "100%",
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 1px 8px rgba(0, 0, 0, .2)",
          }} />
        {episodes.map(episode => (
          <ListItem key={episode.id} component="div" disablePadding>
            <ListItemButton
              selected={episode.id === episodeID}
              onClick={() => router.push(episode.id, undefined, { shallow: true })}>
              <ListItemText primary={episode.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </Section>
    </Layout >
  );
};

export const getStaticPaths: GetStaticPaths<{ 'episode-id': string[] }> = async () => (
  {
    paths: (await getPodcastEpisodes()).map(episode => ({
      params: { 'episode-id': [episode.id] }
    })),
    fallback: 'blocking', // can also be true or 'blocking'
  }
);

export const getStaticProps: GetStaticProps<PodcastPageProps> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }
  const episodeID = params['episode-id'];
  const episodes = await getPodcastEpisodes();
  if (episodeID && episodeID.length !== 1) {
    return { notFound: true };
  }
  if (episodeID && !episodes.find(e => e.id === episodeID[0])) {
    return { notFound: true };
  }
  return {
    props: {
      episodes: episodes,
    },
    revalidate: 300, // In seconds
  };
}

export default PodcastPage;
