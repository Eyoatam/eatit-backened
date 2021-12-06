import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database";
import Food from "../models/food";

export async function GetFoods(req: Request, res: Response): Promise<void> {
  try {
    if (req.query.category && !req.query.price) {
      filterByCategory();
    } else if (req.query.category && req.query.price) {
      filterByCategoryAndPrice();
    } else if (req.query.price && !req.query.category) {
      filterByPrice();
    } else {
      const foods = await collections.foods.find({}).toArray();
      res.status(200).send(foods);
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }

  // Utility Functions

  async function filterByCategory() {
    let category = req.query.category as string;
    // capitalize the category ex: 'lunch' -> 'Lunch'
    category = category.charAt(0).toUpperCase() + category.slice(1);

    const query = {
      category,
    };
    const foodsWithCategory = await collections.foods.find(query).toArray();

    if (foodsWithCategory.length === 0) {
      res.status(500).json({
        message: `No food found with category ${category}`,
      });
    } else {
      res.status(200).send(foodsWithCategory);
    }
  }

  async function checkCategory() {
    let category = req.query.category as string;
    // capitalize the category ex: 'lunch' -> 'Lunch'
    category = category.charAt(0).toUpperCase() + category.slice(1);

    const query = {
      category,
    };
    const foodsWithCategory = await collections.foods.find(query).toArray();

    if (foodsWithCategory.length === 0) {
      return {
        message: `No food found with category ${category}`,
      };
    } else {
      return foodsWithCategory;
    }
  }

  async function filterByPrice() {
    // capitalize the category ex: 'lunch' -> 'Lunch'
    let price = req.query.price as string;
    price = price.charAt(0).toUpperCase() + price.slice(1);

    // declare variables to be used
    let query, foodsCollection;

    // filter foods by category and price
    switch (price) {
      case "Low": {
        query = { price: { $lt: 100 } };
        foodsCollection = await collections.foods.find(query).toArray();
        // check if there is no match
        if (foodsCollection.length === 0) {
          res.status(500).json({
            ok: false,
            message: `No Food Matches your search`,
          });
        } else {
          res.status(200).send(foodsCollection);
        }
        break;
      }
      case "Mid":
        query = { price: { $gt: 100, $lt: 300 } };
        foodsCollection = await collections.foods.find(query).toArray();
        // check if there is no match
        if (foodsCollection.length === 0) {
          res.status(500).json({
            ok: false,
            message: `No Food Matches your search`,
          });
        } else {
          res.status(200).send(foodsCollection);
        }
        break;
      case "High":
        query = { price: { $gt: 300, $lt: 500 } };
        foodsCollection = await collections.foods.find(query).toArray();
        // check if there is no match
        if (foodsCollection.length === 0) {
          res.status(500).json({
            ok: false,
            message: `No Food Matches your search`,
          });
        } else {
          res.status(200).send(foodsCollection);
        }
        break;
      default:
        break;
    }
  }

  async function filterByCategoryAndPrice() {
    // capitalize the price ranges
    let price = req.query.price as string;
    price = price.charAt(0).toUpperCase() + price.slice(1);

    // declare variables to be used
    let query, foodsCollection;

    // filter foods by category and price
    switch (price) {
      case "Low": {
        checkCategory();
        query = { price: { $lt: 100 } };
        foodsCollection = await collections.foods.find(query).toArray();
        // check if there is no match
        if (foodsCollection.length === 0) {
          res.status(500).json({
            ok: false,
            message: `No Food Matches your search`,
          });
        } else {
          res.status(200).send(foodsCollection);
        }
        break;
      }
      case "Mid":
        checkCategory();
        query = { price: { $gt: 100, $lt: 300 } };
        foodsCollection = await collections.foods.find(query).toArray();
        // check if there is no match
        if (foodsCollection.length === 0) {
          res.status(500).json({
            ok: false,
            message: `No Food Matches your search`,
          });
        } else {
          res.status(200).send(foodsCollection);
        }
        break;
      case "High":
        checkCategory();
        query = { price: { $gt: 300, $lt: 500 } };
        foodsCollection = await collections.foods.find(query).toArray();
        // check if there is no match
        if (foodsCollection.length === 0) {
          res.status(500).json({
            ok: false,
            message: `No Food Matches your search`,
          });
        } else {
          res.status(200).send(foodsCollection);
        }
        break;
      default:
        break;
    }
  }
}

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
