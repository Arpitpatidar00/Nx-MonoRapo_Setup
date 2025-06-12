import { ApiResponse } from '@accent-tech/types';
import { createApiResponse } from '@accent-tech/utils';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  const response: ApiResponse = createApiResponse('Hello API from Nx backend!');
  res.json(response);
});

export default app;
