import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { useI18n } from "../../context/i18n";
import { Banner } from "../../components/banner";
import {
  Container,
  Grid,
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
import { Loading } from "../../components/loading";
import { Link } from "../../components/link";
import { CardList } from "../../components/card-list";
import { MediaCard } from "../../components/media-card";
import { PaginationControl } from "../../components/pagination-control";

const EPISODE_PATH = "ep";
const PAGE_SIZE = 20;
const PAGE_SEARCH_PAGE_NAME = "page";
const PODCAST_COVER =
  "https://files.soundon.fm/1620626429960-9ecce80b-d34c-4713-981d-a4b0abd8e2e0.jpeg";

type PodcastPageProps = {
  partialEpisodes: Partial<PodcastEpisode>[];
  currentEpisode: PodcastEpisode;
  page: number;
  draftMode: boolean;
};

const PodcastPage: NextPage<PodcastPageProps> = ({
  partialEpisodes,
  currentEpisode,
  draftMode,
  page: defaultPage,
}) => {
  const { i18n } = useI18n();
  const router = useRouter();
  const [episode, setEpisode] = useState(currentEpisode);
  const [completedEpisodes, setCompletedEpisodes] = useState<PodcastEpisode[]>(
    []
  );
  const { query } = useRouter();
  const pageQuery = query[PAGE_SEARCH_PAGE_NAME];
  const [page, setPage] = useState(
    typeof pageQuery === "string" ? parseInt(pageQuery) : defaultPage
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

  // useEffect(() => {
  //   const pageQuery = query[PAGE_SEARCH_PAGE_NAME];
  //   if (typeof pageQuery === "string") {
  //     setPage(parseInt(pageQuery));
  //   }
  // }, [query]);

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
  // List page
  if (draftMode) {
    return (
      <Layout
        title={i18n.strings.podcast.name}
        type="music.album"
        description={i18n.strings.social.podcast}
        draftMode={draftMode}
        image="https://static.ustw.watch/public-image/website/podcast.jpg"
      >
        <Banner
          imageSrc="https://static.ustw.watch/public-image/website/banners/podcast.png"
          draftMode={true}
        />
        <Container sx={{ my: 5 }}>
          <Grid container spacing={2}>
            <Grid item md={8} sm={12} xs={12}>
              <Typography component="h5" variant="h5" gutterBottom>
                {i18n.strings.podcast.allPodcastEpisodes}
              </Typography>
              <hr />
              <PaginationControl
                defaultPage={page}
                defaultPageSize={PAGE_SIZE}
                total={completedEpisodes.length}
                // urlSearchName={PAGE_SEARCH_PAGE_NAME}
                updateItems={async (page, _) => {
                  setPage(page);
                }}
              />
              <CardList
                cards={completedEpisodes
                  .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                  .map((p) => ({
                    title: p.title,
                    displayDate: new Date(p.pubDate || 0).toLocaleDateString(), // change to pub date
                    content: p.description,
                    url: `/podcast/ep/${p.id}`,
                    image:
                      p.imageSrc === PODCAST_COVER ? undefined : p.imageSrc,
                  }))}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              {mediaCard}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout
      title={i18n.strings.podcast.name}
      type={"music.album"}
      description={i18n.strings.social.podcast}
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
      <Section id="podcast" title={i18n.strings.podcast.playLatestEpisode}>
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
              router.push(`/podcast/${EPISODE_PATH}/${ep.id}`, undefined, {
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

export const getServerSideProps: GetServerSideProps<PodcastPageProps> = async ({
  req,
  query,
}) => {
  const episodes = await getPodcastEpisodes();
  const episode = episodes[0];
  if (!episode) {
    return { notFound: true };
  }
  let pageQuery = query[PAGE_SEARCH_PAGE_NAME];
  if (pageQuery === undefined) {
    pageQuery = "1";
  } else if (typeof pageQuery !== "string" || isNaN(parseInt(pageQuery))) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      partialEpisodes: episodes.map((ep) => ({ id: ep.id, title: ep.title })),
      currentEpisode: episode,
      page: parseInt(pageQuery),
      draftMode: !!req.headers.cookie?.includes("__prerender_bypass"),
    },
  };
};

export default PodcastPage;
