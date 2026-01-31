import express from "express";
import { PurchaseController } from "./purchase.controller";

const router = express.Router();

// create
router.post("/addPurchase", PurchaseController.createPurchase);

// read
router.get("/getPurchases", PurchaseController.getAllPurchases);
router.get("/getPurchase/:id", PurchaseController.getSinglePurchase);

// update
router.patch("/updatePurchase/:id", PurchaseController.updatePurchase);

// delete
router.delete("/deletePurchase/:id", PurchaseController.deletePurchase);

export const PurchaseRoutes = router;
