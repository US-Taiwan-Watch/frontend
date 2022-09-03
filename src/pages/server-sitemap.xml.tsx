/* eslint @typescript-eslint/no-empty-function: ["error", { "allow": ["functions"] }] */
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { getPodcastEpisodes } from './api/podcast-episodes'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const epPaths = (await getPodcastEpisodes()).map(ep => `/podcast/ep/${ep.id}`);

  const fields: ISitemapField[] = epPaths.map(path => ({
    loc: `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    priority: 7,
    alternateRefs: [
      {
        href: `${process.env.NEXT_PUBLIC_BASE_URL}/en${path}`,
        hreflang: 'en',
      },
      {
        href: `${process.env.NEXT_PUBLIC_BASE_URL}/zh${path}`,
        hreflang: 'zh',
      }
    ],
  }));

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() { }