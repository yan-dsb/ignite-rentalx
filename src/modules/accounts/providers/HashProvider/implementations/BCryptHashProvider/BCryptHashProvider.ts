import { compare, hash } from 'bcryptjs';

import { IHashProvider } from '../../IHashProvider';

class BCryptHashProvider implements IHashProvider {
  async generate(payload: string): Promise<string> {
    const hashed = await hash(payload, 8);

    return hashed;
  }
  async compare(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }
}

export { BCryptHashProvider };
