import { ObjectId } from "mongodb";

interface Ingredients {
  name: string;
  // price per 1kg
  price: number;
}

type FoodCategory = "Breakfast" | "Lunch" | "Dinner";

export default class Food {
  constructor(
    public name: string,
    public price: number,
    public ingredients: Ingredients[],
    public procedures: string,
    public category: FoodCategory,
    public id?: ObjectId,
  ) {}
}
