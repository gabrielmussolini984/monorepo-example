import { Tenant } from '@modules/tenant/infra/sequelize/entities/Tenant';

export interface ITenantRepository {
  findBySubdomain({
    fallback_subdomain
  }: {
    fallback_subdomain: string;
  }): Promise<Tenant>;
}
