import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../models/Specification';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): void;
  findByName(name: string): Specification | undefined;
}

export { ISpecificationsRepository };
