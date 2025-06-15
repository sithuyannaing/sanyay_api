import express from "express";
import bcrypt from "bcrypt";
import db from "../databases/db";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const data = await db.query(
      `SELECT u.*,p.* FROM users u LEFT JOIN posts p ON u.Id = p.userId`
    );
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

router.post("/users", async (req, res) => {
  const { name, username, bio, password } = req.body;
  if (!name || !username || !bio || !password) {
    res.status(400).json({ msg: "name, username, bio, password are required" });
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
