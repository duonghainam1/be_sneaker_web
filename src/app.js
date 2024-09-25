import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { connectDB } from "./config/db.js";

import authRouter from "./routers/auth.js";
import cartRouter from "./routers/cart.js";
import productRouter from "./routers/product.js";
import categoryRouter from "./routers/category.js";
import attributeRouter from "./routers/attribute.js";
import Router_order from "./routers/order.js";


const app = express();
dotenv.config();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect db
connectDB(process.env.DB_URI);

// routers
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", attributeRouter);
app.use("/api/v1", Router_order)

// export const viteNodeApp = app;

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
