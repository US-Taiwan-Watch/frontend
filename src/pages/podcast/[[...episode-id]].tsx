import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { useI18n } from "../../context/i18n";
import { Banner } from "../../components/banner";
import { parseStringPromise } from "xml2js";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Section } from "../../components/section";
import { useRouter } from "next/router";
import { podcastPlatforms } from "../../components/social-media";
import { useEffect, useState } from "react";

const EPISODE_PATH = 'ep';

export type PodcastEpisode = {
  id: string,
  title: string,
  description: string,
  encodedDesc: string,
}

const processPodcastItem = (item: any) => ({
  id: item.guid[0]['_'],
  title: item.title[0],
  description: item.description[0],
  encodedDesc: item['content:encoded'][0],
});

export const getPodcastEpisodes = async (): Promise<PodcastEpisode[]> => {
  const response = await fetch('https://feeds.soundon.fm/podcasts/6cdfccc6-7c47-4c35-8352-7f634b1b6f71.xml');
  const text = await response.text();
  const xml = await parseStringPromise(text);
  return xml.rss.channel[0].item.map(processPodcastItem);
}

export const getPodcastEpisode = async (id: string): Promise<PodcastEpisode | null> => {
  const response = await fetch('https://feeds.soundon.fm/podcasts/6cdfccc6-7c47-4c35-8352-7f634b1b6f71.xml');
  const text = await response.text();
  const xml = await parseStringPromise(text);
  const podcast = xml.rss.channel[0].item.find((item: any) => item.guid[0]['_'] === id);
  if (!podcast) {
    return null;
  }
  return processPodcastItem(podcast);
}

type PodcastPageProps = {
  partialEpisodes: Partial<PodcastEpisode>[],
  currentEpisode: PodcastEpisode;
}

const PodcastPage: NextPage<PodcastPageProps> = ({ partialEpisodes, currentEpisode }) => {
  const { i18n } = useI18n();
  const router = useRouter();
  const [episode, setEpisode] = useState(currentEpisode);
  const [completedEpisodes, setCompletedEpisodes] = useState<PodcastEpisode[]>([]);
  console.log('episode');
  console.log(episode);

  // The commented out codes should work according to https://nextjs.org/docs/routing/shallow-routing
  // It's probably a bug now useEffect is fired every time and completedEpisodes is always empty at the beginning
  // Routing should not reset the state. Revisit this later as it's ideal not to load every time

  useEffect(() => {
    console.log('useEffect []')
    // getPodcastEpisodes().then(eps => {
    //   setCompletedEpisodes(eps);
    // });
  }, []);

  useEffect(() => {
    console.log('useEffect router')
    const episodeID = router.query['episode-id'] ? router.query['episode-id'][1] : partialEpisodes[0].id;
    // const ep = completedEpisodes.find(e => e.id === episodeID);
    // if (ep) {
    //   setEpisode(ep);
    // }
    console.log('episodeID: ' + episodeID);
    episodeID && getPodcastEpisodes().then(eps => {
      console.log('eps');
      console.log(eps);
      const ep = eps.find(e => e.id == episodeID);
      if (ep) {
        setEpisode(ep);
      }
      setCompletedEpisodes(eps);
    });
  }, [router.query['episode-id']]);

  const isIndex = router.query['episode-id'] ? false : true;
  const title = `${isIndex ? i18n.strings.podcast.name : episode.title} - ${i18n.strings.brand.fullName}`;
  const desc = isIndex ? i18n.strings.social.podcast : episode.description;

  return (
    <Layout title={title} type={isIndex ? 'music.album' : 'music.song'} description={desc}
      image="https://static.ustw.watch/public-image/website/podcast.jpg" imageAlt={title}>
      <Banner
        title={i18n.strings.podcast.fullName}
        subtitle={i18n.strings.social.podcast}
        actions={podcastPlatforms.map(p => ({
          text: p.name,
          url: p.link,
          startIcon: p.icon,
          buttonProps: { sx: { textTransform: 'none' } },
        }))}
      />
      <Section id="podcast" title={isIndex ? i18n.strings.podcast.playLatestEpisode : i18n.strings.podcast.playEpisode} >
        <iframe src={`https://player.soundon.fm/embed/?podcast=6cdfccc6-7c47-4c35-8352-7f634b1b6f71&episode=${episode.id}`}
          style={{
            marginBottom: 20,
            height: "140px",
            width: "100%",
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 1px 8px rgba(0, 0, 0, .2)",
          }} />
        <div dangerouslySetInnerHTML={(() => ({ __html: episode.encodedDesc }))()} />
      </Section>
      <Section id="podcast2" title={i18n.strings.podcast.otherEpisodes} >
        {(completedEpisodes.length > 0 ? completedEpisodes : partialEpisodes).map(ep => (
          <ListItem key={ep.id} component="div" disablePadding>
            <ListItemButton
              selected={ep.id === episode.id}
              onClick={() => {
                router.push(`${EPISODE_PATH}/${ep.id}`, undefined, { shallow: true });
                window.scrollTo(0, 0);
              }}>
              <ListItemText primary={ep.title} />
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
    })).concat({
      params: { 'episode-id': [] }
    }),
    fallback: 'blocking', // can also be true or 'blocking'
  }
);

export const getStaticProps: GetStaticProps<PodcastPageProps> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }
  const episodeIdParam = params['episode-id'];
  const episodes = await getPodcastEpisodes();
  let episode;
  if (!episodeIdParam) {
    episode = episodes[0];
  } 
  else if (!Array.isArray(episodeIdParam) || episodeIdParam.length !== 2 || episodeIdParam[0] !== EPISODE_PATH) {
    return { notFound: true }
  }
  else {
    episode = episodeIdParam && episodes.find(e => e.id === episodeIdParam[1])
  }
  if (!episode) {
    return { notFound: true }
  }

  return {
    props: {
      partialEpisodes: episodes.map(ep => ({ id: ep.id, title: ep.title })),
      currentEpisode: episode,
    },
    revalidate: 300, // In seconds
  };
}

export default PodcastPage;
