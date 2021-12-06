import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { foods?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  // load .env
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const foodsCollection: mongoDB.Collection = db.collection(
    process.env.DB_COLLECTION_NAME
  );

  collections.foods = foodsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${foodsCollection.collectionName}`
  );
}
