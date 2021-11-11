import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all cars available', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Argo',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4141',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: 'category_id'
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Argo 2021',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4241',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: 'category_id'
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car1, car2]);
  });

  it('should be able to list all cars available by name', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Argo',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4141',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: 'category_id'
    });

    await carsRepositoryInMemory.create({
      name: 'Argo 2021',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4241',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: 'category_id'
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Argo' });

    expect(cars).toEqual([car1]);
  });

  it('should be able to list all cars available by brand', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Argo',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4141',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: 'category_id'
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Argo 2021',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4241',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: 'category_id'
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Fiat' });

    expect(cars).toEqual([car1, car2]);
  });

  it('should be able to list all cars available by category', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Argo',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4141',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: 'category_id'
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Argo 2021',
      description: '2021',
      daily_rate: 100,
      license_plate: 'PJG4241',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: 'category_id'
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Fiat' });

    expect(cars).toEqual([car1, car2]);
  });
});
