// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";
import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  } else if (req.method == "PUT") {
    const { comment, userId } = req.body;
    const { id }: any = req.query;

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          _key: uuid(),
          postedBy: { _type: "postedBy", _ref: userId },
        },
      ])
      .commit();

    res.status(200).send(data);
  }
}
