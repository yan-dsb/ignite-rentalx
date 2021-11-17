import { container } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

import { DayjsDateProvider } from './implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
