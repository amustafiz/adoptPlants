import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, FindCursor } from "mongodb";
import { generateFakeAdds } from "@/dataGenerator";
import { Ad, Sunlight, Cycle, Water } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      // TODO - schema validation
      const { generate } = req.body;

      if (generate) {
        await generateFakeAdds();
      } else {
        await postAd(req.body);
      }

      res.status(201).end();
    } else if (req.method === "GET") {
      const { query } = req;

      const result = await listAds(query);

      res.status(200).json({
        message: result,
      });
    }
  } catch (error) {
    res.status(500).end();
  }
}

export async function postAd(ad: Ad) {
  try {
    const client = await connectToDatabase();
    const db = client.db("plantsDatabase");

    const collection: Collection<Ad> = db.collection("ads");

    const insertedAd = collection.insertOne(ad);
    client.close();
    return insertedAd;
  } catch (error) {
    const errorMessage = "failed to post ad";
    console.log(errorMessage, { error });
  }
}

export async function listAds(
  query: {
    watering?: keyof typeof Water;
    cycle?: keyof typeof Cycle;
    sunlight?: keyof typeof Sunlight;
  } = {}
) {
  try {
    const client = await connectToDatabase();

    const db = client.db("plantsDatabase");
    const collection: Collection<Ad> = db.collection("ads");

    const { watering, cycle, sunlight } = query;

    const filters = {
      ...(watering && { watering }),
      ...(cycle && { cycle }),
      ...(sunlight && { sunlight }),
    };

    const cursor: FindCursor = collection.find(filters);
    const ads: Ad[] = await cursor.toArray();

    const results = ads.map((ad) => {
      return {
        ...ad,
        _id: ad._id!.toString(),
      };
    });
    client.close();
    return results;
  } catch (error) {
    const errorMessage = "failed to list ads";
    console.log(errorMessage, { error });
  }
}
