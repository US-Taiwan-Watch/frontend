import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { Article } from "../../generated/graphql-types";
import { Loading } from "../../components/loading";
import { PostContent } from "../../components/post-content";

type PostPageProps = {
  post?: Article,
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) {
    return <Loading />;
  }

  const pubDate = post.createdTime !== undefined ? new Date(post.createdTime as number).toLocaleDateString() : undefined;

  return (
    <Layout title={post.title || undefined} type="article" description={post.preview || ''}
      image={post.imageSource || undefined} >
      <Banner title={post.title || ''} />
      <PostContent post={post} />
    </Layout >
  );
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => ({
  props: {
    post: {
      "__typename": "Article",
      "id": "ec417954-4b1d-4c18-adc2-29484d4e11f6",
      "title": "觀測站底加辣 podcast 開場錄音募集！",
      "content": "{\"id\":\"wzm939\",\"version\":1,\"rows\":[{\"id\":\"13xig4\",\"cells\":[{\"id\":\"r477rr\",\"size\":12,\"plugin\":{\"id\":\"ory/editor/core/content/slate\",\"version\":1},\"dataI18n\":{\"zh\":{\"slate\":[{\"type\":\"HEADINGS/HEADING-ONE\",\"children\":[{\"text\":\"錄音規格\"}]},{\"type\":\"LISTS/UNORDERED-LIST\",\"children\":[{\"type\":\"LISTS/LIST-ITEM\",\"children\":[{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"時間不超過 30 秒\"}]}]},{\"type\":\"LISTS/LIST-ITEM\",\"children\":[{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"請盡量使用耳機麥克風錄音，並可以衛生紙包住麥克風，請注意「S」或「P」開頭的字詞，例如「新聞」的「新」，以免爆音\"}]}]},{\"type\":\"LISTS/LIST-ITEM\",\"children\":[{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"留空給主持人回答的段落，請\"},{\"text\":\"間隔 5 秒\",\"Color\":{\"color\":\"rgba(255, 0, 0, 1)\"}}]}]},{\"type\":\"LISTS/LIST-ITEM\",\"children\":[{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"可接受錄音中包括背景音，但希望該背景音與內容相關（如分享育兒日常時，可以有小孩說話的背景音）\"}]}]},{\"type\":\"LISTS/LIST-ITEM\",\"children\":[{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"完成錄音後，請將錄音寄至 \"},{\"type\":\"LINK/LINK\",\"children\":[{\"text\":\"jasmine@ustw.watch\"}],\"data\":{\"href\":\"mailto:jasmine@ustw.watch\"}},{\"text\":\" \"}]}]}]},{\"type\":\"HEADINGS/HEADING-ONE\",\"children\":[{\"text\":\"內容\"}]},{\"children\":[{\"text\":\" \"}]},{\"type\":\"HEADINGS/HEADING-TWO\",\"children\":[{\"text\":\"版本 A \"}]},{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"Hi大家好（可自行切換問候語，客語法語等等之類），我是來自「\"},{\"text\":\"地區or地域\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」的「\"},{\"text\":\"姓名\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」。我今天/正在/喜歡/預計/etc.「\"},{\"text\":\"內容\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」，本集podcast的錄音時間是「\"},{\"text\":\"主持人聲回答（請間隔  5 秒）\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」，新聞內容有可能隨著你收聽的時間有點改變囉，那就讓我們開始吧！\"}]},{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\" \"}]},{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"Ex: hi大家好，我是來自第美國52區的ET，我正在前往其他星球的路上。本集podcast的錄音時間是2022年6月6號。新聞內容有可能隨著你收聽的時間有點改變囉，那就讓我們開始吧。\"}]},{\"children\":[{\"text\":\" \"}]},{\"type\":\"HEADINGS/HEADING-TWO\",\"children\":[{\"text\":\"版本 B\"}]},{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"Hi大家好（可自行切換問候語，客語法語等等之類），我是來自「\"},{\"text\":\"地區or地域\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」的「\"},{\"text\":\"姓名\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」。我今天/正在/喜歡/預計/etc.「\"},{\"text\":\"內容\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」，本集podcast的錄音時間是「\"},{\"text\":\"主持人聲回答（請間隔  5 秒）\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」，新聞內容有可能隨著你收聽的時間有所變化囉，「\"},{\"text\":\"插入聽眾閒聊\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」，那就讓我們開始吧！\"}]},{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\" \"}]},{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"Ex: Bonjour，我是來自好萊烏的李奧納多皮卡丘。最近都在忙著拍攝新的電影，還蠻累的，本集podcast的錄音時間是2022年6月6號，新聞內容有可能隨著你收聽的時間有所變化囉，不過還是值得你花時間來好好聆聽拉，那就讓我們開始吧！gogogo！\"}]},{\"children\":[{\"text\":\" \"}]},{\"type\":\"HEADINGS/HEADING-TWO\",\"children\":[{\"text\":\"版本 C\"}]},{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"Hi大家好（可自行切換問候語，客語法語等等之類），我是來自「\"},{\"text\":\"地區or地域\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」的「\"},{\"text\":\"姓名\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」。我今天/正在/喜歡/預計/etc.「\"},{\"text\":\"內容\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」，另外聽說…最近「\"},{\"text\":\"與台美有關的新聞\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」本集podcast的錄音時間是「\"},{\"text\":\"主持人聲回答\",\"EMPHASIZE/STRONG\":true},{\"text\":\"」新聞內容有可能隨著你收聽的時間有所變化囉。，想知道更多，就跟我一起給他聽下去吧！\"}]},{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\" \"}]},{\"type\":\"PARAGRAPH/PARAGRAPH\",\"children\":[{\"text\":\"Ex: 台嘎好，我是來自亮銀之城的路西法，我爸爸最近總是愛做一些人類做的事，像是打棒球，真是蠻稀奇的，另外聽說…最近「中國跟美國又在twitter吵架了」，本集podcast的錄音時間是2022年6月6號，新聞內容有可能隨著你收聽的時間有所變化，想知道更多，就跟我一起給他聽下去吧！\"}]},{\"type\":\"HEADINGS/HEADING-ONE\",\"children\":[{\"text\":\" \"}]},{\"type\":\"HEADINGS/HEADING-ONE\",\"children\":[{\"text\":\"實際範例\"}]},{\"children\":[{\"text\":\" \"}]},{\"children\":[{\"text\":\"請參考\"},{\"type\":\"LINK/LINK\",\"children\":[{\"text\":\"最新一集觀測站底加辣\"}],\"data\":{\"href\":\"https://www.ustw.watch/podcast\"}},{\"text\":\"的開頭！\"}]}]}},\"rows\":[],\"inline\":null}]}]}",
      "slug": "",
      "preview": "觀測站底加辣 podcast 開場錄音募集！",
      "isPublished": true,
      "authors": null,
      "pusblishTime": 1662836101103,
      "createdTime": 1662759674439,
      "lastModifiedTime": 1662836101103,
      "imageSource": null,
      "tags": null
    },
  },
  revalidate: 300, // In seconds
});

export default PostPage;
