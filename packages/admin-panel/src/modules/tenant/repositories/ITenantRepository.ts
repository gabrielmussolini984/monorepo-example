import { Tenant } from '@modules/tenant/infra/sequelize/entities/Tenant';
import { ICreateTenantDTO } from '../dtos/ITenantCreateDTO';

export interface ITenantRepository {
  create({
    company,
    fallback_subdomain,
    is_admin
  }: ICreateTenantDTO): Promise<Tenant>;
  findBySubdomain({
    fallback_subdomain
  }: {
    fallback_subdomain: string;
  }): Promise<Tenant>;
  findByCompany({ company }: { company: string }): Promise<Tenant>;
}
