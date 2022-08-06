import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/layout";
import { useI18n } from "../context/i18n";
import { Banner } from "../components/banner";
import { CardList } from "../components/card-list";
import { Constants } from "../utils/constants";
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

type NewsLetterPageProps = {
  newsletters: NewsLetter[],
}

const NewsLetterPage: NextPage<NewsLetterPageProps> = ({ newsletters }) => {
  const { i18n } = useI18n();
  return (
    <Layout>
      <Banner
        title={i18n.strings.header.subscribe}
        subtitle={i18n.strings.landing.subscribeDesc}
        actions={[{
          text: i18n.strings.landing.subscribeButton,
          url: Constants.links.newsletter,
        }]}
      />
      <CardList cards={newsletters.map(p => ({
        title: p.title,
        // image: p.image,
        displayDate: new Date(p.pubDate).toDateString(),
        url: p.link,
        content: p.preview
      }))} />

    </Layout >
  );
};

export const getStaticProps: GetStaticProps<NewsLetterPageProps> = async () => {
  return {
    props: {
      newsletters: await getNewsLetters(),
    },
    revalidate: 300, // In seconds
  }
}

export default NewsLetterPage;
