/* eslint @typescript-eslint/no-empty-function: ["error", { "allow": ["functions"] }] */
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { getPodcastEpisodes } from './api/podcast-episodes'
import { ArticleType } from "../generated/graphql-types";
import { getPublishedPostUrlPaths } from "./articles/[...slugs]";
import { isLaunched } from "../utils/gate-keeper";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const epPaths = (await getPodcastEpisodes()).map(
    (ep) => `/podcast/ep/${ep.id}`
  );

  let articlesPaths: string[] = [];

  if (isLaunched) {
    articlesPaths = await getPublishedPostUrlPaths(
      ArticleType.Article,
      0,
      1000
    );
  }

  const allPaths = [...epPaths, ...articlesPaths];

  const fields: ISitemapField[] = allPaths.map((path) => ({
    loc: `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    priority: 0.7,
    alternateRefs: [
      {
        href: `${process.env.NEXT_PUBLIC_BASE_URL}/en${path}`,
        hreflang: "en",
      },
      {
        href: `${process.env.NEXT_PUBLIC_BASE_URL}/zh${path}`,
        hreflang: "zh",
      },
    ],
  }));

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() { }
