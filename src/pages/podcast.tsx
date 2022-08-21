import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layout";
import { useI18n } from "../context/i18n";
import { Banner } from "../components/banner";
import { CardList, FeaturedCards } from "../components/card-list";
import { Constants } from "../utils/constants";
import { parseStringPromise } from "xml2js";
import { Container } from "@material-ui/core";
import { Button, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Section } from "../components/section";
import { useRouter } from "next/router";
import Head from "next/head";
import { podcastPlatforms } from "../components/social-media";
import { useState } from "react";

export type PodcastEpisode = {
  id: string,
  title: string,
}

export const getPodcastEpisodes = async (): Promise<PodcastEpisode[]> => {
  const response = await fetch('https://feeds.soundon.fm/podcasts/6cdfccc6-7c47-4c35-8352-7f634b1b6f71.xml');
  const text = await response.text();
  const xml = await parseStringPromise(text);
  return xml.rss.channel[0].item.map((item: any) => {
    return {
      id: item.guid[0]['_'],
      title: item.title[0],
    }
  });
}

type PodcastPageProps = {
  episodes: PodcastEpisode[],
}

const PodcastPage: NextPage<PodcastPageProps> = ({ episodes }) => {
  const { i18n } = useI18n();
  const { pathname } = useRouter();
  const [episodeID, setEpisodeID] = useState(episodes[0].id);

  return (
    <Layout>
      <Head>
        <title>{i18n.strings.newsletter.title}</title>
        <meta property="og:title" content={i18n.strings.newsletter.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL + pathname} />
        <meta property="og:description" content={i18n.strings.landing.subscribeDesc} />
      </Head>
      <Banner
        title={i18n.strings.header.subscribe}
        subtitle={i18n.strings.landing.subscribeDesc}
        actions={[{
          text: i18n.strings.landing.subscribeButton,
          url: Constants.links.newsletter,
        }]}
      />
      <Section id="podcast"
        title="Podcast 最新單集"
        actions={podcastPlatforms.map(p => ({ text: p.name, url: p.link }))}
      >
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
              onClick={() => setEpisodeID(episode.id)}>
              <ListItemText primary={episode.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </Section>
    </Layout >
  );
};

export const getStaticProps: GetStaticProps<PodcastPageProps> = async () => (
  {
    props: {
      episodes: await getPodcastEpisodes(),
    },
    revalidate: 300, // In seconds
  }
);

export default PodcastPage;
