import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "services/database";
import { SharedFood } from "models/food";

import {
  filterByAll as filterSharedFoodsByAll,
  filterByCalorie as filterSharedFoodsByCalorie,
  filterByCategory as filterSharedFoodsByCategory,
  filterByCategoryAndPrice as filterSharedFoodsByCategoryAndPrice,
  filterByPrice as filterSharedFoodsByPrice,
} from "middlewares/filterSharedFoods";

export async function GetSharedFoods(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    if (req.query.category && !req.query.price) {
      const category = req.query.category as string;
      filterSharedFoodsByCategory(category, req, res);
    } else if (req.query.category && req.query.price && !req.query.calorie) {
      const category = req.query.category as string;
      const price = req.query.price as string;
      filterSharedFoodsByCategoryAndPrice(category, price, req, res);
    } else if (req.query.price && !req.query.category) {
      const price = req.query.price as string;
      filterSharedFoodsByPrice(price, req, res);
    } else if (req.query.calorie && !req.query.category && !req.query.price) {
      const calorie = req.query.calorie as string;
      filterSharedFoodsByCalorie(calorie, req, res);
    } else if (req.query.calorie && req.query.category && req.query.price) {
      const category = req.query.category as string;
      const price = req.query.price as string;
      const calorie = req.query.calorie as string;
      filterSharedFoodsByAll(category, price, calorie, req, res);
    } else {
      const foods = await collections.sharedFoods.find({}).toArray();
      res.status(200).send(foods);
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

export async function GetSharedFood(
  req: Request,
  res: Response,
): Promise<void> {
  const id = req?.params?.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.sharedFoods.findOne(query);

    if (result) {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      message: `Unable to find food with id: ${req.params.id}`,
    });
  }
}

// Add a Shared Food
export async function AddNewSharedFood(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const body = req.body as SharedFood;
    if (
      !(
        body.calorie ||
        body.category ||
        body.ingredients ||
        body.name ||
        body.price ||
        body.procedures
      )
    ) {
      res.status(500).json({
        ok: false,
        message: "All Fields Are Required",
      });
    }

    // TODO(@Eyoatam): #2 improve date assigning
    const date = new Date();
    const monday = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    const tuesday = new Date(date.setDate(date.getDate() - date.getDay() + 2));
    const wednesday = new Date(
      date.setDate(date.getDate() - date.getDay() + 3),
    );
    const thursday = new Date(date.setDate(date.getDate() - date.getDay() + 4));
    const friday = new Date(date.setDate(date.getDate() - date.getDay() + 5));
    const saturday = new Date(date.setDate(date.getDate() - date.getDay() + 6));
    const sunday = new Date(date.setDate(date.getDate() - date.getDay() + 7));

    const days = [
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    ];

    const randomDate = new Date(
      days[Math.floor(Math.random() * 7)].setDate(
        Math.floor(Math.random() * 7),
      ),
    );

    const newFood = { ...body, date: randomDate };

    const result = await collections.sharedFoods.insertOne(newFood);

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
export async function UpdateSharedFood(
  req: Request,
  res: Response,
): Promise<void> {
  const id = req?.params?.id;
  try {
    const updatedFood: SharedFood = req.body as SharedFood;
    const query = { _id: new ObjectId(id) };

    const result = await collections.sharedFoods.updateOne(query, {
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
export async function DeleteSharedFood(
  req: Request,
  res: Response,
): Promise<void> {
  const id = req?.params?.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.sharedFoods.deleteOne(query);

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
