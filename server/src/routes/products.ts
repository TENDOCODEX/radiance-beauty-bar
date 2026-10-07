import express from "express";
import db from "../config/db";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products WHERE is_available = TRUE"
    );

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// GET one product
router.get("/:id", async (req, res) => {
  try {
    const productId = Number(req.params.id);

    const [products] = await db.query(
      "SELECT * FROM products WHERE product_id = ?",
      [productId]
    );

    if ((products as any[]).length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json((products as any[])[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

// CREATE product
router.post("/", async (req, res) => {
  try {
    const {
      product_name,
      description,
      price,
      stock_quantity,
      image_url,
      category,
    } = req.body;

    if (!product_name || price === undefined || stock_quantity === undefined) {
      return res.status(400).json({
        message: "Product name, price and stock quantity are required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO products
      (product_name, description, price, stock_quantity, image_url, category)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        product_name,
        description,
        price,
        stock_quantity,
        image_url,
        category,
      ]
    );

    res.status(201).json({
      message: "Product created successfully",
      product_id: (result as any).insertId,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const productId = Number(req.params.id);

    const {
      product_name,
      description,
      price,
      stock_quantity,
      image_url,
      category,
      is_available,
    } = req.body;

    const [result] = await db.query(
      `UPDATE products
       SET product_name = ?,
           description = ?,
           price = ?,
           stock_quantity = ?,
           image_url = ?,
           category = ?,
           is_available = ?
       WHERE product_id = ?`,
      [
        product_name,
        description,
        price,
        stock_quantity,
        image_url,
        category,
        is_available,
        productId,
      ]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const productId = Number(req.params.id);

    const [result] = await db.query(
      "DELETE FROM products WHERE product_id = ?",
      [productId]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;