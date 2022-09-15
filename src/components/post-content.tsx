import { Box, Button, Chip, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useUserRole } from "../context/user-role";
import { Article } from "../generated/graphql-types";
import { AdaptiveEditor } from "./component-adaptive-editor";

export const PostContent: React.FC<{ post: Article }> = ({ post }) => {
  const { isEditor } = useUserRole();

  return (
    <Container sx={{ paddingBottom: 10 }}>
      {/* {isEditor && <>
          <Link href={`admin/${post.id}`}>
            <Button variant="contained">EDIT</Button>
          </Link>
          <Typography sx={{ mx: 5 }}>{post.isPublished ? 'Published' : 'Draft'}</Typography>
        </>} */}
      <Box alignItems="center" sx={{ paddingTop: 3, display: 'flex', flexDirection: 'column' }}>
        <Typography component="h1" variant="h4">
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {post.pusblishTime && new Date(post.pusblishTime).toLocaleDateString()}{' by '}
          {post.authors?.map(author => <Chip label={author} onClick={() => { }} />)}
        </Typography>
        {/* {post.imageSource && <img src={post.imageSource} width="100%" style={{ paddingTop: 10 }} />} */}
      </Box>
      <AdaptiveEditor value={post.content || ''} viewOnly={true} />
    </Container>
  );
};
