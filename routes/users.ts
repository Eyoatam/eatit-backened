import { Router } from "express";
import { login, register } from "../controllers/auth/userController";

export const usersRouter = Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
