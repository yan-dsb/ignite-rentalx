import { Category } from '../entities/Category';
import { ICreateCategoryDTO } from '../useCases/createCategory/ICreateCategoryDTO';

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository };
