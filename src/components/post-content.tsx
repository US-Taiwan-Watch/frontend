import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useUserRole } from "../context/user-role";
import { Article } from "../generated/graphql-types";
import { AdaptiveEditor } from "./component-adaptive-editor";

export const PostContent: React.FC<{ post: Article }> = ({ post }) => {
  const { isEditor } = useUserRole();

  return (
    <Container sx={{ paddingBottom: 10 }}>
      {isEditor && <>
        <Link href={`admin/${post.id}`}>
          <Button variant="contained">EDIT</Button>
        </Link>
        <Typography sx={{ mx: 5 }}>{post.isPublished ? 'Published' : 'Draft'}</Typography>
      </>}
      <Box alignItems="center" sx={{ paddingTop: 3, display: 'flex', flexDirection: 'column' }}>
        {/* <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {pubDate}
          </Typography> */}
      </Box>
      <AdaptiveEditor value={post.content || ''} viewOnly={true} />
    </Container>
  );
};
