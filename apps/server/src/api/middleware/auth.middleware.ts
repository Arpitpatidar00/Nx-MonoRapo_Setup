import { SiteUserType } from '@accent-tech/types';
import { ui } from '@accent-tech/utils';
import { JwtUtils } from '@server/services/index';
import { AuthRequest } from '@server/types/request.types';
import { ResponseHandler } from '@server/utils';
import { NextFunction, Response } from 'express';

export class AuthMiddleware {
  private static instance: AuthMiddleware | null = null;
  private jwtServiceInstance = JwtUtils.getInstance(
    process.env.JWT_SECRET || 'your-secret-key',
  );
  // private siteAdminServiceInstance = SiteAdminDbService.getInstance();
  // private siteUserServiceInstance = SiteUserDbService.getInstance();

  public static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  private constructor() {} // private to enforce singleton

  public checkAuth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const headToken = req.header('Authorization');
    const token = headToken?.replace('Bearer ', '');

    if (!token) {
      return ResponseHandler.UNAUTHORIZED(
        res,
        ui('responses.errors.unauthorized.noAccessToken'),
      );
    }

    try {
      const verifiedToken = this.jwtServiceInstance.verifyToken(token);
      if (!verifiedToken) {
        return ResponseHandler.UNAUTHORIZED(
          res,
          ui('responses.errors.unauthorized.accessDenied'),
        );
      }

      let user;
      if (verifiedToken.role === SiteUserType.ADMIN) {
        // user = await this.siteAdminServiceInstance.findOne(verifiedToken.id);
        if (!user) {
          return ResponseHandler.NOT_FOUND(
            res,
            ui('responses.errors.notFound', { resource: 'Admin' }),
          );
        }
        req.admin = user;
      } else if (
        verifiedToken.role === SiteUserType.RETAIL ||
        verifiedToken.role === SiteUserType.WHOLESALE
      ) {
        // user = await this.siteUserServiceInstance.findOne(verifiedToken.id);
        if (!user) {
          return ResponseHandler.NOT_FOUND(
            res,
            ui('responses.errors.notFound', { resource: 'User' }),
          );
        }
        req.user = user;
      } else {
        return ResponseHandler.UNAUTHORIZED(
          res,
          ui('responses.errors.unauthorized.accessDenied'),
        );
      }

      next();
    } catch (error) {
      return ResponseHandler.UNAUTHORIZED(
        res,
        error,
        ui('responses.errors.general.unexpected'),
      );
    }
  };

  public onlyAdmin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.admin) {
      return ResponseHandler.UNAUTHORIZED(
        res,
        ui('responses.errors.forbidden.noPermission'),
      );
    }
    next();
  };
}

export const authMiddleware = AuthMiddleware.getInstance();
