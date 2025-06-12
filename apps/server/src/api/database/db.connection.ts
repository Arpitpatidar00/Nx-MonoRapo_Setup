import mongoose from 'mongoose';

class Database {
  private static instance: Database | null = null;

  public static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private constructor() {
    this._connect();
  }

  async _connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URI as string); // Type assertion to ensure it's treated as a string
      console.log('Connection established with DB.');
    } catch (error) {
      console.error('Error connecting to database: ', error);
      process.exit(1); // Optionally exit if critical
    }
  }
}

export default Database.getInstance();
