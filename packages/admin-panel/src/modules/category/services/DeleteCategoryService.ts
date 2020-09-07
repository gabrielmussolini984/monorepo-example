import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

@injectable()
export class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute({ id }: { id: string }): Promise<number> {
    const categoryDeleted = await this.categoryRepository.delete({ id });

    return categoryDeleted;
  }
}
