import Head from "next/head";
import { IUser } from "../lib/user";
import { Header } from "./header";
import { Footer } from "./footer";
import { useI18n } from "../context/i18n";

export interface ILayoutProps {
  user?: IUser;
  loading?: boolean;
}

export const Layout: React.FC<ILayoutProps> = ({
  user,
  loading = false,
  children,
}) => {
  const { i18n } = useI18n();
  return (
    <>
      <Head>
        <title>{i18n.strings.brand.fullName}</title>
        <meta property="og:site_name" content={i18n.strings.brand.fullName} />
      </Head>

      <Header user={user} loading={loading} />

      <main>
        <div>{children}</div>
      </main>

      <Footer />

      <style jsx global>{`
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
      html {
        scroll-behavior: smooth;
      }
    `}</style>
    </>
  );
};
