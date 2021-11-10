import { Request, Response } from 'express';

import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';

import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    } = request.body;

    const carsRepository = new CarsRepository();
    const createCarUseCase = new CreateCarUseCase(carsRepository);

    const car = await createCarUseCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
