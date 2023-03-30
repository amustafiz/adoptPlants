/*
connect to db instance 

*/

import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client: MongoClient = await MongoClient.connect(process.env.MONGO_URI!);

  return client;
}
