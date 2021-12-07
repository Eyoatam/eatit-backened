import { ObjectId } from "mongodb";

interface Ingredients {
  name: string;
  // price per 1kg
  price: number;
}

export type FoodCategory = "Breakfast" | "Lunch" | "Dinner";
export type Calorie = 500 | 1000 | 1500 | 2000 | 2500;
export type Price = "Low" | "Mid" | "High";

export default interface Food {
  name: string;
  price: Price;
  ingredients: Ingredients[];
  procedures: string;
  category: FoodCategory;
  calorie: Calorie;
  id?: ObjectId;
}
