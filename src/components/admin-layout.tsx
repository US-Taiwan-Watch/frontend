import Head from "next/head";
import { useI18n } from "../context/i18n";
import { AdminHeader } from "./admin-header";
import { useFetchUser } from "../lib/user";
import Error from "next/error";
import { Loading } from "./loading";

export type LayoutProps = {
  title: string;
};

export const AdminLayout: React.FC<LayoutProps> = (props) => {
  const { i18n } = useI18n();
  const { loading, canEdit } = useFetchUser({ required: true });
  if (loading) {
    return <Loading />;
  }
  if (!loading && !canEdit) {
    return (
      <Error
        statusCode={403}
        title="You don't have permission to access this page"
      />
    );
  }

  const title = props.title
    ? `${props.title} - ${i18n.strings.brand.fullName}`
    : i18n.strings.brand.fullName;

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
