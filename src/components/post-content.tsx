import { Box, Typography } from "@mui/material";
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
    <>
      {/* {isEditor && <>
          <Link href={`admin/${post.id}`}>
            <Button variant="contained">EDIT</Button>
          </Link>
          <Typography sx={{ mx: 5 }}>{post.isPublished ? 'Published' : 'Draft'}</Typography>
        </>} */}
      <Box
        alignItems="center"
        sx={{
          paddingTop: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* <Typography component="h1" variant="h4">
          {post.title}
        </Typography> */}
        {post.imageSource && (
          <div
            style={{
              position: "relative",
              paddingTop: "69%",
              backgroundPosition: "center",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <img
              src={post.imageSource}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
              }}
            />
          </div>
        )}
      </Box>
      <Typography variant="subtitle2" paragraph sx={{ marginTop: 2 }}>
        {post.publishedTime &&
          new Date(post.publishedTime).toLocaleDateString()}
      </Typography>
      <AdaptiveEditor value={post.content || ""} viewOnly={true} />
    </>
  );
};
