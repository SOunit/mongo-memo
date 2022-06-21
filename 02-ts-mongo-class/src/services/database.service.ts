import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Game from "../models/game";

class DatabaseService {
  private static instance: DatabaseService;
  collections: { games?: mongoDB.Collection<Game> } = {};

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async connectToDatabase() {
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();
    const db = client.db(process.env.DB_NAME);

    await this.applySchemaValidation(db);

    const gamesCollection = db.collection<Game>(
      process.env.GAMES_COLLECTION_NAME!
    );

    this.collections.games = gamesCollection;

    console.log(
      `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`
    );
  }

  private async applySchemaValidation(db: mongoDB.Db) {
    const jsonSchema = {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "price", "category"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: {
            bsonType: "string",
            description: "'name' is required and is a string",
          },
          price: {
            bsonType: "number",
            description: "'price' is required and is a number",
          },
          category: {
            bsonType: "string",
            description: "'category' is required and is a string",
          },
        },
      },
    };

    await db
      .command({
        collMod: process.env.GAMES_COLLECTION_NAME,
        validator: jsonSchema,
      })
      .catch(async (error: mongoDB.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
          await db.createCollection(process.env.GAMES_COLLECTION_NAME!, {
            validator: jsonSchema,
          });
        }
      });
  }
}

export default DatabaseService;
