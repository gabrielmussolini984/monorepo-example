import { inject, injectable } from 'tsyringe';
import { Category } from '@modules/category/infra/sequelize/entities/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
  tenant_id: string;
}

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute({
    name,
    description,
    tenant_id
  }: IRequest): Promise<Category> {
    // const checkCategoryExist = await this.categoryRepository.findByName({
    //   name,
    //   tenant_id
    // });
    // if (checkCategoryExist) return null;
    const category = await this.categoryRepository.create({
      name,
      description,
      tenant_id
    });

    return category;
  }
}
