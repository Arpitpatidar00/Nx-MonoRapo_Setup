import { SiteImageType } from '@accent-tech/types';
import { FormattedImagesType } from 'apps/server/src/types/general.types';
import fs from 'fs';
import path from 'path';

export class ImageUtility {
  private static instance: ImageUtility;

  private constructor() {}

  /**
   * Singleton Instance
   */
  public static getInstance(): ImageUtility {
    if (!ImageUtility.instance) {
      ImageUtility.instance = new ImageUtility();
    }
    return ImageUtility.instance;
  }

  /**
   * Process Multer Image Files into a Uniform Format
   * @param imageFiles - Array of Multer file objects
   * @returns Array of processed image objects
   */
  public processImages(imageFiles: Express.Multer.File[]): SiteImageType[] {
    return imageFiles.map((file) => ({
      type: file.mimetype,
      url: file.path.replace(/\\/g, '/'), // Normalize path
      alt: file.originalname,
    }));
  }

  /**
   * Determine the Save Path for an Image Based on URL and Fieldname
   * @param url - API route for the current request
   * @param file - Multer file object
   * @returns Path to save the image
   */
  public getImageSavePath(url: string, file: Express.Multer.File): string {
    let modulePath = '';

    if (/\/product-category\/(create-category|update-category)/.test(url)) {
      modulePath = `category/${file.fieldname}`;
    } else if (/\/product-brand\/(create-brand|update-brand)/.test(url)) {
      modulePath = `brand/${file.fieldname}`;
    } else if (/\/product\/(create-product|update-product)/.test(url)) {
      modulePath = `product/${file.fieldname}`;
    } else if (/\/quotation\/update-quotation/.test(url)) {
      modulePath = `quotation/${file.fieldname}`;
    } else if (/\/order\/[a-f0-9]{24}\/payment-proof/.test(url)) {
      modulePath = `order/${file.fieldname}`;
    } else {
      modulePath = 'others';
    }

    return modulePath;
  }

  /**
   * Validate If the Object is an Image Type
   * @param value - Any value to check
   * @returns True if the object is of image type
   */
  public isImageType(value: any): value is SiteImageType {
    return (
      value &&
      typeof value === 'object' &&
      'type' in value &&
      'url' in value &&
      'alt' in value &&
      typeof value.type === 'string' &&
      typeof value.url === 'string' &&
      typeof value.alt === 'string'
    );
  }

  /**
   * Extract the Filename from a URL
   * @param url - File URL
   * @returns Extracted filename
   */
  public extractFilename(url: string): string {
    return path.basename(url);
  }

  /**
   * Check If an Image URL Points to an Existing File
   * @param filePath - File path to check
   * @returns True if the file exists
   */
  public async doesImageExist(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(path.resolve(filePath));
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Get images from `req.images` based on the field name.
   * @param images - The `req.images` object.
   * @param fieldName - The key for which to retrieve the images.
   * @param returnFirst - Boolean flag to determine if only the first image should be returned.
   * @returns - Either the full array of SiteImageType or the first element of the array.
   */
  public getReqImages(
    images: FormattedImagesType | undefined,
    fieldName: string,
    returnFirst: boolean = false,
  ): SiteImageType[] | SiteImageType | null {
    if (!images || !images[fieldName] || images[fieldName].length === 0) {
      return returnFirst ? null : [];
    }

    const imageArray = images[fieldName];
    return returnFirst ? imageArray[0] : imageArray;
  }

  /**
   * Delete images from `req.images`.
   * Iterates over all the keys in the object, and deletes files if they have a `url`.
   * @param images - The `req.images` object.
   */
  public deleteReqImages(images: FormattedImagesType | undefined): void {
    if (!images) return;

    Object.values(images).forEach((imageArray) => {
      imageArray.forEach((image) => {
        if (image.url) {
          try {
            const filePath = path.resolve(image.url);
            fs.unlinkSync(filePath);
          } catch (error) {
            console.error(`Error deleting file: ${image.url}`, error);
          }
        }
      });
    });
  }
}

export const imageUtility = ImageUtility.getInstance();
