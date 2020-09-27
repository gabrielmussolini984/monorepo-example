import { Category } from '@modules/category/infra/sequelize/entities/Category';

// DTO's
import { IFindAndCountAllDTO } from '@modules/category/dtos/IFindAndCountAllDTO';
import { ICreateCategoryDTO } from '@modules/category/dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from '@modules/category/dtos/IUpdateCategoryDTO';

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findAndCountAll(
    data: IFindAndCountAllDTO
  ): Promise<{
    rows: Category[];
    count: number;
  }>;
  findByName({
    name,
    tenant_id
  }: {
    name: string;
    tenant_id: string;
  }): Promise<Category | undefined>;
  update(data: IUpdateCategoryDTO): Promise<[number, Category[]]>;
  delete({ id }: { id: string }): Promise<number>;
  // findByName(name: string, tenant_id: string): Promise<Category>;
}
