import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Link, LinkProps } from "../../components/link";
import { Layout } from "../../components/layout";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Grid, Paper } from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../../components/social-media";
import { Constants } from "../../utils/constants";
import { useI18n } from "../../context/i18n";
import Head from "next/head";
import { Banner } from "../../components/banner";
import { useUser } from "@auth0/nextjs-auth0";
import { useFetchUser } from "../../lib/user";
import { allPosts, PostProps } from ".";
import { AdaptiveEditor } from "../../components/component-adaptive-editor";

type PostPageProps = {
  post: PostProps,
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => (
  <Grid item xs={12} md={12} sx={{ my: 3 }}>
    <CardActionArea component="a" href="#">
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ height: '100%', width: 180, display: { xs: 'none', sm: 'block' } }}
          image={post.image}
          alt={post.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.publishDate}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.preview}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  </Grid>
)

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const { i18n } = useI18n();
  console.log(post.content)
  return (
    <Layout>
      <Banner title={post.title} subtitle={post.publishDate} />
      <Container>
        <Box alignItems="center" sx={{ paddingTop: 3, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.publishDate}
          </Typography>
        </Box>
        <AdaptiveEditor value={post.content} viewOnly={true} />
      </Container>
      <style jsx global>{`
        .section:nth-child(odd) {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Layout >
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: allPosts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return { notFound: true };
  }
  const post = allPosts.find(p => p.slug === params.slug);
  if (!post) {
    return { notFound: true };
  }
  const value = {
    id: "cgzbtk",
    version: 1,
    rows: [
      {
        id: "7ozy3e",
        cells: [
          {
            id: "rbre34",
            size: 6,
            plugin: { id: "ory/editor/core/content/slate", version: 1 },
            dataI18n: {
              default: {
                slate: [
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "Proudly presented by Team SKIP & GACC 文化總會",
                      },
                    ],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: " " }],
                    data: { align: "center" },
                  },
                  {
                    type: "HEADINGS/HEADING-TWO",
                    children: [
                      { text: "『跳街舞沒上過大學爽，大學這趟真的白來啦』" },
                    ],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "2021年12月18日 星期六 台北體育館" }],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "第十七屆 COLLEGE HIGH 全國制霸 經典團體賽" },
                    ],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "最熬夜、最糾結、最熱血、最戰略，" }],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "單人不強，唯有眾志成城才能制霸全國！" },
                    ],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "台灣最傳奇的大學舞林大會，讓你捨不得登出！" },
                    ],
                    data: { align: "center" },
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "HEADINGS/HEADING-FOUR",
                    children: [
                      {
                        text: "PS:請所有參加人員預備快篩證明或疫苗施打滿14天小黃卡配合工作人員查核。現場配合填寫防疫問卷。除了上場比賽的選手之外，請全程配戴口罩。",
                      },
                    ],
                  },
                ],
              },
              en: {
                slate: [
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "Proudly presented by Team SKIP & GACC (the General Associations of Chinese Culture)",
                      },
                    ],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: " " }],
                    data: { align: "center" },
                  },
                  {
                    type: "HEADINGS/HEADING-TWO",
                    children: [{ text: "『english title.....』" }],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "12/18/2021 (Sat) Taipei" }],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "The 17th COLLEGE HIGH group competition" },
                    ],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "Fighting、Fighting、Fighting、Fighting，" },
                    ],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "No single man. Go group to win the national champion！",
                      },
                    ],
                    data: { align: "center" },
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "The most magic dance completion in Taiwan. Stay with us！",
                      },
                    ],
                    data: { align: "center" },
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "HEADINGS/HEADING-FOUR",
                    children: [
                      {
                        text: "PS:All attendees needs to prepare COVID test proof and vaccine card. Put up your mask all the time.",
                      },
                    ],
                  },
                ],
              },
            },
            rows: [],
            inline: null,
          },
          {
            id: "cu0mlv",
            size: 6,
            plugin: { id: "ory/editor/core/content/image", version: 1 },
            dataI18n: {
              "zh-TW": {
                src: "https://s3.amazonaws.com/aikhun-assets/cms_editor_pic/0c7733be-3c10-4064-94bd-00ab4e305301@origin",
              },
              default: {
                src: "https://s3.amazonaws.com/aikhun-assets/cms_editor_pic/9d13edfe-50ce-44ea-a6f3-7588cada236c@origin",
              },
            },
            rows: [],
            inline: null,
          },
        ],
      },
      {
        id: "o8r9wz",
        cells: [
          {
            id: "paj64j",
            size: 6,
            rows: [
              {
                id: "g9fq6q",
                cells: [
                  {
                    id: "0xv9xt",
                    size: 12,
                    plugin: { id: "ory/editor/core/content/video", version: 1 },
                    dataI18n: {
                      default: {
                        src: "https://www.youtube.com/watch?v=sSqlGIUOSXk",
                      },
                      "zh-TW": { src: "https://youtu.be/FW6MKidRerg" },
                    },
                    rows: [],
                    inline: null,
                  },
                ],
              },
              {
                id: "kskzyn",
                cells: [
                  {
                    id: "1uvkgk",
                    size: 12,
                    plugin: { id: "ory/editor/core/content/image", version: 1 },
                    dataI18n: {
                      default: {
                        src: "https://s3.amazonaws.com/aikhun-assets/cms_editor_pic/3401b0b1-6e06-4aef-9592-415c64a09781@origin",
                      },
                    },
                    rows: [],
                    inline: null,
                  },
                ],
              },
            ],
            inline: null,
            dataI18n: undefined,
          },
          {
            id: "8shluc",
            size: 6,
            plugin: { id: "ory/editor/core/content/slate", version: 1 },
            dataI18n: {
              default: {
                slate: [
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "Organizer主辦單位：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "TEAM SKIP" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "中華民國街舞運動推廣協會" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "聯合主辦：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "GACC 文化總會" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "\\nCo-organizer 協辦單位：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "台北市體育局" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "贊助單位：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "CSD 中衛口罩" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "SIMURGH" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "RHINO\\nSHIELD 犀牛盾" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "MONSTER ENERGY" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "泰山冰鎮 My Turn" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "T-HAM\\n台畜" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "98分" }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "TBC DANCE CENTER" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "共樂" }] },
                ],
              },
              "zh-TW": {
                slate: [
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "Organizer主辦單位：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "TEAM SKIP" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "中華民國街舞運動推廣協會" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "聯合主辦：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "GACC 文化總會" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "\\nCo-organizer 協辦單位：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "台北市體育局" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "贊助單位：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "CSD 中衛口罩" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "SIMURGH" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "RHINO\\nSHIELD 犀牛盾" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "MONSTER ENERGY" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "泰山冰鎮 My Turn" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "T-HAM\\n台畜" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "98分" }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "TBC DANCE CENTER" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "共樂" }] },
                ],
              },
            },
            rows: [],
            inline: null,
          },
        ],
      },
      {
        id: "t8flto",
        cells: [
          {
            id: "7yn6lv",
            size: 12,
            plugin: { id: "ory/editor/core/content/divider", version: 1 },
            dataI18n: undefined,
            isDraftI18n: { default: false },
            rows: [],
            inline: null,
          },
        ],
      },
      {
        id: "6s4zey",
        cells: [
          {
            id: "oivwhn",
            size: 12,
            rows: [
              {
                id: "ntclbh",
                cells: [
                  {
                    id: "33ic3d",
                    size: 12,
                    plugin: { id: "ory/editor/core/content/image", version: 1 },
                    dataI18n: {
                      "zh-TW": {
                        src: "https://s3.amazonaws.com/aikhun-assets/cms_editor_pic/4ebf11be-152c-48fd-a298-9d5cfd92dd1a@origin",
                      },
                    },
                    rows: [],
                    inline: null,
                  },
                ],
              },
              {
                id: "39ck1l",
                cells: [
                  {
                    id: "3292hj",
                    size: 12,
                    plugin: { id: "ory/editor/core/content/slate", version: 1 },
                    dataI18n: {
                      default: {
                        slate: [
                          {
                            type: "HEADINGS/HEADING-THREE",
                            children: [
                              { text: "🔥College High Top10 Hype Moments🔥" },
                            ],
                          },
                        ],
                      },
                      "zh-TW": {
                        slate: [
                          {
                            type: "HEADINGS/HEADING-THREE",
                            children: [
                              { text: "🔥College High Top5 Hype Moments🔥" },
                            ],
                          },
                        ],
                      },
                    },
                    rows: [],
                    inline: null,
                  },
                ],
              },
            ],
            inline: null,
            dataI18n: undefined,
          },
        ],
      },
      {
        id: "qo1s94",
        cells: [
          {
            id: "dh2eq8",
            size: 4,
            plugin: { id: "ory/editor/core/content/video", version: 1 },
            dataI18n: {
              default: {
                src: "https://www.youtube.com/watch?v=so0XhBteiWY&list=PLksZ54JAOez9zJ5bipb5umRlAv7KO95DV&index=6",
              },
              "zh-TW": { src: "https://www.youtube.com/watch?v=bLLokiRSeAM" },
            },
            rows: [],
            inline: null,
          },
          {
            id: "us4v12",
            size: 4,
            plugin: { id: "ory/editor/core/content/video", version: 1 },
            dataI18n: {
              default: {
                src: "https://www.youtube.com/watch?v=nLUdOwS9cHA&list=PLksZ54JAOez9zJ5bipb5umRlAv7KO95DV&index=7",
              },
              "zh-TW": { src: "https://www.youtube.com/watch?v=JFptqK98YEM" },
            },
            rows: [],
            inline: null,
          },
          {
            id: "j94zvz",
            size: 4,
            plugin: { id: "ory/editor/core/content/video", version: 1 },
            dataI18n: {
              default: {
                src: "https://www.youtube.com/watch?v=r3yAS1HBcqc&list=PLksZ54JAOez9zJ5bipb5umRlAv7KO95DV&index=8",
              },
              "zh-TW": { src: "https://www.youtube.com/watch?v=VjNwXxvxND4" },
            },
            rows: [],
            inline: null,
          },
        ],
      },
      {
        id: "1dpzxa",
        cells: [
          {
            id: "x52g1y",
            size: 12,
            plugin: { id: "ory/editor/core/content/slate", version: 1 },
            dataI18n: {
              default: {
                slate: [
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "★STAGE3（12月18日）" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "參賽隊伍集合時間 AM11:00 / 觀眾入場建議時間13:00",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "HIPHOP / POPPING / LOCKING 經典全國制霸團體賽" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "✔地點： 台北體育館1F 綜合球場" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "PS:海選賽事付費直播\n" },
                      {
                        type: "LINK/LINK",
                        children: [
                          {
                            text: "線上購票在Asiania",
                            Color: { color: "rgba(0,0,255,1)" },
                          },
                        ],
                        data: { href: "https://2021collegehigh.asiania.me" },
                      },
                      { text: "" },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "★STAGE4（12月18日19日 跨夜）" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "11:00PM~04:00AM" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "12月19日-隔天 College High 跨夜閉幕Party" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "票價： 免費" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "大學爽參賽者前100名：附一杯飲料" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "✔地點： 圓山花博園區 23 MUSIC ROOM" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "------------------------------------------------",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "其他訊息：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "Stage3" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "報名參賽或是購票觀賽，每人每張票可換取一個入場手環並可領取 CSD x College High 的四片裝限定口罩一盒，內含今年賽事的獨家限定色，中衛口罩跟我們一起守護你的健康。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "------------------------------------------------",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "HEADINGS/HEADING-TWO",
                    children: [
                      {
                        text: "活動宗旨與110年度參賽須知（請參賽選手注意閱讀）",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "1. COLLEGE HIGH比賽對象在於所有喜愛街舞的大學生以及熱舞社團對之間的交流比賽、參賽者僅限『大專院校之在學生』夜間部、延畢生、碩博班具有學生資格者也可參加（帶職進修者則不具參賽資格），所有超過1人需要組隊的項目一律不接受跨校組隊。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "2. 比賽時請攜帶110學年度上學期有效之學生證或在學證明交予主辦單位查驗備核，選手們不得以不知道、忘記帶、弄不見、忘了蓋註冊章…等任何理由推托。若手邊正好遺失學生證，就以選課單或其他相關有效證件以備查核（如：在學證明、註冊證明等等...），參賽資格查驗未完成將被禁止出賽，未完成查驗而出賽該隊以0分計算，不得異議。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "3. HIPHOP/POPPING/LOCKING組的團體賽，一校一個項目限制一隊、不接受跨校組隊。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "4. 團體賽當天報到時，請各隊派代表收齊參賽選手之學生證到會場內報到。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "5. 為求選手觀眾全天活動之安全請各參賽學校、隊伍及人員，『依需要自行投保旅遊平安險』，大會當天將於會場投保公共意外險。",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "PS:以上參賽須知是為更新後的精簡版本，其餘細項可上活動官網查詢完整版本。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "" },
                      {
                        type: "LINK/LINK",
                        children: [{ text: "" }],
                        data: { href: "https://reurl.cc/AGEap" },
                      },
                      { text: "" },
                      {
                        type: "LINK/LINK",
                        children: [
                          {
                            text: "Teamskip 官方網站",
                            Color: { color: "rgba(0,0,255,1)" },
                          },
                        ],
                        data: {
                          href: "https://reurl.cc/AGEap",
                          openInNewWindow: true,
                        },
                      },
                      { text: "" },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "HEADINGS/HEADING-FIVE",
                    children: [
                      {
                        text: "＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
                      },
                    ],
                  },
                  {
                    type: "HEADINGS/HEADING-FIVE",
                    children: [
                      {
                        text: "本賽制及文字，皆受智慧財產權保護。請勿任意以任何形態拷貝抄襲，違者將追朔法律責任。",
                      },
                    ],
                  },
                  {
                    type: "HEADINGS/HEADING-FIVE",
                    children: [
                      {
                        text: "＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "------------------------------------------------",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "MC：" }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "ATOH (TEAM SKIP &TBC & 246 JAZZ CLUB / TAIWAN)",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "YOYO(TEAM SKIP & ADBKM / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "GABY (KFC / TAIWAN)" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "DJ：" }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "DJ SOUNG (MASK / TAIWAN) \\nDJ KEEP JIA HONG (MADSKILLZ / TAIWAN)",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "DJ FABIO (OEWZ / TAIWAN)" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "JUDGE 評審老師：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "J CHILLA 徐靖 ( HURRICANES & ABOUT DANCING / TAIWAN)",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "A CAI A菜 (KNUGE & THE JAM / TAIWAN)" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "DIAO 吊嘎 (IP LOCKERS & AFURO / TAIWAN)" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "DON 小董 (ODD ONES / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "KRAZY BONEZ (LETS BOOGIE / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "RANNY LIU 淋雨 （B.T.O.D & HIZAM & BOOG NATION / TAIWAN）",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "補充評審：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "XIAN 子賢 (B.T.O.D & ODD ONES / TAIWAN)" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "LOCKING JB 阿邦 (SOLUTION / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "DUCKMAN鴨俠 (FINGERMOSA / TAIWAN)" }],
                  },
                ],
              },
              en: {
                slate: [
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "★STAGE3（12月18日）" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "參賽隊伍集合時間 AM11:00 / 觀眾入場建議時間13:00",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "HIPHOP / POPPING / LOCKING 經典全國制霸團體賽" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "✔地點： 台北體育館1F 綜合球場" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "PS:海選賽事付費直播\n" },
                      {
                        type: "LINK/LINK",
                        children: [
                          {
                            text: "線上購票在Asiania",
                            Color: { color: "rgba(0,0,255,1)" },
                          },
                        ],
                        data: { href: "https://2021collegehigh.asiania.me" },
                      },
                      { text: "" },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "★STAGE4（12月18日19日 跨夜）" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "11:00PM~04:00AM" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "12月19日-隔天 College High 跨夜閉幕Party" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "票價： 免費" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "大學爽參賽者前100名：附一杯飲料" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "✔地點： 圓山花博園區 23 MUSIC ROOM" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "------------------------------------------------",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "其他訊息：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "Stage3" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "報名參賽或是購票觀賽，每人每張票可換取一個入場手環並可領取 CSD x College High 的四片裝限定口罩一盒，內含今年賽事的獨家限定色，中衛口罩跟我們一起守護你的健康。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "------------------------------------------------",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "HEADINGS/HEADING-TWO",
                    children: [
                      {
                        text: "活動宗旨與110年度參賽須知（請參賽選手注意閱讀）",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "1. COLLEGE HIGH比賽對象在於所有喜愛街舞的大學生以及熱舞社團對之間的交流比賽、參賽者僅限『大專院校之在學生』夜間部、延畢生、碩博班具有學生資格者也可參加（帶職進修者則不具參賽資格），所有超過1人需要組隊的項目一律不接受跨校組隊。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "2. 比賽時請攜帶110學年度上學期有效之學生證或在學證明交予主辦單位查驗備核，選手們不得以不知道、忘記帶、弄不見、忘了蓋註冊章…等任何理由推托。若手邊正好遺失學生證，就以選課單或其他相關有效證件以備查核（如：在學證明、註冊證明等等...），參賽資格查驗未完成將被禁止出賽，未完成查驗而出賽該隊以0分計算，不得異議。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "3. HIPHOP/POPPING/LOCKING組的團體賽，一校一個項目限制一隊、不接受跨校組隊。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "4. 團體賽當天報到時，請各隊派代表收齊參賽選手之學生證到會場內報到。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "5. 為求選手觀眾全天活動之安全請各參賽學校、隊伍及人員，『依需要自行投保旅遊平安險』，大會當天將於會場投保公共意外險。",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "PS:以上參賽須知是為更新後的精簡版本，其餘細項可上活動官網查詢完整版本。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "" },
                      {
                        type: "LINK/LINK",
                        children: [{ text: "" }],
                        data: { href: "https://reurl.cc/AGEap" },
                      },
                      { text: "" },
                      {
                        type: "LINK/LINK",
                        children: [
                          {
                            text: "Teamskip 官方網站",
                            Color: { color: "rgba(0,0,255,1)" },
                          },
                        ],
                        data: {
                          href: "https://reurl.cc/AGEap",
                          openInNewWindow: true,
                        },
                      },
                      { text: "" },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "HEADINGS/HEADING-FIVE",
                    children: [
                      {
                        text: "＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
                      },
                    ],
                  },
                  {
                    type: "HEADINGS/HEADING-FIVE",
                    children: [
                      {
                        text: "本賽制及文字，皆受智慧財產權保護。請勿任意以任何形態拷貝抄襲，違者將追朔法律責任。",
                      },
                    ],
                  },
                  {
                    type: "HEADINGS/HEADING-FIVE",
                    children: [
                      {
                        text: "＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "------------------------------------------------",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "MC：" }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "ATOH (TEAM SKIP &TBC & 246 JAZZ CLUB / TAIWAN)",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "YOYO(TEAM SKIP & ADBKM / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "GABY (KFC / TAIWAN)" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "DJ：" }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "DJ SOUNG (MASK / TAIWAN) \\nDJ KEEP JIA HONG (MADSKILLZ / TAIWAN)",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "DJ FABIO (OEWZ / TAIWAN)" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "JUDGE 評審老師：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "J CHILLA 徐靖 ( HURRICANES & ABOUT DANCING / TAIWAN)",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "A CAI A菜 (KNUGE & THE JAM / TAIWAN)" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "DIAO 吊嘎 (IP LOCKERS & AFURO / TAIWAN)" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "DON 小董 (ODD ONES / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "KRAZY BONEZ (LETS BOOGIE / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "RANNY LIU 淋雨 （B.T.O.D & HIZAM & BOOG NATION / TAIWAN）",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "補充評審：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "XIAN 子賢 (B.T.O.D & ODD ONES / TAIWAN)" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "LOCKING JB 阿邦 (SOLUTION / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "DUCKMAN鴨俠 (FINGERMOSA / TAIWAN)" }],
                  },
                ],
              },
              "zh-TW": {
                slate: [
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "★STAGE3（12月18日）" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "參賽隊伍集合時間 AM11:00 / 觀眾入場建議時間13:00",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "HIPHOP / POPPING / LOCKING 經典全國制霸團體賽" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "✔地點： 台北體育館1F 綜合球場" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "PS:海選賽事付費直播\n" },
                      {
                        type: "LINK/LINK",
                        children: [
                          {
                            text: "線上購票在Asiania",
                            Color: { color: "rgba(0,0,255,1)" },
                          },
                        ],
                        data: { href: "https://2021collegehigh.asiania.me" },
                      },
                      { text: "" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "備註：CollegeHigh x 中衛口罩，僅限現場實體觀賽兌換。若有需求請至 ",
                        "EMPHASIZE/STRONG": true,
                      },
                      {
                        type: "LINK/LINK",
                        children: [
                          {
                            "EMPHASIZE/STRONG": true,
                            text: "OBS官方網站",
                            Color: { color: "rgba(0,0,255,1)" },
                          },
                        ],
                        data: {
                          href: "http://www.obsbattle.com/zh-tw/",
                          openInNewWindow: true,
                        },
                      },
                      { "EMPHASIZE/STRONG": true, text: " 購買現場觀賽票。" },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "" }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "★STAGE4（12月18日19日 跨夜）" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "11:00PM~04:00AM" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "12月19日-隔天 College High 跨夜閉幕Party" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "票價： 免費" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "大學爽參賽者前100名：附一杯飲料" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "✔地點： 圓山花博園區 23 MUSIC ROOM" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "------------------------------------------------",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "其他訊息：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "Stage3" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "報名參賽或是購票觀賽，每人每張票可換取一個入場手環並可領取 CSD x College High 的四片裝限定口罩一盒，內含今年賽事的獨家限定色，中衛口罩跟我們一起守護你的健康。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "------------------------------------------------",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "HEADINGS/HEADING-TWO",
                    children: [
                      {
                        text: "活動宗旨與110年度參賽須知（請參賽選手注意閱讀）",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "1. COLLEGE HIGH比賽對象在於所有喜愛街舞的大學生以及熱舞社團對之間的交流比賽、參賽者僅限『大專院校之在學生』夜間部、延畢生、碩博班具有學生資格者也可參加（帶職進修者則不具參賽資格），所有超過1人需要組隊的項目一律不接受跨校組隊。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "2. 比賽時請攜帶110學年度上學期有效之學生證或在學證明交予主辦單位查驗備核，選手們不得以不知道、忘記帶、弄不見、忘了蓋註冊章…等任何理由推托。若手邊正好遺失學生證，就以選課單或其他相關有效證件以備查核（如：在學證明、註冊證明等等...），參賽資格查驗未完成將被禁止出賽，未完成查驗而出賽該隊以0分計算，不得異議。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "3. HIPHOP/POPPING/LOCKING組的團體賽，一校一個項目限制一隊、不接受跨校組隊。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "4. 團體賽當天報到時，請各隊派代表收齊參賽選手之學生證到會場內報到。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "5. 為求選手觀眾全天活動之安全請各參賽學校、隊伍及人員，『依需要自行投保旅遊平安險』，大會當天將於會場投保公共意外險。",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "PS:以上參賽須知是為更新後的精簡版本，其餘細項可上活動官網查詢完整版本。",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "" },
                      {
                        type: "LINK/LINK",
                        children: [{ text: "" }],
                        data: { href: "https://reurl.cc/AGEap" },
                      },
                      { text: "" },
                      {
                        type: "LINK/LINK",
                        children: [
                          {
                            text: "Teamskip 官方網站",
                            Color: { color: "rgba(0,0,255,1)" },
                          },
                        ],
                        data: {
                          href: "https://reurl.cc/AGEap",
                          openInNewWindow: true,
                        },
                      },
                      { text: "" },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "HEADINGS/HEADING-FIVE",
                    children: [
                      {
                        text: "＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
                      },
                    ],
                  },
                  {
                    type: "HEADINGS/HEADING-FIVE",
                    children: [
                      {
                        text: "本賽制及文字，皆受智慧財產權保護。請勿任意以任何形態拷貝抄襲，違者將追朔法律責任。",
                      },
                    ],
                  },
                  {
                    type: "HEADINGS/HEADING-FIVE",
                    children: [
                      {
                        text: "＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "------------------------------------------------",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "MC：" }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "ATOH (TEAM SKIP &TBC & 246 JAZZ CLUB / TAIWAN)",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "YOYO(TEAM SKIP & ADBKM / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "GABY (KFC / TAIWAN)" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: "DJ：" }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "DJ SOUNG (MASK / TAIWAN) \\nDJ KEEP JIA HONG (MADSKILLZ / TAIWAN)",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "DJ FABIO (OEWZ / TAIWAN)" }],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "JUDGE 評審老師：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "J CHILLA 徐靖 ( HURRICANES & ABOUT DANCING / TAIWAN)",
                      },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "A CAI A菜 (KNUGE & THE JAM / TAIWAN)" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "DIAO 吊嘎 (IP LOCKERS & AFURO / TAIWAN)" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "DON 小董 (ODD ONES / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "KRAZY BONEZ (LETS BOOGIE / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      {
                        text: "RANNY LIU 淋雨 （B.T.O.D & HIZAM & BOOG NATION / TAIWAN）",
                      },
                    ],
                  },
                  { type: "PARAGRAPH/PARAGRAPH", children: [{ text: " " }] },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "補充評審：" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [
                      { text: "XIAN 子賢 (B.T.O.D & ODD ONES / TAIWAN)" },
                    ],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "LOCKING JB 阿邦 (SOLUTION / TAIWAN)" }],
                  },
                  {
                    type: "PARAGRAPH/PARAGRAPH",
                    children: [{ text: "DUCKMAN鴨俠 (FINGERMOSA / TAIWAN)" }],
                  },
                ],
              },
            },
            rows: [],
            inline: null,
          },
        ],
      },
    ],
  };
  return {
    props: {
      post: { ...post, content: JSON.stringify(value) }
    },
    revalidate: 300, // In seconds
  }
}

export default PostPage;
