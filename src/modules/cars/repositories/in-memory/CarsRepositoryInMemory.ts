import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IUpdateCarDTO } from '@modules/cars/dtos/IUpdateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === license_plate);

    return car;
  }

  async findAllAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    let cars = this.cars.filter(car => car.available);

    if (brand || name || category_id) {
      cars = this.cars.filter(
        car =>
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name)
      );
    }

    return cars;
  }

  async findByID(id: string): Promise<Car | undefined> {
    const car = this.cars.find(c => c.id === id);

    return car;
  }

  async update({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications
  }: IUpdateCarDTO): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === id);

    const car = {
      ...this.cars[carIndex],
      ...{
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications
      }
    };

    this.cars[carIndex] = car;
  }
}

export { CarsRepositoryInMemory };
