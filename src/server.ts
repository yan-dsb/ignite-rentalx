import express from 'express';

import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.get('/', (request, response) => {
  return response.json({ mesasage: 'Hello world' });
});

app.post('/courses', (request, response) => {
  const { name } = request.body;
  return response.json({ name });
});

app.listen(3333, () => console.log('Started listening on port 3333'));
