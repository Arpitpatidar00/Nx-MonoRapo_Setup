export enum SiteUserType {
  ADMIN = 'admin',
  RETAIL = 'retail',
  WHOLESALE = 'wholesale',
}

export interface SiteAdmin {
  _id: string;
  username: string;
  email: string;
  password?: string;
  mobileNo?: string;
  isAdmin: boolean;
  role: SiteUserType;
  isActive: boolean;
  verified: boolean;
  comparePassword(password: string): Promise<boolean>;
}

export interface SiteUser {
  _id: string;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  mobileNo: string;
  role: SiteUserType;
  verified: boolean;
  createdAt?: Date;
  isActive: boolean;
}
