import express from "express";
import mysql from "mysql2/promise";
import db from "../databases/db";

const router = express.Router();

//create contents
router.get("/posts", async (req, res) => {
  try {
    const rows = await db.query(
      `
      SELECT p.*,u.* FROM posts p LEFT JOIN users u ON p.userId = u.id ORDER BY p.id DESC LIMIT 20;
      `
    );
    res.json(rows);
  } catch (error) {
    console.log("error");
  }
});

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      `
      SELECT p.*, u.* FROM posts p LEFT JOIN users u ON p.userId = u.id WHERE p.id = ?;
      `,
      id
    );
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
