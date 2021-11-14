import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  const dateAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '1234',
      user_id: '123',
      expected_return_date: dateAdd24Hours
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental, car is unavailable', async () => {
    const rental = await rentalsRepositoryInMemory.create({
      user_id: '1234',
      car_id: '123',
      expected_return_date: dateAdd24Hours
    });

    await expect(
      createRentalUseCase.execute({
        car_id: rental.car_id,
        user_id: '123',
        expected_return_date: dateAdd24Hours
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental, user is renting another car at the moment', async () => {
    const rental = await rentalsRepositoryInMemory.create({
      user_id: '1234',
      car_id: '123',
      expected_return_date: dateAdd24Hours
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '12345',
        user_id: rental.user_id,
        expected_return_date: dateAdd24Hours
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return date, minimum 24 hours difference', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '12345',
        user_id: '1234',
        expected_return_date: new Date()
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
