import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { collections } from "../../services/database";

export async function register(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  try {
    const { name, email, age, password } = req.body;
    if (!(name && email && password && age)) {
      res.status(400).json({
        ok: false,
        message: "All Fields Are Required",
      });
    }

    const oldUser = await collections.users.findOne({ email });
    if (oldUser) {
      res.status(409).json({
        ok: false,
        message: "User already exists, login instead",
      });
    }
    const hashedPassword = await hash(password, 10);

    const result = await collections.users.insertOne({
      name,
      email: (email as string).toLowerCase(),
      age,
      password: hashedPassword,
    });

    const token = sign({ user_id: result, email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    const usersCollection = await collections.users.findOne({
      _id: result.insertedId,
    });

    res.status(200).json({
      ...usersCollection,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function login(req: Request, res: Response, _next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({
        ok: false,
        message: "All fields are required",
      });
    }

    const user = await collections.users.findOne({ email });
    const comparedPassword = await compare(password, user.password);
    if (user && comparedPassword) {
      const token = sign({ user_id: user._id, email }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({
        ok: true,
        message: "successfully logged in",
        token,
      });
    } else {
      res.status(400).json({
        ok: false,
        message: "Wrong Credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
