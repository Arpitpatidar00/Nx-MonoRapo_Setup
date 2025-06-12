import { CorsOptions } from 'cors';

// Parse allowed origins from environment variables
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  ...(process.env.ALLOWED_ORIGINS?.split(',').map((url) => url.trim()) || []),
].filter(Boolean);

export const APP_CORS_OPTIONS: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'ngrok-skip-browser-warning',
  ],
};
