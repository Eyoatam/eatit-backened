import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: {
  foods?: mongoDB.Collection;
  users?: mongoDB.Collection;
  sharedFoods?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
  // load .env
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING,
  );

  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const foodsCollection: mongoDB.Collection = db.collection(
    process.env.FOODS_COLLECTION_NAME,
  );

  collections.foods = foodsCollection;

  const usersCollection: mongoDB.Collection = db.collection(
    process.env.USERS_COLLECTION_NAME,
  );

  collections.users = usersCollection;

  const sharedFoodsCollection: mongoDB.Collection = db.collection(
    process.env.SHARED_FOODS_COLLECTION_NAME,
  );

  collections.sharedFoods = sharedFoodsCollection;

  console.log(`Successfully connected to database: ${db.databaseName}`);
}
