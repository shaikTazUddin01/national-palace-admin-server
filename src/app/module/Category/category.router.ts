import express from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();

// create
router.post("/addCategory", CategoryController.createCategory);

// read
router.get("/getCategories", CategoryController.getAllCategories);
router.get("/getCategory/:id", CategoryController.getSingleCategory);

// update
router.patch("/updateCategory/:id", CategoryController.updateCategory);

// delete
router.delete("/deleteCategory/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
