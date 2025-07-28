import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return; // ❗️Exit early
    }

    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);

    res.locals.user = decoded;
    next(); // ✅ continue to next middleware/handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
