import { NextApiRequest, NextApiResponse } from "next";
import { auth0 } from "../../lib/auth0";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let options;
    if (typeof req.query.callback === 'string') {
      options = { returnTo: req.query.callback };
    }
    await auth0.handleLogout(req, res, options);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
