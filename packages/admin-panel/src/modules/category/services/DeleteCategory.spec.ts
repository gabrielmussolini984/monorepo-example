import { FakeCategoryRepository } from '../repositories/fakes/FakeCategoryRepository';
import { DeleteCategoryService } from './DeleteCategoryService';
import { CreateCategoryService } from './CreateCategoryService';

jest.mock('../infra/sequelize/entities/Category.ts');

describe('Delete Category', () => {
  it('should be able to delete category', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository
    );
    const newCategory = await createCategoryService.execute({
      name: 'Categoria 1',
      description: 'Description 1',
      tenant_id: '1'
    });
    const deleteCategoryService = new DeleteCategoryService(
      fakeCategoryRepository
    );

    const category = await deleteCategoryService.execute({
      id: newCategory.id
    });

    expect(category).toBe(1);
  });
  // it('should not able to create a new category because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
