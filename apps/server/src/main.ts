// @ Config Imports
import 'module-alias/register';
import './config/dotenv.config';

import { app } from '@server/app';
import debug from 'debug';
import { Request, Response } from 'express';
import { createServer, Server } from 'http';

const PORT: number = Number(process.env.PORT) || 1337;
const log = debug('server');

app.set('port', PORT);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    code: false,
    message: 'Invalid API.',
  });
});

const server: Server = createServer(app);

/**
 * Error handler for server startup issues
 * @param error - Error object
 */
const handleServerError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') throw error;

  const bind =
    typeof server.address() === 'string'
      ? `pipe ${server.address()}`
      : `port ${PORT}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`🚫 Error: ${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`🚫 Error: ${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event
 */
const handleServerListening = (): void => {
  const bind =
    typeof server.address() === 'string'
      ? `pipe ${server.address()}`
      : `port ${PORT}`;
  log(`🚀 Server is running on ${bind}`);
};

// Attach event listeners
server.on('error', handleServerError);
server.on('listening', handleServerListening);

// Start Server
server.listen(PORT, () => {
  console.log(`\n🚀 Server started: http://localhost:${PORT}\n`);
});
