import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { IUpdateRentalDTO } from '../dtos/IUpdateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOngoingRentalByCarID(car_id: string): Promise<Rental>;
  findOngoingRentalByUserID(user_id: string): Promise<Rental>;
  findByID(id: string): Promise<Rental>;
  update(data: IUpdateRentalDTO): Promise<void>;
}

export { IRentalsRepository };
