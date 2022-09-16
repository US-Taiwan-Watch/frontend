import Head from "next/head";
import { useI18n } from "../context/i18n";
import { useRouter } from "next/router";
import { AdminHeader } from "./admin-header";

export type LayoutProps = {
  title: string,
}

export const AdminLayout: React.FC<LayoutProps> = (props) => {
  const { i18n } = useI18n();
  const { asPath } = useRouter();
  const title = props.title ? `${props.title} - ${i18n.strings.brand.fullName}` : i18n.strings.brand.fullName;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <AdminHeader title={props.title} />

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
