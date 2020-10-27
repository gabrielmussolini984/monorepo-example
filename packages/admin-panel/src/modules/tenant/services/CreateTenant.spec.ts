import { FakeValidateTenantProvider } from '../providers/ValidateTenantProvider/fakes/FakeValidateTenantProvider';
import { FakeTenantRepository } from '../repositories/fakes/FakeTenantRepository';
import { CreateTenantService } from './CreateTenantService';
import { AppError } from '../../../shared/errors/MainError';

jest.mock('../infra/sequelize/entities/Tenant.ts');

describe('Create Customer', () => {
  it('should be able to create a new tenant', async () => {
    const fakeTenantRepository = new FakeTenantRepository();
    const fakeValidateTenantProvider = new FakeValidateTenantProvider();
    const createTenantService = new CreateTenantService(
      fakeTenantRepository,
      fakeValidateTenantProvider
    );

    const tenant = await createTenantService.execute({
      company: 'Store01',
      fallback_subdomain: 'store01',
      is_admin: false
    });
    expect(tenant).toHaveProperty('id');
    expect(tenant.company).toBe('Store01');
    expect(tenant.fallback_subdomain).toBe('store01');
    expect(tenant.is_admin).toBe(false);
  });

  it('should not be able to create a new tenant because invalid params', async () => {
    const fakeTenantRepository = new FakeTenantRepository();
    const fakeValidateTenantProvider = new FakeValidateTenantProvider();
    const createTenantService = new CreateTenantService(
      fakeTenantRepository,
      fakeValidateTenantProvider
    );

    await expect(
      createTenantService.execute({
        company: '',
        fallback_subdomain: '',
        is_admin: false
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new tenant because company tenant already exists', async () => {
    const fakeTenantRepository = new FakeTenantRepository();
    const fakeValidateTenantProvider = new FakeValidateTenantProvider();
    const createTenantService = new CreateTenantService(
      fakeTenantRepository,
      fakeValidateTenantProvider
    );
    await createTenantService.execute({
      company: 'Store01',
      fallback_subdomain: 'store01',
      is_admin: false
    });
    await expect(
      createTenantService.execute({
        company: 'Store01',
        fallback_subdomain: 'store01',
        is_admin: false
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
