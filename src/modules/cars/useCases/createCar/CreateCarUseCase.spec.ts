import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Argo',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4141',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: '123'
    });
    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with existing license_plate', async () => {
    const car = {
      name: 'Argo',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4141',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: '123'
    };
    await createCarUseCase.execute(car);
    await expect(createCarUseCase.execute(car)).rejects.toEqual(
      new AppError('Car already exists')
    );
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Argo',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4141',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: '123'
    });

    expect(car.available).toBe(true);
  });
});
