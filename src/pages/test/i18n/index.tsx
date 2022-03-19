import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { LocaleSwitcher } from "../../../components/locale-switcher";
import { useI18n } from "../../../context/i18n";

const Page: NextPage = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale, asPath, pathname } = router;
  const { i18n } = useI18n();

  return (
    <div>
      <h1>Index page</h1>
      <p>Current locale: {locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(locales)}</p>

      <p>asPath: {asPath}</p>
      <p>pathname: {pathname}</p>

      <p>text = {i18n.strings.landing.testI18n}</p>

      <LocaleSwitcher />

      <Link href="/test/i18n/gsp">
        <a>To getStaticProps page</a>
      </Link>
      <br />

      <Link href="/test/i18n/gsp/first">
        <a>To dynamic getStaticProps page</a>
      </Link>
      <br />

      <Link href="/test/i18n/gssp">
        <a>To getServerSideProps page</a>
      </Link>
      <br />
    </div>
  );
};

export default Page;
