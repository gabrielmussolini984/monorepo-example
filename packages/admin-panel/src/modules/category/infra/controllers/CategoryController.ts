import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryService } from '@modules/category/services/CreateCategoryService';
import { FindAllCategoriesService } from '@modules/category/services/FindAllCategoriesService';
import { UpdateCategoryService } from '@modules/category/services/UpdateCategoryService';
import { DeleteCategoryService } from '@modules/category/services/DeleteCategoryService';

export class CategoryController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { length: limit, start: offset } = req.query;

    const findAllCategories = container.resolve(FindAllCategoriesService);
    const categories = await findAllCategories.execute({
      offset: Number(offset),
      limit: Number(limit),
      tenant_id: req.tenant.id
    });

    return res.json({
      draw: req.params.draw,
      recordsTotal: categories.count,
      data: categories.rows,
      recordsFiltered: categories.count
    });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createCategory = container.resolve(CreateCategoryService);
    await createCategory.execute({
      name,
      description,
      tenant_id: req.tenant.id
    });
    return res.json({ message: 'Category has been create' });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const { id } = req.params;
    const updateCategory = container.resolve(UpdateCategoryService);
    await updateCategory.execute({ name, description, id });
    return res.json({ message: 'Category has been updated ' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCategory = container.resolve(DeleteCategoryService);
    await deleteCategory.execute({ id });
    return res.json({ message: 'Category has been deleted' });
  }
}
