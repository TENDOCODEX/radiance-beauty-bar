import express from "express";
import cors from "cors";
import db from "./config/db";
import servicesRouter from "./routes/services";
import productsRouter from "./routes/products";
import hairstylesRouter from "./routes/hairstyle";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Radiance Beauty Bar API ✨",
  });
});

app.use("/api/services", servicesRouter);
app.use("/api/products", productsRouter);
app.use("/api/hairstyles", hairstylesRouter);

// Test MySQL connection
db.getConnection()
  .then((connection: any) => {
    console.log("✅ MySQL connected successfully!");
    connection.release();
  })
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ MySQL connection failed:", message);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});