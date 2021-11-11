import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIDs(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
