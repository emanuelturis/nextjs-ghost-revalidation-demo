import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.key !== process.env.REVALIDATE_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await res.unstable_revalidate("/");
    await res.unstable_revalidate("/posts/" + req.body.post.current.slug);
    return res.status(200).json({
      success: true,
      message: "Post and posts index were successfully revalidated.",
    });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
