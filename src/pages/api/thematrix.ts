import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query["bye"] === "1") {
    res.setDraftMode({ enable: false });
    res.redirect("/");
    return;
  }
  res.setDraftMode({ enable: true });
  res.redirect("/");
}
