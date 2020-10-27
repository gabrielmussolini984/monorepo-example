// import uuid from 'uuid';
import { uuid } from 'uuidv4';
import { Tenant } from '@modules/tenant/infra/sequelize/entities/Tenant';
import { ITenantRepository } from '@modules/tenant/repositories/ITenantRepository';
// DTO's
import { ICreateTenantDTO } from '@modules/tenant/dtos/ITenantCreateDTO';

export class FakeTenantRepository implements ITenantRepository {
  private tenants: Tenant[] = [];

  public async create({
    company,
    fallback_subdomain,
    is_admin
  }: ICreateTenantDTO): Promise<Tenant> {
    const tenant = new Tenant();
    Object.assign(tenant, {
      id: uuid(),
      company,
      fallback_subdomain,
      is_admin
    });

    this.tenants.push(tenant);

    return tenant;
  }

  public async findBySubdomain({
    fallback_subdomain
  }: {
    fallback_subdomain: string;
  }): Promise<Tenant> {
    const tenant = this.tenants.find(
      (element) => element.fallback_subdomain === fallback_subdomain
    );
    return tenant;
  }

  public async findByCompany({
    company
  }: {
    company: string;
  }): Promise<Tenant> {
    const tenant = this.tenants.find((element) => element.company === company);
    return tenant;
  }
}
