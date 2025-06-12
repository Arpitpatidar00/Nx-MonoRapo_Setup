import { Response } from 'express';

export class ResponseHandler {
  static OK(res: Response, result: unknown, message = '', code = true) {
    res.status(200).json({
      code,
      message: message || '',
      result: result || null,
    });
  }

  static CREATED = (
    res: Response,
    result: unknown,
    message = '',
    code = true,
  ) => {
    res.status(201).json({
      code,
      message: message || 'Created successfully',
      result: result || null,
    });
  };

  static NOT_FOUND = (
    res: Response,
    result: unknown,
    message = '',
    code = false,
  ) => {
    res.status(404).json({
      code,
      message: message || 'Resource not found',
      result: result || null,
    });
  };
  static ERROR(
    res: Response,
    result: unknown,
    message = 'Error',
    code = false,
  ) {
    res.status(200).json({
      code,
      message: message || '',
      result,
    });
  }

  static UNAUTHORIZED(
    res: Response,
    result: unknown,
    message = '',
    code = false,
  ) {
    res.status(401).json({
      code,
      message: message || 'You are not authorized to perform this action.',
      result,
    });
  }

  static BAD(
    res: Response,
    result: unknown,
    message = 'Bad Request',
    code = false,
  ) {
    res.status(400).json({
      code,
      result,
      message: message || '',
    });
  }

  static UNKNOWN(res: Response, result: unknown, message = '', code = false) {
    res.status(500).json({
      code,
      result,
      message:
        message || 'An unexpected error occurred. Please try again later.',
    });
  }
}
