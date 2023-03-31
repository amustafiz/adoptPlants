import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      // console.log("reached here ", req.body);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddobaci06/image/upload/",
        {
          body: req.body,
          method: "POST",
        }
      );

      console.log("response here", await res.json());
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
}
