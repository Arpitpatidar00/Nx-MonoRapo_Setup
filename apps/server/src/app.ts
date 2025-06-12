// Import database connection
import './api/database/db.connection';

// Import dependencies
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { join } from 'path';

// Import Constants and Middleware
import { ErrorMiddleware } from './api/middleware';
// import logger from './config/logger.config';
import { APP_CORS_OPTIONS } from './constants';

// Import Routes
import appV1Apis from '@server/api/routes/v1/index';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

class AppServer {
  private static instance: AppServer;
  private app: Express;
  private errorMiddlewareInstance = ErrorMiddleware.getInstance();

  private constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Get the singleton instance of AppServer
   * @returns {AppServer}
   */
  public static getInstance(): AppServer {
    if (!AppServer.instance) {
      AppServer.instance = new AppServer();
    }
    return AppServer.instance;
  }

  /**
   * Initialize all required middlewares
   */
  private initializeMiddleware(): void {
    // Security Middleware
    this.app.use(
      helmet({
        crossOriginResourcePolicy: false,
      }),
    );

    this.app.use(cors(APP_CORS_OPTIONS));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser() as unknown as express.RequestHandler);
    this.app.use(compression() as unknown as express.RequestHandler);

    // Static File Serving
    this.app.use(
      express.static(join(__dirname, '../public'), {
        setHeaders(res: express.Response, _path: string) {
          res.set('x-timestamp', Date.now().toString());
        },
      }),
    );
  }

  /**
   * Initialize API routes
   */
  private initializeRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('🚀 Accnet Tech Shop Server is ready!');
    });

    // Uncomment when implementing routes
    this.app.use('/v1', appV1Apis);
  }

  /**
   * Initialize Global Error Handling
   */
  private initializeErrorHandling(): void {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        // logger.error(`Error occurred: ${err.message}`, {
        //   stack: err.stack,
        //   method: req.method,
        //   url: req.originalUrl,
        //   params: req.params,
        //   body: req.body,
        //   query: req.query,
        // });
        next(err);
      },
    );
    // Use the central error handler middleware
    this.app.use(
      (
        err: unknown,
        req: express.Request<
          ParamsDictionary,
          unknown,
          unknown,
          ParsedQs,
          Record<string, unknown>
        >,
        res: express.Response<unknown, Record<string, unknown>>,
        next: express.NextFunction,
      ) => {
        this.errorMiddlewareInstance.handleSiteError(err, req, res, next);
      },
    );

    // Handle Uncaught Exceptions
    // process.on('uncaughtException', (err) => {
    //   logger.error('Uncaught Exception:', {
    //     message: err.message,
    //     stack: err.stack,
    //   });
    //   process.exit(1);
    // });

    // process.on('unhandledRejection', (reason: unknown) => {
    //   logger.error('Unhandled Promise Rejection:', { reason });
    // });
  }

  /**
   * Get the Express App instance
   * @returns {Express}
   */
  public getApp(): Express {
    return this.app;
  }
}

// Export Singleton Instance of Express App
export const app = AppServer.getInstance().getApp();
