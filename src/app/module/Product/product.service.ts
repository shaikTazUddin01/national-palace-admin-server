import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";


/**
 * Add Product
 */
const addProduct = async (data: IProduct) => {
  const res = await Product.create(data);
  return res;
};

/**
 * Get All Products
 */
const getAllProduct = async () => {
  const res = await Product.find().sort({ createdAt: -1 });
  return res;
};

/**
 * Get Single Product
 */
const getSingleProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  return product;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
export const ProductService = {
  addProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
