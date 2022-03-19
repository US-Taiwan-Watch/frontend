import * as React from "react";
import Link from "next/link";
import { IUser } from "../lib/user";

export interface IHeaderProps {
  user?: IUser;
  loading?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ user, loading }) => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/test/about">
            <a>About</a>
          </Link>
        </li>
        {!loading &&
          (user ? (
            <>
              <li>
                <Link href="/test/profile">
                  <a>Client-rendered profile</a>
                </Link>
              </li>
              <li>
                <Link href="/test/profile-ssr">
                  <a>Server rendered profile (advanced)</a>
                </Link>
              </li>
              <li>
                <Link href="/test/graphql-test">
                  <a>GraphQL</a>
                </Link>
              </li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </>
          ) : (
            <li>
              <a href="/api/login">Login</a>
            </li>
          ))}
      </ul>
    </nav>

    <style jsx>{`
      header {
        padding: 0.2rem;
        color: #fff;
        background-color: #333;
      }
      nav {
        max-width: 42rem;
        margin: 1.5rem auto;
      }
      ul {
        display: flex;
        list-style: none;
        margin-left: 0;
        padding-left: 0;
      }
      li {
        margin-right: 1rem;
      }
      li:nth-child(2) {
        margin-right: auto;
      }
      a {
        color: #fff;
        text-decoration: none;
      }
      button {
        font-size: 1rem;
        color: #fff;
        cursor: pointer;
        border: none;
        background: none;
      }
    `}</style>
  </header>
);
