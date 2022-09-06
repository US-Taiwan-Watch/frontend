import type { NextApiRequest, NextApiResponse } from "next";
import { parseStringPromise } from "xml2js";

export type PodcastEpisode = {
  id: string,
  title: string,
  description: string,
  encodedDesc: string,
  pubDate: number,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PodcastEpisode[]>
) {
  res.status(200).json(await getPodcastEpisodes());
}

export const getPodcastEpisodes = async (): Promise<PodcastEpisode[]> => {
  const response = await fetch('https://feeds.soundon.fm/podcasts/6cdfccc6-7c47-4c35-8352-7f634b1b6f71.xml');
  const text = await response.text();
  const xml = await parseStringPromise(text);
  return xml.rss.channel[0].item.map((item: any) => ({
    id: item.guid[0]['_'],
    title: item.title[0],
    description: item.description[0],
    encodedDesc: item['content:encoded'][0],
    pubDate: new Date(item['pubDate'][0]).getTime(),
  }));
}