import { SiteAdmin, SiteUser } from '@accent-tech/types';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: SiteUser;
  admin?: SiteAdmin;
}
