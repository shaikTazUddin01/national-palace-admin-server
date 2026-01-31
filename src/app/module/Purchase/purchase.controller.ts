import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PurchaseService } from "./purchase.service";

/**
 * Create Purchase
 */
const createPurchase = catchAsync(async (req, res) => {
  const result = await PurchaseService.createPurchase(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Purchase created successfully",
    data: result,
  });
});

/**
 * Get All Purchases
 */
const getAllPurchases = catchAsync(async (req, res) => {
  const result = await PurchaseService.getAllPurchases();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Purchases retrieved successfully",
    data: result,
  });
});

/**
 * Get Single Purchase
 */
const getSinglePurchase = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PurchaseService.getSinglePurchase(id as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Purchase retrieved successfully",
    data: result,
  });
});

/**
 * Update Purchase
 */
const updatePurchase = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PurchaseService.updatePurchase(id as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Purchase updated successfully",
    data: result,
  });
});

/**
 * Delete Purchase
 */
const deletePurchase = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PurchaseService.deletePurchase(id as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Purchase deleted successfully",
    data: result,
  });
});

export const PurchaseController = {
  createPurchase,
  getAllPurchases,
  getSinglePurchase,
  updatePurchase,
  deletePurchase,
};
