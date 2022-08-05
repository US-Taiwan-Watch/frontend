// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0'
import { IUser, useFetchUser } from "../../lib/user";
import { Layout } from "../../components/layout";
import { NextPage } from "next";

interface ProfileCardProps {
  user?: IUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => (
  <>
    <h1>Profile</h1>

    <div>
      <h3>Profile (client rendered)</h3>
      <img src={user?.picture} alt="user picture" />
      <p>nickname: {user?.nickname}</p>
      <p>name: {user?.name}</p>
    </div>
  </>
);

const Profile: NextPage = () => {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout>
      {loading ? <>Loading...</> : <ProfileCard user={user} />}
    </Layout>
  );
};

export default Profile;
