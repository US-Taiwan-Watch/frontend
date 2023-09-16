import * as React from "react";
import { useFetchUser } from "../lib/user";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useI18n } from "../context/i18n";
import { LocaleSwitcher } from "./locale-switcher";
import { Link, LinkProps } from "./link";
import Image from "next/image";
import { ColorModeContext } from "../pages/_app";
import { useRouter } from "next/router";
import { UserMenu } from "./user-menu";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import { Footer } from "./footer";

const NavLink: React.FC<LinkProps> = (props) => (
  <Link {...props} variant="button" color="inherit" sx={{ my: 1, mx: 1.5 }}>
    {props.children}
  </Link>
);

const NavButtons: React.FC = () => {
  const { i18n } = useI18n();
  return (
    <>
      <NavLink href="/#about">{i18n.strings.header.about}</NavLink>
      <NavLink href="/podcast">{i18n.strings.header.podcast}</NavLink>
      <NavLink href="/articles">{i18n.strings.header.articles}</NavLink>
    </>
  );
};

export const NavBar: React.FC = () => (
  <Box
    sx={{
      position: "absolute",
      display: {
        xs: "none",
        sm: "none",
        md: "flex",
      },
      flexWrap: "wrap",
    }}
    color="primary.light"
  >
    <NavButtons />
  </Box>
);

const HeaderTitle: React.FC<{ whiteLogo?: boolean }> = ({ whiteLogo }) => {
  const { i18n } = useI18n();
  return (
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
        color="inherit"
        sx={{ display: "flex" }}
      >
        <Image
          src={whiteLogo ? "/assets/logo-white.png" : "/assets/logo.png"}
          width={30}
          height={30}
          alt="US Taiwan Watch"
        />
        <Typography variant="h6" color="inherit" noWrap sx={{ mx: 1.5 }}>
          {i18n.strings.brand.fullName}
        </Typography>
      </Link>
    </Box>
  );
};

export const Header: React.FC<{
  draftMode: boolean;
}> = ({ draftMode }) => {
  const { i18n } = useI18n();
  const { user } = useFetchUser();
  const { pathname } = useRouter();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const isHome = pathname === "/";

  if (draftMode) {
    return (
      <Toolbar
        sx={{
          flexWrap: "wrap",
          alignItems: "center",
          px: 2,
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          marginBottom: "1px",
          justifyContent: "center",
          color: theme.palette.text.primary,
        }}
      >
        <HeaderTitle />
        <NavBar />
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
            },
          }}
        >
          <Box sx={{ marginTop: 1, color: theme.palette.primary.main }}>
            <LocaleSwitcher />
          </Box>
          <NavLink href="/#donate">
            <Button variant="contained">{i18n.strings.header.donate}</Button>
          </NavLink>
          {user && (
            <>
              <UserMenu />
            </>
          )}
          {/* Enable dark mode switch later after addressing all possible issues */}
          {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton> */}
        </Box>
        <IconButton
          sx={{ display: { md: "none", lg: "none" } }}
          onClick={() => setShowDrawer(true)}
          color="primary"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          PaperProps={{
            sx: { width: "100%", background: theme.palette.primary.main },
          }}
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
        >
          <Toolbar sx={{ color: theme.palette.text.secondary }}>
            <HeaderTitle whiteLogo={true} />
            <IconButton
              onClick={() => setShowDrawer(false)}
              sx={{ color: theme.palette.text.secondary }}
            >
              <CancelIcon />
            </IconButton>
          </Toolbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2,
              color: theme.palette.text.secondary,
            }}
          >
            <NavButtons />
            <Box sx={{ marginTop: 1 }}>
              <LocaleSwitcher />
            </Box>
            <NavLink href="/#donate">
              <Button
                variant="contained"
                sx={{ background: theme.palette.primary.dark }}
              >
                {i18n.strings.header.donate}
              </Button>
            </NavLink>
          </Box>
          <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
            <Footer draftMode={true} />
          </Box>
        </Drawer>
      </Toolbar>
    );
  }

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
          <Image
            src="/assets/logo.png"
            width={30}
            height={30}
            alt="US Taiwan Watch"
          />
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
        {user && (
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
