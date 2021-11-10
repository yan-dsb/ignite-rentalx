import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test'
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with a existing category name', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test'
    };
    await createCategoryUseCase.execute(category);
    await expect(
      createCategoryUseCase.execute(category)
    ).rejects.toBeInstanceOf(AppError);
  });
});
