import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { CreateUserService } from './CreateUserService';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';

jest.mock('../infra/sequelize/entities/User.ts');

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
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
});