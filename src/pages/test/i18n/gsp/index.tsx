import { GetStaticProps, NextPage } from "next";
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
  const { defaultLocale, asPath, pathname } = router;
  const { i18n } = useI18n();

  return (
    <div>
      <h1>getStaticProps page</h1>
      <p>Current locale: {props.locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>

      <p>asPath: {asPath}</p>
      <p>pathname: {pathname}</p>

      <p>text = {i18n.strings.home.festivalTitle.ticketBtnTitle}</p>

      <LocaleSwitcher />

      <Link href="/test/i18n/gsp/first">
        <a>To dynamic getStaticProps page</a>
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
