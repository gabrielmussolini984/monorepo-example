import { Repository } from 'sequelize-typescript';
import { sequelize } from '@shared/infra/sequelize';
import { Tenant } from '@modules/tenant/infra/sequelize/entities/Tenant';
import { ITenantRepository } from '@modules/tenant/repositories/ITenantRepository';
import { ICreateTenantDTO } from '@modules/tenant/dtos/ITenantCreateDTO';

export class TenantRepository implements ITenantRepository {
  private sequelizeRepository: Repository<Tenant>;

  constructor() {
    this.sequelizeRepository = sequelize.getRepository(Tenant);
  }

  public async findBySubdomain({
    fallback_subdomain
  }: {
    fallback_subdomain: string;
  }): Promise<Tenant> {
    const tenant = await this.sequelizeRepository.findOne({
      where: { fallback_subdomain },
      raw: true
    });
    return tenant;
  }

  public async findByCompany({
    company
  }: {
    company: string;
  }): Promise<Tenant> {
    const tenant = await this.sequelizeRepository.findOne({
      where: { company }
    });
    return tenant;
  }

  public async create({
    company,
    fallback_subdomain,
    is_admin = false
  }: ICreateTenantDTO): Promise<Tenant> {
    return this.sequelizeRepository.create({
      company,
      fallback_subdomain,
      is_admin
    });
  }
}
