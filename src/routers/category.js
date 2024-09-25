import { Router } from "express";
import { create, deleteCategoryById, getAll, getCategoryById, updateCategoryById } from "../controllers/category.js";

const Router_Category = Router();
Router_Category.post("/category", create)
Router_Category.get("/category", getAll)
Router_Category.get("/category/:id", getCategoryById)
Router_Category.delete("/category/:id", deleteCategoryById)
Router_Category.put("/category/:id", updateCategoryById)
export default Router_Category;