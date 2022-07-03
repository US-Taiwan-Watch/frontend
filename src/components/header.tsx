import * as React from "react";
import { IUser } from "../lib/user";
import { GlobalStyles, Toolbar, Typography } from "@mui/material";
import { useI18n } from "../context/i18n";
import { LocaleSwitcher } from "./locale-switcher";
import { showDevContent } from "../utils/gate-keeper";
import { Link } from "./link";
import Image from "next/image";

export interface IHeaderProps {
  user?: IUser;
  loading?: boolean;
}

const NavLink: React.FC<{ href: string }> = ({ href, children }) => (
  <Link href={href} style={{ textDecoration: 'none' }}
    variant="button"
    color="text.primary" sx={{ my: 1, mx: 1.5 }}>
    {children}
  </Link>
);

export const Header: React.FC<IHeaderProps> = ({ user, loading }) => {
  const { i18n } = useI18n();
  return (
    <Toolbar sx={{ flexWrap: 'wrap' }}>
      <Link href='/' style={{ textDecoration: 'none' }} scroll={false}
        color="text.primary" sx={{
          my: 1, mx: 1.5,
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
        <Image src="/assets/logo.png" width={30} height={30} />
        {/* <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' }, a: { textDecoration: 'none' } }} /> */}
        <Typography variant="h6" color="inherit" noWrap sx={{ mx: 1.5 }}>
          {i18n.strings.brand.fullName}
        </Typography>
      </Link>
      <nav>
        <NavLink href="#about">
          {i18n.strings.header.aboutUs}
        </NavLink>
        <NavLink href="#partners">
          合作夥伴
        </NavLink>
        <NavLink href="#follow">
          追蹤我們
        </NavLink>
        <NavLink href="#join">
          加入我們
        </NavLink>
        <NavLink href="#donate">
          支持我們
        </NavLink>
        {showDevContent && !loading &&
          (user ? (
            <>
              <NavLink href="/test/profile">
                Client-rendered profile
              </NavLink>
              <NavLink href="/test/profile-ssr">
                Server rendered profile (advanced)
              </NavLink>
              <NavLink href="/test/graphql-test">
                GraphQL
              </NavLink>
              <NavLink href="/api/logout">Logout</NavLink>
            </>
          ) : (
            <NavLink href="/api/login">Login</NavLink>
          ))}
        <LocaleSwitcher />
      </nav>
    </Toolbar>
  )
};
