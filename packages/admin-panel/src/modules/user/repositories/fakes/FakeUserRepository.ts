import { uuid } from 'uuidv4';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
// DTO's
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';

export class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
    tenant_id
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
      tenant_id
    });

    this.users.push(user);

    return user;
  }

  public async findByEmail({
    email,
    tenant_id
  }: {
    email: string;
    tenant_id: string;
  }): Promise<User> {
    return this.users.find(
      (user) => user.email === email && user.tenant_id === tenant_id
    );
  }

  public async findById({ id }: { id: string }): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
