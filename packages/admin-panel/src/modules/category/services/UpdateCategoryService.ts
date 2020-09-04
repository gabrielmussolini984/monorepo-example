import { inject, injectable } from 'tsyringe';
import { Category } from '@modules/category/infra/sequelize/entities/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
  id: string;
}
@injectable()
export class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    name,
    description,
    id,
  }: IRequest): Promise<[number, Category[]]> {
    const categoryUpdated = await this.categoryRepository.update({
      name,
      description,
      id,
    });

    return categoryUpdated;
  }
}
