import { IHashProvider } from '../IHashProvider';

class HashProviderInMemory implements IHashProvider {
  async generate(payload: string): Promise<string> {
    return payload;
  }
  async compare(payload: string, hash: string): Promise<boolean> {
    return payload === hash;
  }
}

export { HashProviderInMemory };
