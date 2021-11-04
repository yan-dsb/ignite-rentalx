import { Request, Response, Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createSpecification = new CreateSpecificationService(
    specificationsRepository
  );

  createSpecification.execute({ name, description });

  return response.send();
});

export { specificationsRoutes };
