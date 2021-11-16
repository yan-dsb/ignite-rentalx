import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('List Categories Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const password = await hash('123456', 8);
    const id = uuidv4();
    await connection.query(
      `INSERT INTO users(id, name, email, password, driver_license, "isAdmin", created_at) values ('${id}', 'Administrator', 'admin@rentx.com', '${password}', '4556', true, 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('sould be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: '123456'
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category test',
        description: 'Category supertest'
      })
      .set({
        Authorization: `Bearer ${refresh_token}`
      });
    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
