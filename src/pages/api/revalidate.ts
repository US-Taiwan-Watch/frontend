import { NextApiRequest, NextApiResponse } from "next"
import { Auth0RoleName } from "../../generated/graphql-types";
import { createApolloClient } from "../../lib/apollo-client";
import { auth0 } from "../../lib/auth0";
import { UserRolesDocument } from "../../lib/page-graphql/query-user-roles.graphql.interface";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = await auth0.getSession(req, res)?.idToken;
    const apolloClient = createApolloClient({
      authorization: `Bearer ${token}`,
    });
    const rolesRes = await apolloClient.query({
      query: UserRolesDocument,
      fetchPolicy: "network-only",
    });
    if (!rolesRes.data.myRoles?.includes(Auth0RoleName.Editor)) {
      throw 'Not an editor';
    }
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  console.log('Revalidate!');
  if (typeof req.query.path !== 'string') {
    return res.status(400).json({ message: 'No path specified' });
  }
  const paths = ['zh', 'en'].map(lang => `/${lang}${req.query.path}`);

  const results = await Promise.allSettled(paths.map(path => res.revalidate(path)));
  if (results.every(r => r.status === 'fulfilled')) {
    return res.json({ revalidated: true });
  }
  // If there was an error, Next.js will continue
  // to show the last successfully generated page
  return res.status(500).send('Error revalidating');
}