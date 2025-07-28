import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../databases/db";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/auth";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "username and password required" });
  }
  const user: any = await db.query(
    `SELECT * FROM users WHERE username = ? LIMIT 1;`,
    username
  );
  if (user) {
    if (await bcrypt.compare(password, user[0].password)) {
      if (process.env.JWT_SECRET) {
        console.log("...");
        const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
        console.log(token);
        return res.json({ token, user });
      }
    }
  }
  res.status(401).json({ msg: "incorrect username or password" });
});

router.get("/verify", auth, async (req, res) => {
  const user = res.locals.user;
  res.json(user);
});

router.get("/users", async (req, res) => {
  try {
    // const data = await db.query(
    //   `SELECT u.*,p.* FROM users u LEFT JOIN posts p ON u.Id = p.userId`
    // );
    const data = await db.query(`SELECT * FROM users`);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      `SELECT u.*, p.* FROM users u LEFT JOIN posts p ON u.id = p.userId WHERE u.id = ?;`,
      id
    );
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/users", async (req: Request, res: Response) => {
  const { name, username, bio, password } = req.body;
  if (!name || !username || !password) {
    res.status(400).json({ msg: "name, username and password required" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await db.query(`INSERT INTO users SET ?`, {
    name,
    username,
    bio,
    password: hash,
  });
  res.json(user);
});

export default router;
