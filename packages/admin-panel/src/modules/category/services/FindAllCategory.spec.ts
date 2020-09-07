import { FakeCategoryRepository } from '../repositories/fakes/FakeCategoryRepository';
import { CreateCategoryService } from './CreateCategoryService';
import { FindAllCategoriesService } from './FindAllCategoriesService';

jest.mock('../infra/sequelize/entities/Category.ts');

describe('Find all Category', () => {
  it('should be able to find all categories', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository
    );

    await createCategoryService.execute({
      name: 'Categoria ',
      description: 'Description 1',
      tenant_id: '1'
    });

    await createCategoryService.execute({
      name: 'Categoria 2',
      description: 'Description 2',
      tenant_id: '1'
    });

    await createCategoryService.execute({
      name: 'Categoria 3',
      description: 'Description 3',
      tenant_id: '1'
    });

    await createCategoryService.execute({
      name: 'Categoria 0',
      description: 'Description 0',
      tenant_id: '2'
    });

    const findAllCategoryService = new FindAllCategoriesService(
      fakeCategoryRepository
    );

    const categories = await findAllCategoryService.execute({
      limit: 10,
      offset: 1,
      tenant_id: '1'
    });

    expect(categories).toHaveProperty('rows');
    expect(categories).toHaveProperty('count');
    expect(categories.count).toBe(3);
  });
  // it('should not able to create a new category because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
