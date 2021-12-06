"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodsRouter = void 0;
var express_1 = require("express");
var foodController_1 = require("../controllers/foodController");
exports.foodsRouter = (0, express_1.Router)();
exports.foodsRouter.get("/", foodController_1.GetFoods);
exports.foodsRouter.get("/:id", foodController_1.GetFood);
exports.foodsRouter.post("/", foodController_1.AddNewFood);
exports.foodsRouter.put("/:id", foodController_1.UpdateFood);
exports.foodsRouter.delete("/:id", foodController_1.DeleteFood);
//# sourceMappingURL=foods.js.map