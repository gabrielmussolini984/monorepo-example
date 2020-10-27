import * as z from 'zod';
import { ICreateTenantDTO } from '@modules/tenant/dtos/ITenantCreateDTO';
import { IValidateTenantProvider } from '../models/IValidateTenantProvider';

const tenantSchema = z.object({
  company: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  fallback_subdomain: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' }),
  is_admin: z.boolean()
});

export class ZodValidateTenantProvider implements IValidateTenantProvider {
  public tenantCreateValidate({
    company,
    fallback_subdomain,
    is_admin
  }: ICreateTenantDTO): boolean {
    return tenantSchema.check({ company, fallback_subdomain, is_admin });
  }
}
