import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import { ICreateSpecificationDTO } from '../../useCases/createSpecification/ICreateSpecificationDTO';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  private constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
