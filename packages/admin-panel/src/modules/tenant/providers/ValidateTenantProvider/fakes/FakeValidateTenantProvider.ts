import { ICreateTenantDTO } from '@modules/tenant/dtos/ITenantCreateDTO';
import { IValidateTenantProvider } from '../models/IValidateTenantProvider';

export class FakeValidateTenantProvider implements IValidateTenantProvider {
  public tenantCreateValidate({
    company,
    is_admin,
    fallback_subdomain
  }: ICreateTenantDTO): boolean {
    if (
      company.length > 5 &&
      fallback_subdomain.length > 5 &&
      (!is_admin || !!is_admin)
    )
      return true;
    return false;
  }
}
