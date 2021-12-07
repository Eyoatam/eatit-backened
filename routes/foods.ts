import { Router } from "express";
import {
  AddNewFood,
  DeleteFood,
  GetFood,
  GetFoods,
  UpdateFood,
} from "../controllers/foodController";

export const foodsRouter = Router();

foodsRouter.get("/", GetFoods);
foodsRouter.get("/:id", GetFood);
foodsRouter.post("/", AddNewFood);
foodsRouter.put("/:id", UpdateFood);
foodsRouter.delete("/:id", DeleteFood);
