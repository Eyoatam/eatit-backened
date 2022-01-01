import { NextFunction, Request, Response } from "express";
import { collections } from "services/database";
import { FoodCategory, Price } from "models/food";

export async function filterByCalorie(
  calorie: string,
  _req: Request,
  res: Response,
  _next?: NextFunction
) {
  // convert calorie to number
  const query = { calorie: parseInt(calorie) };
  const result = await collections.sharedFoods.find(query).toArray();
  if (result.length === 0) {
    res.status(500).json({
      message: `No food found with calorie amount ${calorie}`,
    });
  } else {
    res.status(200).send(result);
  }
}

export async function filterByCategory(
  category: string,
  _req: Request,
  res: Response,
  _next?: NextFunction
) {
  // capitalize the category ex: 'lunch' -> 'Lunch'
  category =
    (category as FoodCategory).charAt(0).toUpperCase() + category.slice(1);

  const query = {
    category,
  };
  const result = await collections.sharedFoods.find(query).toArray();

  if (result.length === 0) {
    res.status(500).json({
      message: `No food found with category ${category}`,
    });
  } else {
    res.status(200).send(result);
  }
}

export async function filterByPrice(
  price: string,
  _req: Request,
  res: Response,
  _next?: NextFunction
) {
  // capitalize the category ex: 'low' -> 'Low'
  price = (price as Price).charAt(0).toUpperCase() + price.slice(1);

  // filter foods by category and price
  switch (price) {
    case "Low": {
      const query = { price: { $lt: 100 } };
      const result = await collections.sharedFoods.find(query).toArray();
      // check if there is no match
      if (result.length === 0) {
        res.status(500).json({
          ok: false,
          message: `No Food Matches your search`,
        });
      } else {
        res.status(200).send(result);
      }
      break;
    }
    case "Mid": {
      const query = { price: { $gt: 100, $lt: 300 } };
      const result = await collections.sharedFoods.find(query).toArray();
      // check if there is no match
      if (result.length === 0) {
        res.status(500).json({
          ok: false,
          message: `No Food Matches your search`,
        });
      } else {
        res.status(200).send(result);
      }
      break;
    }
    case "High": {
      const query = { price: { $gt: 300, $lt: 500 } };
      const result = await collections.sharedFoods.find(query).toArray();
      // check if there is no match
      if (result.length === 0) {
        res.status(500).json({
          ok: false,
          message: `No Food Matches your search`,
        });
      } else {
        res.status(200).send(result);
      }
      break;
    }
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
  _next?: NextFunction
) {
  // capitalize the price and category fields in query
  price = price.charAt(0).toUpperCase() + price.slice(1);

  category = category.charAt(0).toUpperCase() + category.slice(1);

  // convert calorie to Number
  const convertedCalorie = parseInt(calorie);

  // filter foods by category and price
  switch (price) {
    case "Low": {
      // const filteredFood = checkCategory();
      const query = {
        price: { $lt: 100 },
        category: category,
        calorie: convertedCalorie,
      };
      const result = await collections.sharedFoods.find(query).toArray();
      // check if there is no match
      if (result.length === 0) {
        res.status(500).json({
          ok: false,
          message: `No Food Matches your search`,
        });
      } else {
        res.status(200).send(result);
      }
      break;
    }

    case "Mid": {
      const query = {
        price: { $gt: 100, $lt: 300 },
        category: category,
        calorie: convertedCalorie,
      };
      const result = await collections.sharedFoods.find(query).toArray();
      // check if there is no match
      if (result.length === 0) {
        res.status(500).json({
          ok: false,
          message: `No Food Matches your search`,
        });
      } else {
        res.status(200).send(result);
      }
      break;
    }
    case "High": {
      const query = {
        price: { $gt: 300, $lt: 500 },
        category: category,
        calorie: convertedCalorie,
      };
      const result = await collections.sharedFoods.find(query).toArray();
      // check if there is no match
      if (result.length === 0) {
        res.status(500).json({
          ok: false,
          message: `No Food Matches your search`,
        });
      } else {
        res.status(200).send(result);
      }
      break;
    }
    default:
      break;
  }
}

export async function filterByCategoryAndPrice(
  category: string,
  price: string,
  _req: Request,
  res: Response,
  _next?: NextFunction
) {
  // capitalize the price and category fields in query
  price = price.charAt(0).toUpperCase() + price.slice(1);

  category = category.charAt(0).toUpperCase() + category.slice(1);

  // filter foods by category and price
  switch (price) {
    case "Low": {
      const query = { price: { $lt: 100 }, category: category };
      const result = await collections.sharedFoods.find(query).toArray();
      // check if there is no match
      if (result.length === 0) {
        res.status(500).json({
          ok: false,
          message: `No Food Matches your search`,
        });
      } else {
        res.status(200).send(result);
      }
      break;
    }

    case "Mid": {
      const query = { price: { $gt: 100, $lt: 300 }, category: category };
      const result = await collections.sharedFoods.find(query).toArray();
      // check if there is no match
      if (result.length === 0) {
        res.status(500).json({
          ok: false,
          message: `No Food Matches your search`,
        });
      } else {
        res.status(200).send(result);
      }
      break;
    }
    case "High": {
      const query = { price: { $gt: 300, $lt: 500 }, category: category };
      const result = await collections.sharedFoods.find(query).toArray();
      // check if there is no match
      if (result.length === 0) {
        res.status(500).json({
          ok: false,
          message: `No Food Matches your search`,
        });
      } else {
        res.status(200).send(result);
      }
      break;
    }
    default:
      break;
  }
}
