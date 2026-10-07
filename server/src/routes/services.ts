import express from "express";
import db from "../config/db";

const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const [services] = await db.query(
      "SELECT * FROM services WHERE is_available = TRUE"
    );

    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);

    res.status(500).json({
      message: "Failed to fetch services",
    });
  }
});

// GET one service by ID
router.get("/:id", async (req, res) => {
  try {
    const serviceId = Number(req.params.id);

    const [services] = await db.query(
      "SELECT * FROM services WHERE service_id = ?",
      [serviceId]
    );

    if ((services as any[]).length === 0) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json((services as any[])[0]);
  } catch (error) {
    console.error("Error fetching service:", error);

    res.status(500).json({
      message: "Failed to fetch service",
    });
  }
});

// CREATE a service
router.post("/", async (req, res) => {
  try {
    const {
      service_name,
      description,
      price,
      duration_minutes,
    } = req.body;

    if (!service_name || !price || !duration_minutes) {
      return res.status(400).json({
        message: "Service name, price and duration are required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO services
      (service_name, description, price, duration_minutes)
      VALUES (?, ?, ?, ?)`,
      [service_name, description, price, duration_minutes]
    );

    res.status(201).json({
      message: "Service created successfully",
      service_id: (result as any).insertId,
    });
  } catch (error) {
    console.error("Error creating service:", error);

    res.status(500).json({
      message: "Failed to create service",
    });
  }
});

// UPDATE a service
router.put("/:id", async (req, res) => {
  try {
    const serviceId = Number(req.params.id);

    const {
      service_name,
      description,
      price,
      duration_minutes,
      is_available,
    } = req.body;

    const [result] = await db.query(
      `UPDATE services
       SET service_name = ?,
           description = ?,
           price = ?,
           duration_minutes = ?,
           is_available = ?
       WHERE service_id = ?`,
      [
        service_name,
        description,
        price,
        duration_minutes,
        is_available,
        serviceId,
      ]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("Error updating service:", error);

    res.status(500).json({
      message: "Failed to update service",
    });
  }
});

// DELETE a service
router.delete("/:id", async (req, res) => {
  try {
    const serviceId = Number(req.params.id);

    const [result] = await db.query(
      "DELETE FROM services WHERE service_id = ?",
      [serviceId]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);

    res.status(500).json({
      message: "Failed to delete service",
    });
  }
});

export default router;