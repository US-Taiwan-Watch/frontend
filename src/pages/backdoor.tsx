import { NextPage } from "next";
import { Link } from "../components/link";
import { useFetchUser } from "../lib/user";

const BackdoorPage: NextPage = () => {
  const user = useFetchUser({ required: true });
  return user ?
    <Link href="/api/logout" target="_self">Logout</Link> :
    <Link href="/api/login" target="_self">Login</Link>;
}

export default BackdoorPage;
