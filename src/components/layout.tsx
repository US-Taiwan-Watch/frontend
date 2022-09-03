import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { useI18n } from "../context/i18n";
import { useRouter } from "next/router";
import Script from "next/script";
import { isLocal } from "../utils/gate-keeper";

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
  const title = props.title || i18n.strings.brand.fullName;
  const description = props.description || i18n.strings.landing.aboutDesc;
  return (
    <>
      {!isLocal && <>
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <Script strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </Script>
      </>}
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
