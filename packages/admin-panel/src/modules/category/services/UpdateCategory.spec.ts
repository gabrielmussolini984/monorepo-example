import { FakeCategoryRepository } from '../repositories/fakes/FakeCategoryRepository';
import { CreateCategoryService } from './CreateCategoryService';
import { UpdateCategoryService } from './UpdateCategoryService';

jest.mock('../infra/sequelize/entities/Category.ts');

describe('Update Category', () => {
  it('should be able to update category', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository
    );

    const newCategory = await createCategoryService.execute({
      name: 'Categoria ',
      description: 'Description 1',
      tenant_id: '1'
    });

    const updateCategoryService = new UpdateCategoryService(
      fakeCategoryRepository
    );

    const categoryUpdated = await updateCategoryService.execute({
      name: 'Categoria Editada',
      description: 'Description Editada',
      id: newCategory.id
    });
    expect(categoryUpdated).toEqual(expect.arrayContaining([1]));
  });
  // it('should not able to create a new category because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
