import { Specification } from '../entities/Specification';
import { ICreateSpecificationDTO } from '../useCases/createSpecification/ICreateSpecificationDTO';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): void;
  findByName(name: string): Specification | undefined;
}

export { ISpecificationsRepository };
