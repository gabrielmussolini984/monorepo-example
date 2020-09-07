import uuid from 'uuid';
import { Category } from '@modules/category/infra/sequelize/entities/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
// DTO's
import { IFindAndCountAllDTO } from '@modules/category/dtos/IFindAndCountAllDTO';
import { ICreateCategoryDTO } from '@modules/category/dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from '@modules/category/dtos/IUpdateCategoryDTO';

export class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  public async create({
    name,
    description,
    tenant_id
  }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();
    Object.assign(category, { id: uuid.v4(), name, description, tenant_id });

    this.categories.push(category);

    return category;
  }

  async findAndCountAll({
    offset,
    limit,
    tenant_id
  }: IFindAndCountAllDTO): Promise<{
    rows: Category[];
    count: number;
  }> {
    let categories = this.categories.filter(
      (category) => category.tenant_id === tenant_id
    );
    categories = categories.slice(offset, offset + limit);

    return { rows: categories, count: this.categories.length - 1 };
  }

  public async update({
    name,
    description,
    id
  }: IUpdateCategoryDTO): Promise<[number, Category[]]> {
    // const categoryExist = this.categories.find(
    //   (category) => category.id === id
    // );
    // if (!categoryExist) return [0, this.categories];
    const categoryUpdated = this.categories.map((category) => {
      if (category.id === id) {
        Object.assign(category, { name, description });
      }
      return category;
    });
    return [1, categoryUpdated];
  }

  public async delete({ id }: { id: string }): Promise<number> {
    // const categoryExist = this.categories.find(
    //   (category) => category.id === id
    // );
    // if (!categoryExist) return 0;
    this.categories = this.categories.filter((category) => category.id !== id);
    return 1;
  }
}
