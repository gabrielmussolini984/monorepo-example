import { FakeCategoryRepository } from '../repositories/fakes/FakeCategoryRepository';
import { CreateCategoryService } from './CreateCategoryService';

jest.mock('../infra/sequelize/entities/Category.ts');

describe('Create Category', () => {
  it('should be able to create a new category', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository
    );

    const category = await createCategoryService.execute({
      name: 'Categoria 1',
      description: 'Description 1',
      tenant_id: '1'
    });

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('Categoria 1');
    expect(category.description).toBe('Description 1');
    expect(category.tenant_id).toBe('1');
  });
  // it('should not able to create a new category because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
