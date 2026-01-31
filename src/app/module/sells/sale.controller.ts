import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SaleService } from "./sale.service";

/**
 * Create Sale
 */
const createSale = catchAsync(async (req, res) => {
  const result = await SaleService.createSale(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Sale created successfully",
    data: result,
  });
});

/**
 * Get All Sales
 */
const getAllSales = catchAsync(async (req, res) => {
  const result = await SaleService.getAllSales();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Sales retrieved successfully",
    data: result,
  });
});

/**
 * Get Single Sale
 */
const getSingleSale = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SaleService.getSingleSale(id as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Sale retrieved successfully",
    data: result,
  });
});

/**
 * Update Sale
 */
const updateSale = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SaleService.updateSale(id as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Sale updated successfully",
    data: result,
  });
});

/**
 * Delete Sale
 */
const deleteSale = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SaleService.deleteSale(id as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Sale deleted successfully",
    data: result,
  });
});

export const SaleController = {
  createSale,
  getAllSales,
  getSingleSale,
  updateSale,
  deleteSale,
};
