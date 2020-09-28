import * as z from 'zod';
import { ICategoryValidate } from '@modules/category/dtos/ICategoryValidate';
import { IValidateCategoryProvider } from '../models/IValidateCategoryProvider';

const categorySchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  description: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' }),
  tenant_id: z.string().min(3, { message: 'Must be 5 or more characters long' })
});

export class ZodValidateCategoryProvider implements IValidateCategoryProvider {
  public categoryBodyValidate({
    name,
    description,
    tenant_id
  }: {
    name: string;
    description: string;
    tenant_id: string;
  }): ICategoryValidate {
    if (categorySchema.check({ name, description, tenant_id }))
      return { result: true, data: { name, description, tenant_id } };

    return {
      result: false
    };
  }
}
