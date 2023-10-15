import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query["bye"] === "1") {
    res.setDraftMode({ enable: false });
  } else {
    res.setDraftMode({ enable: true });
  }
  if (req.query["redirect"] && typeof req.query["redirect"] === "string") {
    res.redirect(req.query["redirect"]);
    return;
  }
  res.redirect("/");
}
