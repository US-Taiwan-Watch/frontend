import { useState, useEffect } from "react";

export interface IUser {
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email?: string;
  email_verified?: boolean;
  sub: string;
}

export interface USTWWindow extends Window {
  __user?: IUser;
}

export const fetchUser = async (cookie = "") => {
  const asWindow = (window as USTWWindow) ?? undefined;

  if (typeof window !== "undefined" && asWindow.__user) {
    return asWindow.__user;
  }

  const res = await fetch(
    "/api/me",
    cookie
      ? {
          headers: {
            cookie,
          },
        }
      : {}
  );

  if (!res.ok) {
    delete asWindow.__user;
    return null;
  }

  const json = await res.json();
  if (typeof window !== "undefined") {
    asWindow.__user = json;
  }
  return json;
};

export const useFetchUser = ({ required }: { required?: boolean } = {}) => {
  const [loading, setLoading] = useState(
    () => !(typeof window !== "undefined" && (window as USTWWindow).__user)
  );

  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return;
    }
    return (window as USTWWindow).__user;
  });

  useEffect(
    () => {
      if (!loading && user) {
        return;
      }
      setLoading(true);
      let isMounted = true;

      fetchUser().then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = "/api/login";
            return;
          }
          setUser(user);
          setLoading(false);
        }
      });

      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { user, loading };
};
