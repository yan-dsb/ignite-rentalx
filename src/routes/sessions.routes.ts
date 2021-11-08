import { Router } from 'express';

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const sessionsRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRoutes.post('/', authenticateUserController.handle);

export { sessionsRoutes };
