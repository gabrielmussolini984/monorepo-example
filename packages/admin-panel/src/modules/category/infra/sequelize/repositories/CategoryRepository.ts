import { Repository } from 'sequelize-typescript';
import { sequelize } from '@shared/infra/sequelize';
import { Category } from '@modules/category/infra/sequelize/entities/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
// DTO's
import { IFindAndCountAllDTO } from '@modules/category/dtos/IFindAndCountAllDTO';
import { ICreateCategoryDTO } from '@modules/category/dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from '@modules/category/dtos/IUpdateCategoryDTO';

export class CategoryRepository implements ICategoryRepository {
  private sequelizeRepository: Repository<Category>;

  constructor() {
    this.sequelizeRepository = sequelize.getRepository(Category);
  }

  public async create({
    name,
    description,
    tenant_id,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = await this.sequelizeRepository.create({
      name,
      description,
      tenant_id,
    });
    return category;
  }

  async findAndCountAll({
    offset,
    limit,
    tenant_id,
  }: IFindAndCountAllDTO): Promise<{
    rows: Category[];
    count: number;
  }> {
    const categories = await this.sequelizeRepository.findAndCountAll({
      where: { tenant_id },
      limit,
      order: [['created_at', 'DESC']],
      offset,
    });
    return categories;
  }

  public async update({
    name,
    description,
    id,
  }: IUpdateCategoryDTO): Promise<[number, Category[]]> {
    const categoryUpdated = await this.sequelizeRepository.update(
      {
        name,
        description,
      },
      { where: { id } },
    );
    return categoryUpdated;
  }

  public async delete({ id }: { id: string }): Promise<number> {
    return this.sequelizeRepository.destroy({ where: { id } });
  }
}
