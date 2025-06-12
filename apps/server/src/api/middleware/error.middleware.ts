import { AppError } from '@server/helper/customError.helper';
import { Request, Response, NextFunction } from 'express';

export class ErrorMiddleware {
  private static instance: ErrorMiddleware | null = null;

  public static getInstance() {
    if (!ErrorMiddleware.instance) {
      ErrorMiddleware.instance = new ErrorMiddleware();
    }
    return ErrorMiddleware.instance;
  }

  private constructor() {} // private to enforce singleton

  public handleSiteError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    if (err instanceof AppError) {
      return res.status(err.statusCode || 500).json({
        code: false,
        message: err.message,
        result: null,
      });
    }
    // For unexpected errors
    console.error(err); // Log the error for debugging
    res.status(500).json({
      code: false,
      message: 'Internal server error',
      result: null,
    });
  }
}

export default ErrorMiddleware.getInstance();
