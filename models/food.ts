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

// https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGdyZWVuJTIwc2FsYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60
// https://images.unsplash.com/photo-1604909052743-94e838986d24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlzaCUyMHNhbGFkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60
