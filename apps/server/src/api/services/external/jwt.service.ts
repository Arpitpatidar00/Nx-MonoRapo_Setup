import { BadRequestError } from '@server/helper/customError.helper';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export class JwtUtils {
  private static instance: JwtUtils | null = null;
  private secretKey: Secret;
  private accessTokenExpiry: number; // Use ms.StringValue or number
  private refreshTokenExpiry: number;

  private constructor(
    secretKey: string,
    accessTokenExpiry: number = 86400000, // Type-safe default
    refreshTokenExpiry: number = 604800000,
  ) {
    this.secretKey = secretKey;
    this.accessTokenExpiry = accessTokenExpiry;
    this.refreshTokenExpiry = refreshTokenExpiry;
  }

  public static getInstance(
    secretKey: string,
    accessTokenExpiry: number = 86400000,
    refreshTokenExpiry: number = 604800000,
  ): JwtUtils {
    if (!JwtUtils.instance) {
      JwtUtils.instance = new JwtUtils(
        secretKey,
        accessTokenExpiry,
        refreshTokenExpiry,
      );
    }
    return JwtUtils.instance;
  }

  /**
   * Generates an access token
   */
  public generateAccessToken(payload: Record<string, any>): string {
    const options: SignOptions = { expiresIn: this.accessTokenExpiry };
    return jwt.sign(payload, this.secretKey, options);
  }

  /**
   * Generates a refresh token
   */
  public generateRefreshToken(payload: Record<string, any>): string {
    const options: SignOptions = { expiresIn: this.refreshTokenExpiry };
    return jwt.sign(payload, this.secretKey, options);
  }

  /**
   * Verifies a token and returns the payload
   */
  public verifyToken(token: string): Record<string, any> {
    try {
      return jwt.verify(token, this.secretKey) as Record<string, any>;
    } catch (err) {
      throw new BadRequestError('Invalid or expired token');
    }
  }

  /**
   * Decodes a token without verifying its signature
   */
  public decodeToken(token: string): Record<string, any> | null {
    try {
      return jwt.decode(token) as Record<string, any>;
    } catch (err) {
      return null;
    }
  }

  /**
   * Checks if a token is expired
   */
  public isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= decoded.exp;
  }
}

export default JwtUtils.getInstance(
  process.env.JWT_SECRET || 'your-secret-key',
);
