import express from "express";
import mysql from "mysql2/promise";
import db from "../databases/db";

const router = express.Router();

//create contents
router.get("/posts", async (req, res) => {
  try {
    const rows = await db.query(`SELECT * FROM posts`);
    res.json(rows);
  } catch (error) {
    console.log("error");
  }
});

export default router;
