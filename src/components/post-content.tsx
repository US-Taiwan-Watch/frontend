import { Box, Container } from "@mui/material";
import { PublicPostQuery } from "../lib/page-graphql/query-public-post.graphql.interface";
import { AdaptiveEditor } from "./component-adaptive-editor";

export const PostContent: React.FC<{
  post: PublicPostQuery["getPublicArticle"];
}> = ({ post }) => {
  // Should always be non-null!
  if (!post) {
    return <></>;
  }

  return (
    <Container sx={{ paddingBottom: 10 }}>
      {/* {isEditor && <>
          <Link href={`admin/${post.id}`}>
            <Button variant="contained">EDIT</Button>
          </Link>
          <Typography sx={{ mx: 5 }}>{post.isPublished ? 'Published' : 'Draft'}</Typography>
        </>} */}
      <Box
        alignItems="center"
        sx={{ paddingTop: 3, display: "flex", flexDirection: "column" }}
      >
        {/* <Typography component="h1" variant="h4">
          {post.title}
        </Typography> */}
        {post.imageSource && (
          <img
            src={post.imageSource}
            style={{ paddingTop: 10, maxWidth: "100%", maxHeight: "50vh" }}
          />
        )}
      </Box>
      <AdaptiveEditor value={post.content || ""} viewOnly={true} />
    </Container>
  );
};
