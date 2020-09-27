import { ICategoryValidate } from '@modules/category/dtos/ICategoryValidate';
import { IValidateCategoryProvider } from '../models/IValidateCategoryProvider';

export class FakeValidateCategoryProvider implements IValidateCategoryProvider {
  public categoryBodyValidate({
    name,
    description,
    tenant_id
  }: {
    name: string;
    description: string;
    tenant_id: string;
  }): ICategoryValidate {
    if (name.length > 5 && description.length > 5 && tenant_id.length)
      return { result: true, data: { name, description, tenant_id } };
    return { result: false };
  }
}
