import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/MainError';
import { Tenant } from '@modules/tenant/infra/sequelize/entities/Tenant';
import { ITenantRepository } from '@modules/tenant/repositories/ITenantRepository';
import { IValidateTenantProvider } from '@modules/tenant/providers/ValidateTenantProvider/models/IValidateTenantProvider';

interface IRequest {
  company: string;
  is_admin: boolean;
  fallback_subdomain: string;
}

@injectable()
export class CreateTenantService {
  constructor(
    @inject('TenantRepository')
    private tenantRepository: ITenantRepository,
    @inject('ValidateTenantProvider')
    private validateTenantProvider: IValidateTenantProvider
  ) {}

  public async execute({
    company,
    is_admin,
    fallback_subdomain
  }: IRequest): Promise<Tenant> {
    const validateParams = this.validateTenantProvider.tenantCreateValidate({
      company,
      fallback_subdomain,
      is_admin
    });
    if (!validateParams) throw new AppError('Missing params required', 400);

    const checkTenantExist = await this.tenantRepository.findByCompany({
      company
    });
    if (checkTenantExist) throw new AppError('Tenant already exists', 400);

    const tenant = await this.tenantRepository.create({
      company,
      is_admin,
      fallback_subdomain
    });

    return tenant;
  }
}
