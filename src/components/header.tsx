import * as React from "react";
import { IUser } from "../lib/user";
import { GlobalStyles, Link, Toolbar, Typography } from "@mui/material";
import { useI18n } from "../context/i18n";
import { LocaleSwitcher } from "./locale-switcher";
import { showDevContent } from "../utils/gate-keeper";

export interface IHeaderProps {
  user?: IUser;
  loading?: boolean;
}

const NavLink: React.FC<{ href?: string | undefined }> = ({ href, children }) => (
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
      {/* <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' }, a: { textDecoration: 'none' } }} /> */}
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        {i18n.strings.brand.fullName}
      </Typography>
      <nav>
        <NavLink href="#">
          {i18n.strings.header.aboutUs}
        </NavLink>
        <NavLink href="#">
          合作夥伴
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
