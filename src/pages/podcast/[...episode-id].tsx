import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { useI18n } from "../../context/i18n";
import { Banner } from "../../components/banner";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Section } from "../../components/section";
import { useRouter } from "next/router";
import { podcastPlatforms } from "../../components/social-media";
import { useEffect, useState } from "react";
import { getPodcastEpisodes, PodcastEpisode } from "../api/podcast-episodes";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { Loading } from "../../components/loading";
import { Link } from "../../components/link";
import { MediaContainer } from "../../components/media-container";
import { MediaCard } from "../../components/media-card";

const EPISODE_PATH = "ep";

type PodcastPageProps = {
  partialEpisodes: Partial<PodcastEpisode>[];
  currentEpisode: PodcastEpisode;
  draftMode: boolean;
};

const PodcastPage: NextPage<PodcastPageProps> = ({
  partialEpisodes,
  currentEpisode,
  draftMode,
}) => {
  const { i18n } = useI18n();
  const router = useRouter();
  const [episode, setEpisode] = useState(currentEpisode);
  const [completedEpisodes, setCompletedEpisodes] = useState<PodcastEpisode[]>(
    []
  );

  // The commented out codes should work according to https://nextjs.org/docs/routing/shallow-routing
  // It's probably a bug now useEffect is fired every time and completedEpisodes is always empty at the beginning
  // Routing should not reset the state. Currently use session storage to avoid refetching every time
  // Revisit this later.
  // useEffect(() => {
  //   getPodcastEpisodes().then(eps => {
  //     setCompletedEpisodes(eps);
  //   });
  // }, []);

  function setEpisodeifFoundInList(
    id: string | undefined,
    list: PodcastEpisode[]
  ) {
    const ep = list.find((e) => e.id === id);
    if (ep) {
      setEpisode(ep);
    }
    setCompletedEpisodes(list);
  }

  const episodeID = router.query["episode-id"]
    ? router.query["episode-id"][1]
    : partialEpisodes && partialEpisodes[0].id;

  const nextEpIndex = partialEpisodes
    ? partialEpisodes.findIndex((ep) => ep.id === episodeID) + 1
    : null;
  const prevEpIndex = partialEpisodes
    ? partialEpisodes.findIndex((ep) => ep.id === episodeID) - 1
    : null;

  useEffect(() => {
    const episodesInSession = sessionStorage.getItem("podcast-episodes");
    if (episodesInSession) {
      const { episodes, expiry } = JSON.parse(episodesInSession);
      // Session valid, use the data in session storage
      if (new Date().getTime() < expiry) {
        setEpisodeifFoundInList(episodeID, episodes);
        return;
      }
    }
    episodeID &&
      fetch("/api/podcast-episodes")
        .then((res) => res.json())
        .then((eps: PodcastEpisode[]) => {
          setEpisodeifFoundInList(episodeID, eps);
          sessionStorage.setItem(
            "podcast-episodes",
            JSON.stringify({
              expiry: new Date().getTime() + 300 * 1000,
              episodes: eps,
            })
          );
        });
  }, [episodeID, partialEpisodes]);

  if (!episode) {
    return <Loading />;
  }

  const mediaCard = (
    <MediaCard
      title={i18n.strings.podcast.name}
      description={i18n.strings.social.podcast}
      image="/assets/podcast-no-border.jpg"
      borderColor="#FFD823"
    />
  );

  // Details page
  if (draftMode) {
    return (
      <Layout
        title={episode.title}
        type="music.song"
        description={episode.description}
        draftMode={draftMode}
        image={episode.imageSrc}
      >
        <MediaContainer
          title={episode.title}
          imageSrc={
            "https://static.ustw.watch/public-image/website/podcast.jpg"
          }
          next={
            nextEpIndex && partialEpisodes[nextEpIndex]
              ? {
                  title: partialEpisodes[nextEpIndex].title || "",
                  url: `/podcast/${EPISODE_PATH}/${partialEpisodes[nextEpIndex].id}`,
                }
              : null
          }
          prev={
            prevEpIndex && partialEpisodes[prevEpIndex]
              ? {
                  title: partialEpisodes[prevEpIndex].title || "",
                  url: `/podcast/${EPISODE_PATH}/${partialEpisodes[prevEpIndex].id}`,
                }
              : null
          }
          breadcrumbs={[
            { title: i18n.strings.header.podcast, url: "/podcast" },
          ]}
          mediaCard={mediaCard}
        >
          <iframe
            src={`https://player.soundon.fm/embed/?podcast=6cdfccc6-7c47-4c35-8352-7f634b1b6f71&episode=${episodeID}`}
            style={{
              marginBottom: 20,
              height: "140px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 1px 8px rgba(0, 0, 0, .2)",
            }}
          />
          <Typography variant="subtitle2" paragraph>
            {episode.pubDate && new Date(episode.pubDate).toLocaleDateString()}
          </Typography>
          <div
            dangerouslySetInnerHTML={(() => ({
              __html: episode.encodedDesc,
            }))()}
          />
        </MediaContainer>
      </Layout>
    );
  }

  return (
    <Layout
      title={episode.title}
      type={"music.song"}
      description={episode.description}
      image="https://static.ustw.watch/public-image/website/podcast.jpg"
    >
      <Banner
        title={i18n.strings.podcast.fullName}
        subtitle={i18n.strings.social.podcast}
        actions={podcastPlatforms.map((p) => ({
          text: p.name,
          url: p.link,
          startIcon: p.icon,
          buttonProps: { sx: { textTransform: "none" } },
        }))}
      />
      <Section id="podcast" title={i18n.strings.podcast.playEpisode}>
        <iframe
          src={`https://player.soundon.fm/embed/?podcast=6cdfccc6-7c47-4c35-8352-7f634b1b6f71&episode=${episodeID}`}
          style={{
            marginBottom: 20,
            height: "140px",
            width: "100%",
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 1px 8px rgba(0, 0, 0, .2)",
          }}
        />
        <Typography variant="subtitle2" paragraph>
          {episode.pubDate && new Date(episode.pubDate).toLocaleDateString()}
        </Typography>
        <div
          dangerouslySetInnerHTML={(() => ({ __html: episode.encodedDesc }))()}
        />
      </Section>
      <Section id="podcast2" title={i18n.strings.podcast.otherEpisodes}>
        {(completedEpisodes.length > 0
          ? completedEpisodes
          : partialEpisodes
        ).map((ep) => (
          <Link
            key={ep.id}
            href={`/podcast/${EPISODE_PATH}/${ep.id}`}
            sx={{ textDecoration: "none" }}
            color="text.primary"
            onClick={(e) => {
              e.preventDefault();
              router.push(`${EPISODE_PATH}/${ep.id}`, undefined, {
                shallow: true,
              });
              window.scrollTo(0, 0);
            }}
          >
            <ListItem component="div" disablePadding>
              <ListItemButton selected={ep.id === episode.id}>
                <ListItemText primary={ep.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </Section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{
  "episode-id": string[];
}> = async ({ locales }) => ({
  paths: getStaticPathsWithLocale(
    (await getPodcastEpisodes())
      .map((ep) => [EPISODE_PATH, ep.id])
      .slice(0, 20)
      .map((p) => ({
        params: { "episode-id": p },
      })),
    locales
  ),
  fallback: true,
});

export const getStaticProps: GetStaticProps<PodcastPageProps> = async ({
  params,
  draftMode,
}) => {
  if (!params) {
    return { notFound: true };
  }
  const episodeIdParam = params["episode-id"];
  const episodes = await getPodcastEpisodes();
  let episode;
  if (!episodeIdParam) {
    episode = episodes[0];
  } else if (
    !Array.isArray(episodeIdParam) ||
    episodeIdParam.length !== 2 ||
    episodeIdParam[0] !== EPISODE_PATH
  ) {
    return { notFound: true };
  } else {
    episode =
      episodeIdParam && episodes.find((e) => e.id === episodeIdParam[1]);
  }
  if (!episode) {
    return { notFound: true };
  }

  return {
    props: {
      partialEpisodes: episodes.map((ep) => ({ id: ep.id, title: ep.title })),
      currentEpisode: episode,
      draftMode: !!draftMode,
    },
    revalidate: 300, // In seconds
  };
};

export default PodcastPage;
