import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { useRouter } from "next/router";
import { CardList } from "../../components/card-list";

export type PostProps = {
  slug: string,
  title: string,
  tags: string[],
  preview: string,
  content: string,
  publishDate: string,
  image: string,
}

type PostsPageProps = {
  posts: PostProps[],
}

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  const router = useRouter();
  return (
    <Layout>
      <Banner title="所有文章" >
      </Banner>

      <CardList cards={posts.map(p => ({ ...p, displayDate: p.publishDate, url: `${router.pathname}/${p.slug}` }))} />

    </Layout >
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  return {
    props: {
      posts: allPosts
    },
    revalidate: 300, // In seconds
  }
}

export default PostsPage;


export const allPosts = [
  {
    slug: '1',
    title: 'test title 1',
    tags: [],
    preview: 'This blog post shows a few different types of content that are supported and styled with Material styles. Basic typography, images, and code are all supported. You can extend these by modifying Markdown.js.1',
    content: 'content 1',
    publishDate: 'Date 1',
    image: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/295758836_372025898384054_1520161559750890202_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=TPIrSqFi5t4AX-KZLqf&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-qSkr-0_rHVGqGoU4fhqr5b0ZQ0AJW_NJD6l39rksvcg&oe=62EB70C9',
  },
  {
    slug: '2',
    title: 'test title 2',
    tags: [],
    preview: '2',
    content: 'content 2',
    publishDate: 'Date 2',
    image: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/295758836_372025898384054_1520161559750890202_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=TPIrSqFi5t4AX-KZLqf&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-qSkr-0_rHVGqGoU4fhqr5b0ZQ0AJW_NJD6l39rksvcg&oe=62EB70C9',
  },
  {
    slug: '3',
    title: 'test title 3',
    tags: [],
    preview: 'Cum sociis natoque penatibus et magnis dis partslugent montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.3',
    content: 'content 3',
    publishDate: 'Date 3',
    image: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/295758836_372025898384054_1520161559750890202_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=TPIrSqFi5t4AX-KZLqf&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-qSkr-0_rHVGqGoU4fhqr5b0ZQ0AJW_NJD6l39rksvcg&oe=62EB70C9',
  },
];
