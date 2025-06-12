import 'express';
import { File as MulterFile } from 'multer';

declare global {
  namespace Express {
    interface Multer {
      File: MulterFile;
    }

    interface Request {
      files?: {
        [fieldname: string]: Express.MulterS3.File[];
      };
      // images?: {
      //   [fieldname: string]: SiteImageType[];
      // };
    }
  }
}

declare module 'http' {
  interface IncomingMessage {
    rawBody?: string; // Add rawBody property
  }
}
