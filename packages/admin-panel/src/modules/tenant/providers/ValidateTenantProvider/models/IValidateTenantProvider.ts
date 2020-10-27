import { ICreateTenantDTO } from '@modules/tenant/dtos/ITenantCreateDTO';

export interface IValidateTenantProvider {
  tenantCreateValidate({
    company,
    is_admin,
    fallback_subdomain
  }: ICreateTenantDTO): boolean;
}
