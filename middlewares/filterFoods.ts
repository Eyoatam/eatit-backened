import { NextFunction, Request, Response } from "express";
import { collections } from "../services/database";
import { FoodCategory, Price } from "../models/food";

export async function filterByCalorie(
  calorie: string,
  _req: Request,
  res: Response,
  _next?: NextFunction,
) {
  // convert calorie to number
  const query = { calorie: parseInt(calorie) };
  const foodsCollection = await collections.foods.find(query).toArray();
  if (foodsCollection.length === 0) {
    res.status(500).json({
      message: `No food found with calorie amount ${calorie}`,
    });
  } else {
    res.status(200).send(foodsCollection);
  }
}

export async function filterByCategory(
  category: string,
  _req: Request,
  res: Response,
  _next?: NextFunction,
) {
  // capitalize the category ex: 'lunch' -> 'Lunch'
  category = (category as FoodCategory).charAt(0).toUpperCase() +
    category.slice(1);

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

export async function filterByPrice(
  price: string,
  _req: Request,
  res: Response,
  _next?: NextFunction,
) {
  // capitalize the category ex: 'low' -> 'Low'
  price = (price as Price).charAt(0).toUpperCase() + price.slice(1);

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

export async function filterByAll(
  category: string,
  price: string,
  calorie: string,
  _req: Request,
  res: Response,
  _next?: NextFunction,
) {
  // capitalize the price and category fields in query
  // let price = req.query.price as string;
  price = price.charAt(0).toUpperCase() + price.slice(1);

  // let category = req.query.category as string;
  category = category.charAt(0).toUpperCase() + category.slice(1);

  // convert calorie to Number
  // const calorie = req.query.calorie as string;
  const convertedCalorie = parseInt(calorie);

  // declare variables to be used
  let query, foodsCollection;

  // filter foods by category and price
  switch (price) {
    case "Low":
      // const filteredFood = checkCategory();
      query = {
        price: { $lt: 100 },
        category: category,
        calorie: convertedCalorie,
      };
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

    case "Mid":
      query = {
        price: { $gt: 100, $lt: 300 },
        category: category,
        calorie: convertedCalorie,
      };
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
      query = {
        price: { $gt: 300, $lt: 500 },
        category: category,
        calorie: convertedCalorie,
      };
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

export async function filterByCategoryAndPrice(
  category: string,
  price: string,
  _req: Request,
  res: Response,
  _next?: NextFunction,
) {
  // capitalize the price and category fields in query
  price = price.charAt(0).toUpperCase() + price.slice(1);

  category = category.charAt(0).toUpperCase() + category.slice(1);

  // declare variables to be used
  let query, foodsCollection;

  // filter foods by category and price
  switch (price) {
    case "Low":
      // const filteredFood = checkCategory();
      query = { price: { $lt: 100 }, category: category };
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

    case "Mid":
      query = { price: { $gt: 100, $lt: 300 }, category: category };
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
      query = { price: { $gt: 300, $lt: 500 }, category: category };
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
