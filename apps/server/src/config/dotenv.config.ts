import * as dotenv from 'dotenv';
import * as path from 'path';

// Determine the project root directory
const projectRoot = path.resolve(__dirname, '../../../../../../..'); // Go up to project root

// Load the main .env file from apps/server/
const envPath = path.resolve(projectRoot, 'apps/server/.env');
dotenv.config({ path: envPath });

// Load the environment-specific .env file (e.g., .env.development)
const envSpecificPath = path.resolve(
  projectRoot,
  `apps/server/.env.${process.env.environment?.trim() || ''}`,
);
dotenv.config({ path: envSpecificPath });
