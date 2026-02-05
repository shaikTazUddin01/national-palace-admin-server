import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { ISale } from "./sale.interface";
import { Sale } from "./sale.model";

const calcPaymentStatus = (total: number, paid: number) => {
  const due = total - paid;
  if (due <= 0) return "PAID";
  if (paid > 0 && due > 0) return "PARTIAL";
  return "DUE";
};

/**
 * Create Sale
 * ✅ Server will validate & calculate total/due/status
 */
const createSale = async (payload: Partial<ISale>) => {
  if (!payload.invoiceNo) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invoice number is required");
  }
  if (!payload.customerName) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Customer name is required");
  }
  if (!payload.customerNumber) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Customer Number is required");
  }
  if (!payload.productName) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Product name is required");
  }
  if (!payload.date) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Date is required");
  }

  const quantity = Number(payload.quantity ?? 0);
  const unitPrice = Number(payload.unitPrice ?? 0);
  const paidAmount = Number(payload.paidAmount ?? 0);

  if (quantity <= 0) throw new AppError(StatusCodes.BAD_REQUEST, "Quantity must be at least 1");
  if (unitPrice < 0) throw new AppError(StatusCodes.BAD_REQUEST, "Unit price cannot be negative");
  if (paidAmount < 0) throw new AppError(StatusCodes.BAD_REQUEST, "Paid amount cannot be negative");

  const totalAmount = quantity * unitPrice;

  if (paidAmount > totalAmount) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Paid amount cannot exceed total amount");
  }

  const dueAmount = totalAmount - paidAmount;
  const paymentStatus = calcPaymentStatus(totalAmount, paidAmount) as ISale["paymentStatus"];

  const finalPayload: ISale = {
    date: new Date(payload.date),
    invoiceNo: payload.invoiceNo,

    customerName: payload.customerName,
    productName: payload.productName,
    customerNumber: payload.customerNumber,

    quantity,
    unitPrice,

    totalAmount,
    paidAmount,
    dueAmount,

    paymentStatus,
    note: payload.note || "",

    createdBy: payload.createdBy,
  };

  const result = await Sale.create(finalPayload);
  return result;
};

const getAllSales = async () => {
  const result = await Sale.find().sort({ createdAt: -1 });
  return result;
};

const getSingleSale = async (id: string) => {
  const result = await Sale.findById(id);
  return result;
};

const updateSale = async (id: string, payload: Partial<ISale>) => {
  const existing = await Sale.findById(id);
  if (!existing) {
    throw new AppError(StatusCodes.NOT_FOUND, "Sale not found");
  }

  const quantity = Number(payload.quantity ?? existing.quantity);
  const unitPrice = Number(payload.unitPrice ?? existing.unitPrice);
  const paidAmount = Number(payload.paidAmount ?? existing.paidAmount);

  const totalAmount = quantity * unitPrice;

  if (paidAmount > totalAmount) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Paid amount cannot exceed total amount");
  }

  const dueAmount = totalAmount - paidAmount;
  const paymentStatus = calcPaymentStatus(totalAmount, paidAmount) as ISale["paymentStatus"];

  const result = await Sale.findByIdAndUpdate(
    id,
    {
      ...payload,
      quantity,
      unitPrice,
      paidAmount,
      totalAmount,
      dueAmount,
      paymentStatus,
      date: payload.date ? new Date(payload.date) : existing.date,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteSale = async (id: string) => {
  const result = await Sale.findByIdAndDelete(id);
  return result;
};

export const SaleService = {
  createSale,
  getAllSales,
  getSingleSale,
  updateSale,
  deleteSale,
};
