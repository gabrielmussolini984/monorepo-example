import { ICategoryValidate } from '@modules/category/dtos/ICategoryValidate';

export interface IValidateCategoryProvider {
  categoryBodyValidate({
    name,
    description,
    tenant_id
  }: {
    name: string;
    description: string;
    tenant_id: string;
  }): ICategoryValidate;
}
