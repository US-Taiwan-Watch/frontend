import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { NextPage } from "next";
import { AdminLayout } from "../../components/admin-layout";
import { Banner } from "../../components/banner";
import { Link } from "../../components/link";
import { useI18n } from "../../context/i18n";
import { ArticleType } from "../../generated/graphql-types";

export const AdminPage: NextPage = () => {
  const { i18n } = useI18n();
  const links = [
    {
      href: "/admin/analysis",
      text: i18n.formatString(
        i18n.strings.admin.posts.managePosts,
        i18n.strings.posts[ArticleType.Article]
      ) as string,
    },
    {
      href: "/admin/posters",
      text: i18n.formatString(
        i18n.strings.admin.posts.managePosts,
        i18n.strings.posts[ArticleType.Poster]
      ) as string,
    },
  ];

  return (
    <AdminLayout title="管理介面">
      <Banner title="管理介面" />
      <Container>
        <List>
          {links.map((link) => (
            <Link
              href={link.href}
              sx={{ textDecoration: "none" }}
              key={link.href}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Container>
    </AdminLayout>
  );
};
export default AdminPage;
