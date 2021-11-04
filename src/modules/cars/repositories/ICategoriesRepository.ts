import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../models/Category';

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create(data: ICreateCategoryDTO): void;
}

export { ICategoriesRepository };
