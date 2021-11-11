import { Router } from 'express';

import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { rentalsRoutes } from './rentals.routes';
import { sessionsRoutes } from './sessions.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/cars', carsRoutes);
router.use('/rentals', rentalsRoutes);

export { router };
