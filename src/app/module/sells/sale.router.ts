import express from "express";
import { SaleController } from "./sale.controller";

const router = express.Router();

// create
router.post("/addSale", SaleController.createSale);

// read
router.get("/getSales", SaleController.getAllSales);
router.get("/getSale/:id", SaleController.getSingleSale);

// update
router.patch("/updateSale/:id", SaleController.updateSale);

// delete
router.delete("/deleteSale/:id", SaleController.deleteSale);

export const SaleRoutes = router;
