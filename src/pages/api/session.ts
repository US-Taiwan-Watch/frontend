import { NextApiRequest, NextApiResponse } from "next";
import { auth0 } from "../../lib/auth0";

export default async function session(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await auth0.getSession(req, res);
    session ? res.json(session) : res.status(404).end("Session not found");
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
