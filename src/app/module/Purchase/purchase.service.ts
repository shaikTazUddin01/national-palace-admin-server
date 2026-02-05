import { AppError } from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { IPurchase } from "./purchase.interface";
import { Purchase } from "./purchase.model";
import { Product } from "../Product/product.model";
import { generateSku } from "../../utils/generateSku";
import { Category } from "../Category/category.model";

/**
 * Create Purchase
 * ✅ Server calculates total/due/status to prevent wrong client values
 */

const createPurchase = async (payload: Partial<IPurchase>) => {
  if (!payload.supplierName || !payload.productName) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Supplier & Product required");
  }

  const quantity = Number(payload.quantity ?? 0);
  const purchasePrice = Number(payload.purchasePrice ?? 0);
  const paidAmount = Number(payload.paidAmount ?? 0);

  const category = String((payload as any)?.category ?? "").trim();
  const salePrice = Number((payload as any)?.salePrice ?? 0);

  if (!category) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Category is required");
  }

  if (quantity <= 0)
    throw new AppError(StatusCodes.BAD_REQUEST, "Quantity must be at least 1");
  if (purchasePrice < 0)
    throw new AppError(StatusCodes.BAD_REQUEST, "Purchase price cannot be negative");
  if (salePrice < 0)
    throw new AppError(StatusCodes.BAD_REQUEST, "Sale price cannot be negative");
  if (paidAmount < 0)
    throw new AppError(StatusCodes.BAD_REQUEST, "Paid amount cannot be negative");

  const totalAmount = quantity * purchasePrice;
  const dueAmount = totalAmount - paidAmount;

  if (dueAmount < 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Paid amount cannot exceed total amount"
    );
  }

  if (paidAmount > 0 && !payload.paymentMethod) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Payment method is required when paid amount is greater than 0"
    );
  }

  const purchaseStatus: "PAID" | "DUE" = dueAmount > 0 ? "DUE" : "PAID";

  const productName = String(payload.productName).trim();

  // =====================================================
  // ✅ 1. ENSURE CATEGORY EXISTS
  // =====================================================
  const existingCategory = await Category.findOne({
    name: { $regex: new RegExp(`^${category}$`, "i") },
  });

  if (!existingCategory) {
    await Category.create({
      name: category,
      code: `${category.toUpperCase().slice(0, 4)}-${Date.now().toString().slice(-4)}`,
      status: "active",
      createdBy: payload.createdBy,
    });
  }

  // =====================================================
  // ✅ 2. FIND PRODUCT (name + category + purchasePrice)
  // =====================================================
  const existingProduct = await Product.findOne({
    name: { $regex: new RegExp(`^${productName}$`, "i") },
    category: { $regex: new RegExp(`^${category}$`, "i") },
    purchasePrice: purchasePrice,
  });

  if (existingProduct) {
    // ✅ ONLY STOCK INCREASE
    existingProduct.quantity =
      Number(existingProduct.quantity ?? 0) + quantity;

    // optional: update sale price
    if (salePrice > 0) {
      existingProduct.salePrice = salePrice;
    }

    await existingProduct.save();
  } else {
    // =====================================================
    // ✅ 3. CREATE NEW PRODUCT
    // =====================================================
    const finalSalePrice = salePrice > 0 ? salePrice : purchasePrice;

    let sku = generateSku();
    for (let i = 0; i < 5; i++) {
      const exists = await Product.findOne({ sku });
      if (!exists) break;
      sku = generateSku();
    }

    await Product.create({
      name: productName,
      category,
      sku,
      purchasePrice,
      salePrice: finalSalePrice,
      quantity,
      status: "active",
      createdBy: payload.createdBy,
    });
  }

  // =====================================================
  // ✅ 4. CREATE PURCHASE (ALWAYS)
  // =====================================================
  const finalPayload: IPurchase = {
    supplierName: payload.supplierName,
    productName,
    quantity,
    purchasePrice,
    totalAmount,
    paidAmount,
    dueAmount,
    paymentMethod: paidAmount > 0 ? payload.paymentMethod! : null,
    purchaseStatus,
    note: payload.note || "",
    createdBy: payload.createdBy,
  };

  const result = await Purchase.create(finalPayload);
  return result;
};


const getAllPurchases = async () => {
  const result = await Purchase.find().sort({ createdAt: -1 });
  return result;
};

const getSinglePurchase = async (id: string) => {
  const result = await Purchase.findById(id);
  return result;
};

const updatePurchase = async (id: string, payload: Partial<IPurchase>) => {
  // ✅ If update changes quantity/price/paid, recalc totals
  const existing = await Purchase.findById(id);
  if (!existing) {
    throw new AppError(StatusCodes.NOT_FOUND, "Purchase not found");
  }

  const quantity = Number(payload.quantity ?? existing.quantity);
  const purchasePrice = Number(payload.purchasePrice ?? existing.purchasePrice);
  const paidAmount = Number(payload.paidAmount ?? existing.paidAmount);

  const totalAmount = quantity * purchasePrice;
  const dueAmount = totalAmount - paidAmount;

  if (dueAmount < 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Paid amount cannot exceed total amount");
  }

  if (paidAmount > 0 && !payload.paymentMethod && !existing.paymentMethod) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Payment method is required when paid amount is greater than 0");
  }

  const purchaseStatus: "PAID" | "DUE" = dueAmount > 0 ? "DUE" : "PAID";

  const result = await Purchase.findByIdAndUpdate(
    id,
    {
      ...payload,
      quantity,
      purchasePrice,
      paidAmount,
      totalAmount,
      dueAmount,
      purchaseStatus,
      paymentMethod: paidAmount > 0 ? (payload.paymentMethod ?? existing.paymentMethod) : null,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deletePurchase = async (id: string) => {
  const result = await Purchase.findByIdAndDelete(id);
  return result;
};

export const PurchaseService = {
  createPurchase,
  getAllPurchases,
  getSinglePurchase,
  updatePurchase,
  deletePurchase,
};
