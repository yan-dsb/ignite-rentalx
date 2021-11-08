import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';

import './database';
import './shared/container';

import { router } from './routes';
import { AppError } from './shared/errors/AppError';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ error: err.message });
    }

    console.error(err);

    return response.status(500).json({ error: 'Internal server error' });
  }
);

app.listen(3333, () => console.log('Started listening on port 3333'));
