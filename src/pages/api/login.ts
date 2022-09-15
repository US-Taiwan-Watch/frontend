import { NextApiRequest, NextApiResponse } from "next";
import { auth0 } from "../../lib/auth0";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    let options;
    if (typeof req.query.callback === 'string') {
      options = { returnTo: req.query.callback };
    }
    await auth0.handleLogin(req, res, options);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
