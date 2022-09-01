import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { useI18n } from "../context/i18n";
import { useRouter } from "next/router";

export type LayoutProps = {
  title?: string,
  type?: string,
  description?: string,
  image?: string,
  imageAlt?: string,
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { i18n } = useI18n();
  const { asPath } = useRouter();
  console.log(process.env.NEXT_PUBLIC_BASE_URL + asPath.replace(/[#|?].*$/, ''))
  const title = props.title || i18n.strings.brand.fullName;
  const description = props.description || i18n.strings.landing.aboutDesc;

  return (
    <>
      <Head>
        <meta property="og:site_name" content={i18n.strings.brand.fullName} />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content={props.type || "website"} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL + asPath.replace(/[#|?].*$/, '')} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={props.image || 'https://static.ustw.watch/public-image/website/preview.png'} />
        <meta property="og:image:alt" content={props.imageAlt || i18n.strings.brand.fullName} />
        <meta name="description" content={description} />
      </Head>

      <Header />

      <main>
        <div>{props.children}</div>
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
