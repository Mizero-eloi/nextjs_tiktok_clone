// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { singleUserQuery, userCreatedPostsQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";
import { userLikedPostsQuery } from "./../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const query = singleUserQuery(id);

    const user = await client.fetch(query);
    const userVideosQuery = userCreatedPostsQuery(id);
    const userLikedVideosQuery = userLikedPostsQuery(id);

    const userVideos = await client.fetch(userVideosQuery);
    const userLikedVideos = await client.fetch(userLikedVideosQuery);

    res.status(200).json({
      user: user[0],
      userVideos,
      userLikedVideos,
    });
  }
}
