import { Router } from "express";
import {
  GetFood,
  GetFoods,
  AddNewFood,
  UpdateFood,
  DeleteFood,
} from "../controllers/foodController";

export const foodsRouter = Router();

foodsRouter.get("/", GetFoods);
foodsRouter.get("/:id", GetFood);
foodsRouter.post("/", AddNewFood);
foodsRouter.put("/:id", UpdateFood);
foodsRouter.delete("/:id", DeleteFood);
