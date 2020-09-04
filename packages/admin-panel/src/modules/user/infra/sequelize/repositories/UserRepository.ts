import { Repository } from 'sequelize-typescript';
import { sequelize } from '@shared/infra/sequelize';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
// DTO's
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';

export class UserRepository implements IUserRepository {
  private sequelizeRepository: Repository<User>;

  constructor() {
    this.sequelizeRepository = sequelize.getRepository(User);
  }

  public async findByEmail({
    email,
    tenant_id,
  }: {
    email: string;
    tenant_id: string;
  }): Promise<User> {
    const user = await this.sequelizeRepository.findOne({
      where: { email, tenant_id },
    });
    return user;
  }

  public async findById({ id }: { id: string }): Promise<User> {
    const user = await this.sequelizeRepository.findOne({ where: { id } });
    return user;
  }

  public async create({
    name,
    email,
    password,
    tenant_id,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.sequelizeRepository.create({
      name,
      email,
      password,
      tenant_id,
    });
    return user;
  }
}
