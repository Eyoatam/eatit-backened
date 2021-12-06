"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFood = exports.UpdateFood = exports.AddNewFood = exports.GetFood = exports.GetFoods = void 0;
var mongodb_1 = require("mongodb");
var database_1 = require("../services/database");
function GetFoods(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function filterByCategory() {
            return __awaiter(this, void 0, void 0, function () {
                var category, query, foodsWithCategory;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            category = req.query.category;
                            // capitalize the category ex: 'lunch' -> 'Lunch'
                            category = category.charAt(0).toUpperCase() + category.slice(1);
                            query = {
                                category: category,
                            };
                            return [4 /*yield*/, database_1.collections.foods.find(query).toArray()];
                        case 1:
                            foodsWithCategory = _a.sent();
                            if (foodsWithCategory.length === 0) {
                                res.status(500).json({
                                    message: "No food found with category ".concat(category),
                                });
                            }
                            else {
                                res.status(200).send(foodsWithCategory);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        function filterByCategoryAndPrice() {
            return __awaiter(this, void 0, void 0, function () {
                var query, foodsCollection, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = req.query.price;
                            switch (_a) {
                                case "Low": return [3 /*break*/, 1];
                                case "Mid": return [3 /*break*/, 3];
                                case "High": return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 1:
                            filterByCategory();
                            query = { price: { $lt: 100 } };
                            return [4 /*yield*/, database_1.collections.foods.find(query).toArray()];
                        case 2:
                            foodsCollection = _b.sent();
                            res.status(200).send(foodsCollection);
                            return [3 /*break*/, 8];
                        case 3:
                            filterByCategory();
                            query = { price: { $gt: 100, $lt: 300 } };
                            return [4 /*yield*/, database_1.collections.foods.find(query).toArray()];
                        case 4:
                            foodsCollection = _b.sent();
                            res.status(200).send(foodsCollection);
                            return [3 /*break*/, 8];
                        case 5:
                            filterByCategory();
                            query = { price: { $gt: 300, $lt: 500 } };
                            return [4 /*yield*/, database_1.collections.foods.find(query).toArray()];
                        case 6:
                            foodsCollection = _b.sent();
                            res.status(200).send(foodsCollection);
                            return [3 /*break*/, 8];
                        case 7: return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        }
        var foods, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(req.query.category && !req.query.price)) return [3 /*break*/, 1];
                    filterByCategory();
                    return [3 /*break*/, 4];
                case 1:
                    if (!(req.query.category && req.query.price)) return [3 /*break*/, 2];
                    filterByCategoryAndPrice();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, database_1.collections.foods.find({}).toArray()];
                case 3:
                    foods = _a.sent();
                    res.status(200).send(foods);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    res.status(500).json({ ok: false, message: error_1.message });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.GetFoods = GetFoods;
function GetFood(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, query, food, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    query = { _id: new mongodb_1.ObjectId(id) };
                    return [4 /*yield*/, database_1.collections.foods.findOne(query)];
                case 2:
                    food = _b.sent();
                    if (food) {
                        res.status(200).send(food);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    res.status(404).json({
                        ok: false,
                        message: "Unable to find matching document with id: ".concat(req.params.id),
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GetFood = GetFood;
function AddNewFood(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newFood, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    newFood = req.body;
                    return [4 /*yield*/, database_1.collections.foods.insertOne(newFood)];
                case 1:
                    result = _a.sent();
                    if (result) {
                        res.status(201).json({
                            ok: true,
                            message: "Successfully created a new food with id ".concat(result.insertedId),
                        });
                    }
                    else {
                        res.status(500).json({
                            ok: false,
                            message: "Failed to create a new Food.",
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    res.status(400).send(error_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.AddNewFood = AddNewFood;
function UpdateFood(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, updatedFood, query, result, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    updatedFood = req.body;
                    query = { _id: new mongodb_1.ObjectId(id) };
                    return [4 /*yield*/, database_1.collections.foods.updateOne(query, {
                            $set: updatedFood,
                        })];
                case 2:
                    result = _b.sent();
                    if (result) {
                        res.status(200).json({
                            ok: true,
                            message: "Successfully updated food with id ".concat(id),
                        });
                    }
                    else {
                        res.status(304).json({
                            ok: false,
                            message: "Failed to update food with id ".concat(id),
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    console.log(error_4.message);
                    res.status(400).json({
                        ok: false,
                        message: error_4.message,
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.UpdateFood = UpdateFood;
function DeleteFood(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, query, result, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    query = { _id: new mongodb_1.ObjectId(id) };
                    return [4 /*yield*/, database_1.collections.foods.deleteOne(query)];
                case 2:
                    result = _b.sent();
                    if (result && result.deletedCount) {
                        res
                            .status(202)
                            .json({ ok: true, message: "Successfully removed Food with id ".concat(id) });
                    }
                    else if (!result) {
                        res
                            .status(400)
                            .json({ ok: false, message: "Failed to remove Food with id ".concat(id) });
                    }
                    else if (!result.deletedCount) {
                        res
                            .status(404)
                            .json({ ok: false, message: "food with id ".concat(id, " does not exist") });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    console.error(error_5.message);
                    res.status(400).json({ ok: false, message: error_5.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.DeleteFood = DeleteFood;
//# sourceMappingURL=foodController.js.map