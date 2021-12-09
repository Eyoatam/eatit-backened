import { ObjectId } from "mongodb";

export interface Ingredients {
  name: string;
  // price per 1kg
  price: number;
  // amount in grams
  amount: number;
  foodGroup: FoodGroup[];
}

export type FoodGroup =
  | "Carbohydrate"
  | "Fat"
  | "Dietary Fiber"
  | "Mineral"
  | "Protein"
  | "Vitamin"
  | "Water";
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
  date: string;
  imageUrl: string;
  id?: ObjectId;
}

export interface SharedFood {
  name: string;
  price: Price;
  ingredients: Ingredients[];
  procedures: string;
  category: FoodCategory;
  calorie: Calorie;
  date: string;
  imageUrl: string;
  createdBy: string;
  createdFor: string;
  receiversPhoneNumber: number;
  id?: ObjectId;
}
