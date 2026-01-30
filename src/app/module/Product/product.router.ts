import { Router } from "express";
import { ProductController } from "./product.controller";
import { auth } from "../../middleware/auth";
import { TUser_Role } from "../Auth/auth.interface";

const router = Router();

// create product
router.post(
  "/addProduct",
  auth(TUser_Role.ADMIN),
  ProductController.addProduct,
);

// get all products
router.get(
  "/getProducts",
  auth(TUser_Role.ADMIN),
  ProductController.getAllProduct,
);

// get single product
router.get(
  "/getProduct/:id",
  auth(TUser_Role.ADMIN),
  ProductController.getSingleProduct,
);
router.patch("/updateProduct/:id", auth(TUser_Role.ADMIN), ProductController.updateProduct);
router.delete("/deleteProduct/:id", auth(TUser_Role.ADMIN), ProductController.deleteProduct);

export const ProductRouter = router;
