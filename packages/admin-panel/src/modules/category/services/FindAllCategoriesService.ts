import { inject, injectable } from 'tsyringe';
import { Category } from '@modules/category/infra/sequelize/entities/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

interface IRequest {
  offset: number;
  limit: number;
  tenant_id: string;
}

@injectable()
export class FindAllCategoriesService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    offset,
    limit,
    tenant_id,
  }: IRequest): Promise<{
    rows: Category[];
    count: number;
  }> {
    const categories = await this.categoryRepository.findAndCountAll({
      offset,
      limit,
      tenant_id,
    });

    return categories;
  }
}
