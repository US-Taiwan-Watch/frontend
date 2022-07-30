import * as React from "react";
import { IUser } from "../lib/user";
import { Box, Button, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import { useI18n } from "../context/i18n";
import { LocaleSwitcher } from "./locale-switcher";
import { showDevContent } from "../utils/gate-keeper";
import { Link, LinkProps } from "./link";
import Image from "next/image";
import { ColorModeContext } from "../pages/_app";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export interface IHeaderProps {
  user?: IUser;
  loading?: boolean;
}

const NavLink: React.FC<LinkProps> = (props) => (
  <Link {...props} style={{ textDecoration: 'none' }}
    variant="button"
    color="text.primary" sx={{ my: 1, mx: 1.5 }}>
    {props.children}
  </Link >
);

export const Header: React.FC<IHeaderProps> = ({ user, loading }) => {
  const { i18n } = useI18n();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Toolbar sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
      <Box sx={{
        my: 1,
        flexGrow: 1,
        display: 'flex',
      }}>
        <Link href='/' style={{ textDecoration: 'none' }} scroll={false}
          color="text.primary" sx={{ display: 'flex' }}>
          <Image src="/assets/logo.png" width={30} height={30} />
          {/* <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' }, a: { textDecoration: 'none' } }} /> */}
          <Typography variant="h6" color="inherit" noWrap sx={{ mx: 1.5 }}>
            {i18n.strings.brand.fullName}
          </Typography>
        </Link>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'right',
      }}>
        <NavLink href="#about">
          {i18n.strings.header.about}
        </NavLink>
        <NavLink href="#partners">
          {i18n.strings.header.partners}
        </NavLink>
        <NavLink href="#follow">
          {i18n.strings.header.follow}
        </NavLink>
        <NavLink href="#subscribe">
          {i18n.strings.header.subscribe}
        </NavLink>
        <NavLink href="#donate">
          <Button variant="contained">
            {i18n.strings.header.donate}
          </Button>
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
        <Box sx={{ my: 1 }}>
          <LocaleSwitcher />
        </Box>
        {/* Enable dark mode switch later after addressing all possible issues */}
        {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton> */}
      </Box>
    </Toolbar>
  )
};
