import express from "express";
import db from "../config/db";

const router = express.Router();

// Get all hairstyles
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        hairstyle_id,
        service_id,
        hairstyle_name,
        description,
        estimated_price,
        estimated_duration_minutes,
        image_url,
        is_available
      FROM hairstyles
      WHERE is_available = 1
      ORDER BY hairstyle_id ASC
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching hairstyles:", error);
    res.status(500).json({
      message: "Failed to fetch hairstyles",
    });
  }
});

export default router;