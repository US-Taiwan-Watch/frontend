// This import is only included in the server build, because it's only used by getServerSideProps
import { auth0 } from "../../lib/auth0";
import { Layout } from "../../components/layout";
import { NextPage, GetServerSideProps } from "next";
import { IUser } from "../../lib/user";
import { Claims } from "@auth0/nextjs-auth0";

interface ProfilePageProps {
  user?: IUser;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => (
  <Layout>
    <h1>Profile</h1>

    <div>
      <h3>Profile (server rendered)</h3>
      <img src={user?.picture} alt="user picture" />
      <p>nickname: {user?.nickname}</p>
      <p>name: {user?.name}</p>
    </div>
  </Layout>
);

export const getServerSideProps: GetServerSideProps<{ user?: Claims }> =
  async ({ req, res }) => {
    // Here you can check authentication status directly before rendering the page,
    // however the page would be a serverless function, which is more expensive and
    // slower than a static page with client side authentication
    const session = await auth0.getSession(req, res);

    if (!session || !session.user) {
      return { redirect: { statusCode: 302, destination: "/api/login" } };
    }

    return { props: { user: session.user } };
  };

export default ProfilePage;
