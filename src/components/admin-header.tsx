import * as React from "react";
import { useFetchUser } from "../lib/user";
import { Box, Toolbar, Typography } from "@mui/material";
import { useI18n } from "../context/i18n";
import { Link, LinkProps } from "./link";
import Image from "next/image";
import { UserMenu } from "./user-menu";
import { ArticleType } from "../generated/graphql-types";
import { LocaleSwitcher } from "./locale-switcher";

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

export const AdminHeader: React.FC<{ title: string }> = ({ title }) => {
  const { i18n } = useI18n();
  const { canEdit } = useFetchUser({ required: true });

  return (
    <Toolbar sx={{ flexWrap: "wrap", alignItems: "center" }}>
      <Box
        sx={{
          my: 1,
          flexGrow: 1,
          display: "flex",
        }}
      >
        <Image
          src="/assets/logo.png"
          width={30}
          height={30}
          alt="US Taiwan Watch"
        />
        <Typography variant="h6" color="inherit" noWrap sx={{ mx: 1.5 }}>
          [{title}] {i18n.strings.brand.fullName}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "right",
        }}
      >
        {canEdit && (
          <>
            <NavLink href="/admin/analysis">
              {
                i18n.formatString(
                  i18n.strings.admin.posts.managePosts,
                  i18n.strings.posts[ArticleType.Article]
                ) as string
              }
            </NavLink>
            <NavLink href="/admin/posters">
              {
                i18n.formatString(
                  i18n.strings.admin.posts.managePosts,
                  i18n.strings.posts[ArticleType.Poster]
                ) as string
              }
            </NavLink>
            <NavLink href="/">回到首頁</NavLink>
            <NavLink href="/analysis" target="_blank">
              文章欄
            </NavLink>
            <NavLink href="/posters" target="_blank">
              佈告欄
            </NavLink>
            <UserMenu />
            {/* <Box sx={{ mx: 1 }}>
              <LocaleSwitcher />
            </Box> */}
          </>
        )}
      </Box>
    </Toolbar>
  );
};
