// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0'
import { IUser, useFetchUser, USTWWindow } from "../lib/user";
import { Layout } from "../components/layout";
import { NextPage } from "next";
import { Loading } from "../components/loading";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import { useApolloClient } from "@apollo/client";
import { UpdateUserInfoDocument } from "../lib/page-graphql/update-user-info.graphql.interface";
import { useState } from "react";
import { uploadProfileImage } from "../utils/image-upload-utils";

interface ProfileCardProps {
  user: IUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const client = useApolloClient();

  console.log(updatedUser);

  return (
    <Container>
      <h1>Profile</h1>

      <div>
        <h3>Profile</h3>
        <input
          id="raised-button-file"
          hidden
          type="file"
          accept="image/png, image/jpeg"
          onChange={async (e) => {
            if (!e.target.files) {
              return;
            }
            try {
              const text = await uploadProfileImage(e.target.files[0]);
              setUpdatedUser({ ...updatedUser, picture: text });
            } catch (err) {
              // TODO: handle action error
            }
          }}
        />
        <label htmlFor="raised-button-file">
          <IconButton component="span">
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={user?.picture}
              alt="user picture"
            />
          </IconButton>
        </label>
        <TextField
          label="Name"
          value={updatedUser.name}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, name: e.target.value })
          }
        />
        <TextField
          label="Username"
          value={updatedUser.nickname}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, nickname: e.target.value })
          }
        />
        <p>email: {user?.email}</p>
        <Button onClick={() => setUpdatedUser(user)}>Cancel</Button>
        <Button
          onClick={async () => {
            const res = await client.mutate({
              mutation: UpdateUserInfoDocument,
              variables: updatedUser,
              fetchPolicy: "network-only",
            });
            if (res.data?.updateUser) {
              window.location.reload();
            }
          }}
        >
          Save
        </Button>
      </div>
    </Container>
  );
};

const Profile: NextPage = () => {
  const { user } = useFetchUser({ required: true });
  if (!user) {
    return <Loading />;
  }

  return (
    <Layout>
      <ProfileCard user={user} />
    </Layout>
  );
};

export default Profile;
