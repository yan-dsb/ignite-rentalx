import { container } from 'tsyringe';

import { IHashProvider } from './HashProvider/IHashProvider';
import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
