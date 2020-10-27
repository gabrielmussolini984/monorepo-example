import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeValidateUserProvider } from '../providers/ValidateUserProvider/fakes/FakeValidateUserProvider';
import { CreateUserService } from './CreateUserService';
import { AppError } from '../../../shared/errors/MainError';

jest.mock('../infra/sequelize/entities/User.ts');

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUserRepository();
    const fakeValidateProvider = new FakeValidateUserProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeValidateProvider
    );
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      tenant_id: '1'
    });
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('tenant_id');
  });

  it('should not be able to create a new user because invalid params', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUserRepository();
    const fakeValidateProvider = new FakeValidateUserProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeValidateProvider
    );

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: '',
        password: '',
        tenant_id: '1'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user because user email exist', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUserRepository();
    const fakeValidateProvider = new FakeValidateUserProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeValidateProvider
    );
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      password: '123456',
      tenant_id: '1'
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@teste.com',
        password: '123456',
        tenant_id: '1'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
