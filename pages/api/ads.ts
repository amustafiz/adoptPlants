import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, FindCursor, ObjectId } from "mongodb";
import { generateFakeAdds } from "@/dataGenerator";
import { Ad, Sunlight, Cycle, Water } from "@/types";
//1
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

      try {
        let result;

        if (query.id) {
          console.log("here");
          result = await getOneAd(query.id.toString());
        } else {
          console.log("here");
          result = (await listAds(query)) || []; // use a default empty array value
        }

        return res.status(200).json({
          message: result,
        });
      } catch (error) {
        return res.status(500).end();
      }
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

    const insertedAd = await collection.insertOne(ad);

    client.close();
    return insertedAd;
  } catch (error) {
    const errorMessage = "failed to post ad";
    console.log(errorMessage, { error });
    throw new Error("failed");
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

export async function getOneAd(id: string) {
  {
    try {
      const client = await connectToDatabase();

      const db = client.db("plantsDatabase");
      const collection: Collection<Ad> = db.collection("ads");

      const objectId = new ObjectId(id);
      const cursor: FindCursor = collection.find({ _id: objectId });
      const ad = await cursor.toArray();

      const results = ad.map((a) => {
        return {
          ...a,
          _id: a._id!.toString(),
        };
      });

      return results[0];
    } catch (error) {
      const errorMessage = "failed to list ads";
      console.log(errorMessage, { error });
    }
  }
}
