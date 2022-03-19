import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { LocaleSwitcher } from "../../../../components/locale-switcher";
import { useI18n } from "../../../../context/i18n";

interface PageProps {
  locale?: string;
  locales?: string[];
}

const Page: NextPage<PageProps> = (props) => {
  const router = useRouter();
  const { defaultLocale, isFallback, query, asPath, pathname } = router;
  const { i18n } = useI18n();

  if (isFallback) {
    return <>{"Loading..."}</>;
  }

  return (
    <div>
      <h1>getStaticProps page</h1>
      <p>Current slug: {query.slug}</p>
      <p>Current locale: {props.locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>

      <p>asPath: {asPath}</p>
      <p>pathname: {pathname}</p>

      <p>text = {i18n.strings.landing.testI18n}</p>

      <LocaleSwitcher />

      <Link href="/test/i18n/gsp">
        <a>To getStaticProps page</a>
      </Link>
      <br />

      <Link href="/test/i18n/gssp">
        <a>To getServerSideProps page</a>
      </Link>
      <br />

      <Link href="/test/i18n">
        <a>To index page</a>
      </Link>
      <br />
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<PageProps> = async ({
  locale,
  locales,
}) => ({
  props: {
    locale,
    locales,
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async ({
  locales = [],
}) => {
  const paths = [];

  for (const locale of locales) {
    paths.push({ params: { slug: "first" }, locale });
    paths.push({ params: { slug: "second" }, locale });
  }

  return {
    paths,
    fallback: true,
  };
};
