import { Specification } from '../entities/Specification';
import { ICreateSpecificationDTO } from '../useCases/createSpecification/ICreateSpecificationDTO';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | undefined>;
}

export { ISpecificationsRepository };
