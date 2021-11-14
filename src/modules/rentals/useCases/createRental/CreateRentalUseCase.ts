import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const carUnavailable =
      await this.rentalsRepository.findOngoingRentalByCarID(car_id);

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const onGoingRentalToUser =
      await this.rentalsRepository.findOngoingRentalByUserID(user_id);

    if (onGoingRentalToUser) {
      throw new AppError('User is renting another car at the moment');
    }

    const dateNow = this.dateProvider.dateNow();

    const hourDifference = this.dateProvider.compareInHoursInUTC(
      dateNow,
      expected_return_date
    );

    if (hourDifference < minimumHour) {
      throw new AppError('Invalid return date, minimum 24 hours difference');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });

    await this.carsRepository.update({ id: car_id, available: false });

    return rental;
  }
}

export { CreateRentalUseCase };
