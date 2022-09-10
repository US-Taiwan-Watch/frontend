/* eslint @typescript-eslint/no-empty-function: ["error", { "allow": ["functions"] }] */
import { GetServerSideProps } from "next";
import { getPodcastEpisodes } from "../../api/podcast-episodes";

export const getServerSideProps: GetServerSideProps = async () => {
  const episodes = await getPodcastEpisodes();
  return {
    redirect: {
      permanent: true,
      destination: `https://player.soundon.fm/embed/?podcast=6cdfccc6-7c47-4c35-8352-7f634b1b6f71&episode=${episodes[0].id}`,
    },
  };
}

export default function () { }