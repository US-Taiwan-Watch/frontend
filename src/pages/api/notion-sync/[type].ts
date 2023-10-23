import { NextApiRequest, NextApiResponse } from "next";
import { NotionSyncType } from "../../../generated/graphql-types";
import { initApolloClient } from "../../../lib/with-apollo";
import { SyncFromNotionDocument } from "../../../lib/page-graphql/mutation-sync-from-notion.graphql.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const type = (req.query["type"] as string).toUpperCase() as NotionSyncType;
    const apolloClient = initApolloClient();
    const response = await apolloClient.mutate({
      mutation: SyncFromNotionDocument,
      variables: { type },
      fetchPolicy: "network-only",
    });
    if (response.data) {
      res.redirect("/analysis");
    }
  } catch (err) {
    res.status(500).send("Sync failed\n" + err);
  }
}
