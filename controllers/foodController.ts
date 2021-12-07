import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database";
import Food from "../models/food";
import {
  filterByAll,
  filterByCalorie,
  filterByCategory,
  filterByCategoryAndPrice,
  filterByPrice,
} from "../middlewares/filterFoods";

// Get All Foods based on query
export async function GetFoods(req: Request, res: Response): Promise<void> {
  try {
    if (req.query.category && !req.query.price) {
      const category = req.query.category as string;
      filterByCategory(category, req, res);
    } else if (req.query.category && req.query.price && !req.query.calorie) {
      const category = req.query.category as string;
      const price = req.query.price as string;
      filterByCategoryAndPrice(category, price, req, res);
    } else if (req.query.price && !req.query.category) {
      const price = req.query.price as string;
      filterByPrice(price, req, res);
    } else if (req.query.calorie && !req.query.category && !req.query.price) {
      const calorie = req.query.calorie as string;
      filterByCalorie(calorie, req, res);
    } else if (req.query.calorie && req.query.category && req.query.price) {
      const category = req.query.category as string;
      const price = req.query.price as string;
      const calorie = req.query.calorie as string;
      filterByAll(category, price, calorie, req, res);
    } else {
      const foods = await collections.foods.find({}).toArray();
      res.status(200).send(foods);
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// Get a Single Food
export async function GetFood(req: Request, res: Response): Promise<void> {
  const id = req?.params?.id;
  try {
    const query = { _id: new ObjectId(id) };
    const food = await collections.foods.findOne(query);

    if (food) {
      res.status(200).send(food);
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      message: `Unable to find matching document with id: ${req.params.id}`,
    });
  }
}

// Add a Food
export async function AddNewFood(req: Request, res: Response): Promise<void> {
  try {
    const newFood = req.body as Food;
    const result = await collections.foods.insertOne(newFood);

    if (result) {
      res.status(201).json({
        ok: true,
        message: `Successfully created a new food with id ${result.insertedId}`,
      });
    } else {
      res.status(500).json({
        ok: false,
        message: "Failed to create a new Food.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
}

// Update Food
export async function UpdateFood(req: Request, res: Response): Promise<void> {
  const id = req?.params?.id;
  try {
    const updatedFood: Food = req.body as Food;
    const query = { _id: new ObjectId(id) };

    const result = await collections.foods.updateOne(query, {
      $set: updatedFood,
    });

    if (result) {
      res.status(200).json({
        ok: true,
        message: `Successfully updated food with id ${id}`,
      });
    } else {
      res.status(304).json({
        ok: false,
        message: `Failed to update food with id ${id}`,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
}

// Delete Food
export async function DeleteFood(req: Request, res: Response): Promise<void> {
  const id = req?.params?.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.foods.deleteOne(query);

    if (result && result.deletedCount) {
      res
        .status(202)
        .json({ ok: true, message: `Successfully removed Food with id ${id}` });
    } else if (!result) {
      res
        .status(400)
        .json({ ok: false, message: `Failed to remove Food with id ${id}` });
    } else if (!result.deletedCount) {
      res
        .status(404)
        .json({ ok: false, message: `food with id ${id} does not exist` });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ ok: false, message: error.message });
  }
}
