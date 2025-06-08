import express from 'express';
import { ApiResponse } from '@accent-tech/types';
import { createApiResponse } from '@accent-tech/utils';

const app = express();

app.get('/', (req, res) => {
  const response: ApiResponse = createApiResponse('Hello API from Nx backend!');
  res.json(response);
});

export default app;
