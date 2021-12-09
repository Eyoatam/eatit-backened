import { Router } from "express";
import {
  AddNewSharedFood,
  DeleteSharedFood,
  GetSharedFood,
  GetSharedFoods,
  UpdateSharedFood,
} from "controllers/sharedFoodsController";

export const sharedFoodsRouter = Router();

sharedFoodsRouter.get("/", GetSharedFoods);
sharedFoodsRouter.get("/:id", GetSharedFood);
sharedFoodsRouter.post("/", AddNewSharedFood);
sharedFoodsRouter.put("/:id", UpdateSharedFood);
sharedFoodsRouter.delete("/:id", DeleteSharedFood);
