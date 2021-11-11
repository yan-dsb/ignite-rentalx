import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IUpdateCarDTO } from '../dtos/IUpdateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAllAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]>;
  findByID(id: string): Promise<Car | undefined>;
  update(data: IUpdateCarDTO): Promise<void>;
}

export { ICarsRepository };
