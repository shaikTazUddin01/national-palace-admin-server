import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'


const globalErrorHandler:any = (err:any, req:Request, res:Response, next:NextFunction) => {
  //setting default value
  const statusCode = err.statusCode || 500
  const message = err.message || 'something went wrong.!'

  return res.status(statusCode).json({
    success: false,
    message,
    error:err
  })
}

export default globalErrorHandler