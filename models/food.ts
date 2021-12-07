import { ObjectId } from "mongodb";

interface Ingredients {
  name: string;
  // price per 1kg
  price: number;
}

export type FoodCategory = "Breakfast" | "Lunch" | "Dinner";
export type Calorie = 500 | 1000 | 1500 | 2000 | 2500;
export type Price = "Low" | "Mid" | "High";

export default class Food {
  constructor(
    public name: string,
    public price: Price,
    public ingredients: Ingredients[],
    public procedures: string,
    public category: FoodCategory,
    public calorie: Calorie,
    public id?: ObjectId,
  ) {}
}
