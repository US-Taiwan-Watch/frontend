import * as React from "react";
import { IUser, useFetchUser } from "../lib/user";
import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { useI18n } from "../context/i18n";
import { LocaleSwitcher } from "./locale-switcher";
import { Link, LinkProps } from "./link";
import Image from "next/image";
import { ColorModeContext } from "../pages/_app";
import { useRouter } from "next/router";
import { UserMenu } from "./user-menu";

const NavLink: React.FC<LinkProps> = (props) => (
  <Link
    {...props}
    style={{ textDecoration: "none" }}
    variant="button"
    color="text.primary"
    sx={{ my: 1, mx: 1.5 }}
  >
    {props.children}
  </Link>
);

export const Header: React.FC = () => {
  const { i18n } = useI18n();
  const { loading, isAdmin, isEditor } = useFetchUser();
  const { pathname } = useRouter();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const isHome = pathname === "/";

  return (
    <Toolbar sx={{ flexWrap: "wrap", alignItems: "center" }}>
      <Box
        sx={{
          my: 1,
          flexGrow: 1,
          display: "flex",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          scroll={false}
          color="text.primary"
          sx={{ display: "flex" }}
        >
          <Image src="/assets/logo.png" width={30} height={30} />
          {/* <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' }, a: { textDecoration: 'none' } }} /> */}
          <Typography variant="h6" color="inherit" noWrap sx={{ mx: 1.5 }}>
            {i18n.strings.brand.fullName}
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "right",
        }}
      >
        <NavLink href="/#about">{i18n.strings.header.about}</NavLink>
        {isHome && (
          <>
            <NavLink href="/#partners">{i18n.strings.header.partners}</NavLink>
          </>
        )}
        <NavLink href={isHome ? "/#podcast" : "/podcast"}>
          {i18n.strings.header.podcast}
        </NavLink>
        <NavLink href={isHome ? "/#subscribe" : "/newsletters"}>
          {i18n.strings.header.subscribe}
        </NavLink>
        {isHome && (
          <>
            <NavLink href="/#follow">{i18n.strings.header.follow}</NavLink>
            <NavLink href="/#join">{i18n.strings.header.join}</NavLink>
          </>
        )}
        <NavLink href="/#donate">
          <Button variant="contained">{i18n.strings.header.donate}</Button>
        </NavLink>
        {(isAdmin || isEditor) && (
          <>
            <NavLink href="/posts">文章</NavLink>
            <UserMenu />
          </>
        )}
        <Box sx={{ my: 1 }}>
          <LocaleSwitcher />
        </Box>
        {/* Enable dark mode switch later after addressing all possible issues */}
        {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton> */}
      </Box>
    </Toolbar>
  );
};
