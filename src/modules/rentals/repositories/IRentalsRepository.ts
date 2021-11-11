import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOngoingRentalByCarID(car_id: string): Promise<Rental>;
  findOngoingRentalByUserID(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
