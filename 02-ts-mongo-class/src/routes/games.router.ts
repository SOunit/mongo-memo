import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import DatabaseService from "../services/database.service";

export const gamesRouter = express.Router();

gamesRouter.use(express.json());

gamesRouter.get("/", async (_req: Request, res: Response) => {
  try {
    // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as Game array to take advantage of types
    // FIXME: add ! to games, ok?
    const games = await DatabaseService.getInstance()
      .collections.games!.find({})
      .toArray();

    res.status(200).send(games);
    // FIXME: add type to error
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Example route: http://localhost:8080/games/610aaf458025d42e7ca9fcd0
gamesRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    // _id in MongoDB is an objectID type so we need to find our specific document by querying
    const query = { _id: new ObjectId(id) };
    // FIXME: add ! to games, ok?
    const game = await DatabaseService.getInstance().collections.games!.findOne(
      query
    );

    if (game) {
      res.status(200).send(game);
    }
    // FIXME: add type to error
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

gamesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newGame = req.body;
    // FIXME: add ! to games, ok?
    const result =
      await DatabaseService.getInstance().collections.games!.insertOne(newGame);

    result
      ? res
          .status(201)
          .send(`Successfully created a new game with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new game.");
    // FIXME: add type to error
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

gamesRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedGame = req.body;
    const query = { _id: new ObjectId(id) };
    // $set adds or updates all fields
    // FIXME: add ! to games, ok?
    const result =
      await DatabaseService.getInstance().collections.games!.updateOne(query, {
        $set: updatedGame,
      });

    result
      ? res.status(200).send(`Successfully updated game with id ${id}`)
      : res.status(304).send(`Game with id: ${id} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

gamesRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result =
      await DatabaseService.getInstance().collections.games!.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed game with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove game with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Game with id ${id} does not exist`);
    }
    // FIXME: add type to error
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
