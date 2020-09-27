import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/MainError';
import { Category } from '@modules/category/infra/sequelize/entities/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { IValidateCategoryProvider } from '@modules/category/providers/ValidateCategoryProvider/models/IValidateCategoryProvider';

interface IRequest {
  name: string;
  description: string;
  tenant_id: string;
}

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
    @inject('ValidateCategoryProvider')
    private validateCategoryProvider: IValidateCategoryProvider
  ) {}

  public async execute({
    name,
    description,
    tenant_id
  }: IRequest): Promise<Category> {
    const validateParams = this.validateCategoryProvider.categoryBodyValidate({
      name,
      description,
      tenant_id
    });
    if (!validateParams.result)
      throw new AppError('Missing params required', 400);

    const checkCategoryExist = await this.categoryRepository.findByName({
      name,
      tenant_id
    });
    if (checkCategoryExist) throw new AppError('Category already exists', 400);
    const category = await this.categoryRepository.create({
      name,
      description,
      tenant_id
    });

    return category;
  }
}
