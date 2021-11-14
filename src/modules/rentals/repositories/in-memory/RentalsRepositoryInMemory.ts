import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IUpdateRentalDTO } from '@modules/rentals/dtos/IUpdateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    user_id,
    car_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date()
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOngoingRentalByCarID(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date
    );

    return rental;
  }

  async findOngoingRentalByUserID(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date
    );

    return rental;
  }

  async findByID(id: string): Promise<Rental> {
    const rental = this.rentals.find(rental => rental.id === id);

    return rental;
  }

  async update({ id, total, end_date }: IUpdateRentalDTO): Promise<void> {
    const rentalIndex = this.rentals.findIndex(rental => rental.id === id);

    const rental = { ...this.rentals[rentalIndex], ...{ total, end_date } };

    this.rentals[rentalIndex] = rental;
  }

  async findAllByUserID(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter(rental => rental.user_id === user_id);

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
