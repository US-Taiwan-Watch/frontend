import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { useI18n } from "../context/i18n";
import { useRouter } from "next/router";
import Script from "next/script";
import { isLocal } from "../utils/gate-keeper";
import { AdminHeader } from "./admin-header";

export type LayoutProps = {
  title?: string,
  type?: string,
  description?: string,
  image?: string,
  imageAlt?: string,
}

export const AdminLayout: React.FC<LayoutProps> = (props) => {
  const { i18n } = useI18n();
  const { asPath } = useRouter();
  const title = props.title ? `${props.title} - ${i18n.strings.brand.fullName}` : i18n.strings.brand.fullName;
  const description = props.description || i18n.strings.landing.aboutDesc;
  return (
    <>
      <AdminHeader />

      <main>
        <div>{props.children}</div>
      </main>

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
