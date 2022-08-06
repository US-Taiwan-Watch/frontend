import { parseStringPromise } from "xml2js";

export type NewsLetter = {
  title: string,
  link: string,
  pubDate: string,
  image: string,
  preview: string,
};

export const getNewsLetters = async (): Promise<NewsLetter[]> => {
  const response = await fetch('https://us1.campaign-archive.com/feed?u=5213dd0ea9106d6a472c8d4ed&id=5bff179a75');
  const text = await response.text();
  const xml = await parseStringPromise(text);
  return xml.rss.channel[0].item.map((item: any) => {
    const matchImg = /<meta property="og:image" content="([^"]*)">/.exec(item.description);
    const matchPreview = /<span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">([^"]*)<\/span>/.exec(item.description);
    return {
      title: item.title[0],
      link: item.link[0],
      pubDate: item.pubDate[0],
      image: matchImg ? matchImg[1] : null,
      preview: matchPreview ? matchPreview[1] : null,
    }
  });
}
