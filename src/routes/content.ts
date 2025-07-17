import express from "express";
import db from "../databases/db";

const router = express.Router();

//create contents
router.get("/posts", async (req, res) => {
  try {
    const rows = await db.query(
      `
      SELECT p.*, u.name, u.username, u.bio, c.content FROM posts p LEFT JOIN users u ON p.user_id = u.user_id LEFT JOIN comments c ON p.post_id = c.post_id ORDER BY p.post_id DESC LIMIT 20;
      `
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      `
      SELECT p.*, u.*,c.content FROM posts p LEFT JOIN users u ON p.user_id = u.user_id LEFT JOIN comments c ON p.post_id = c.post_id WHERE p.post_id = ?;
      `,
      id
    );
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
