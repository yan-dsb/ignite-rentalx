import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const password = await hash('123456', 8);
  const id = uuidv4();
  await connection.query(
    `INSERT INTO users(id, name, email, password, driver_license, "isAdmin", created_at) values ('${id}', 'Administrator', 'admin@rentx.com', '${password}', '4556', true, 'now()')`
  );
  await connection.close();
}

create()
  .then(() => console.log('User admin created'))
  .catch(err => console.error(err));
