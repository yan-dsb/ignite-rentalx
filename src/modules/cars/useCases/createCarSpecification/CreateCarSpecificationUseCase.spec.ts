import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to add a specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Argo',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4141',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: '123'
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: 'Test',
      description: 'Test'
    });

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids: [specification.id, specification.id]
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBeGreaterThan(0);
  });

  it('should not be able to add a specification to non-existent car', async () => {
    const car_id = '1235';
    const specifications_ids = ['12345'];

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_ids })
    ).rejects.toBeInstanceOf(AppError);
  });
});
