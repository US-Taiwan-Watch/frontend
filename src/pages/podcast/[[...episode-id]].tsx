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
import { getPodcastEpisodes, PodcastEpisode } from "../api/podcast-episodes";

const EPISODE_PATH = 'ep';

type PodcastPageProps = {
  partialEpisodes: Partial<PodcastEpisode>[],
  currentEpisode: PodcastEpisode;
}

const PodcastPage: NextPage<PodcastPageProps> = ({ partialEpisodes, currentEpisode }) => {
  const { i18n } = useI18n();
  const router = useRouter();
  const [episode, setEpisode] = useState(currentEpisode);
  const [completedEpisodes, setCompletedEpisodes] = useState<PodcastEpisode[]>([]);

  // The commented out codes should work according to https://nextjs.org/docs/routing/shallow-routing
  // It's probably a bug now useEffect is fired every time and completedEpisodes is always empty at the beginning
  // Routing should not reset the state. Currently use session storage to avoid refetching every time
  // Revisit this later.
  // useEffect(() => {
  //   getPodcastEpisodes().then(eps => {
  //     setCompletedEpisodes(eps);
  //   });
  // }, []);

  function setEpisodeifFoundInList(id: string | undefined, list: PodcastEpisode[]) {
    const ep = list.find(e => e.id === id);
    if (ep) {
      setEpisode(ep);
    }
  }

  useEffect(() => {
    const episodeID = router.query['episode-id'] ? router.query['episode-id'][1] : partialEpisodes[0].id;
    const episodesInSession = sessionStorage.getItem('podcast-episodes');
    if (episodesInSession) {
      const { episodes, expiry } = JSON.parse(episodesInSession);
      // Session valid, use the data in session storage
      if (new Date().getTime() < expiry) {
        setEpisodeifFoundInList(episodeID, episodes);
        setCompletedEpisodes(episodes);
        return;
      }
    }
    episodeID && fetch('/api/podcast-episodes').then(res => res.json()).then((eps: PodcastEpisode[]) => {
      setEpisodeifFoundInList(episodeID, eps);
      setCompletedEpisodes(eps);
      sessionStorage.setItem('podcast-episodes', JSON.stringify({
        expiry: new Date().getTime() + 300 * 1000,
        episodes: eps
      }));
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
