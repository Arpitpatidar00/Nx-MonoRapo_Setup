import { ui } from '@accent-tech/utils';
import { GeneralUtility, ResponseHandler } from '@server/utils';

import { NextFunction, Request, Response } from 'express';

const generalUtility = GeneralUtility.getInstance();

export const parserMiddleware = {
  bodyParser: (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (req.body && typeof req.body === 'object') {
        req.body = generalUtility.parseReqBody(req.body);
      }
      next();
    } catch (error) {
      console.error('Error in convertValuesMiddleware:', error);
      return ResponseHandler.UNKNOWN(
        res,
        null,
        ui('responses.errors.badRequest.invalidPayload'),
      );
    }
  },
};
