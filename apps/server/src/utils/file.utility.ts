import fs from 'fs/promises';
import path from 'path';

export class FileUtility {
  private static instance: FileUtility;

  private constructor() {}

  /**
   * Returns the single instance of the FileUtility class.
   */
  public static getInstance(): FileUtility {
    if (!FileUtility.instance) {
      FileUtility.instance = new FileUtility();
    }
    return FileUtility.instance;
  }

  /**
   * Deletes a file from the server's filesystem.
   * @param fileUrl - The relative path to the file (e.g., "public/assets/file.png").
   * @returns A promise that resolves to true if the file is deleted, or false if the file does not exist.
   */
  public async deleteFile(fileUrl: string): Promise<boolean> {
    try {
      const filePath = path.resolve(fileUrl);

      // Check if the file exists
      await fs.access(filePath);

      // Delete the file
      await fs.unlink(filePath);

      console.log(`File deleted successfully: ${filePath}`);
      return true;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.error(`File not found: ${fileUrl}`);
        return false;
      }
      console.error(`Error deleting file: ${fileUrl}`, error);
      throw new Error(`Unable to delete file: ${fileUrl}`);
    }
  }

  /**
   * Creates a directory if it does not already exist.
   * @param dirPath - The directory path to create.
   * @returns A promise that resolves to true if the directory was created, or false if it already exists.
   */
  public async makeDir(dirPath: string): Promise<boolean> {
    try {
      const absolutePath = path.resolve(dirPath);
      await fs.mkdir(absolutePath, { recursive: true });
      console.log(`Directory created: ${absolutePath}`);
      return true;
    } catch (error) {
      console.error(`Error creating directory: ${dirPath}`, error);
      throw new Error(`Unable to create directory: ${dirPath}`);
    }
  }

  /**
   * Checks if a file or directory exists.
   * @param targetPath - The path to check.
   * @returns A promise that resolves to true if the file or directory exists, or false otherwise.
   */
  public async exists(targetPath: string): Promise<boolean> {
    try {
      const absolutePath = path.resolve(targetPath);
      await fs.access(absolutePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Reads the content of a file.
   * @param filePath - The path of the file to read.
   * @returns A promise that resolves to the file content as a string.
   */
  public async readFile(filePath: string): Promise<string> {
    try {
      const absolutePath = path.resolve(filePath);
      const content = await fs.readFile(absolutePath, 'utf-8');
      return content;
    } catch (error) {
      console.error(`Error reading file: ${filePath}`, error);
      throw new Error(`Unable to read file: ${filePath}`);
    }
  }

  /**
   * Writes data to a file, creating the file if it does not exist.
   * @param filePath - The path of the file to write to.
   * @param data - The data to write.
   * @returns A promise that resolves when the file has been written.
   */
  public async writeFile(
    filePath: string,
    data: string | Buffer,
  ): Promise<void> {
    try {
      const absolutePath = path.resolve(filePath);
      await fs.writeFile(absolutePath, data);
      console.log(`File written successfully: ${absolutePath}`);
    } catch (error) {
      console.error(`Error writing to file: ${filePath}`, error);
      throw new Error(`Unable to write to file: ${filePath}`);
    }
  }
}

export const fileUtility = FileUtility.getInstance();
