import { User } from '@modules/user/infra/sequelize/entities/User';

// DTO's
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail({
    email,
    tenant_id,
  }: {
    email: string;
    tenant_id: string;
  }): Promise<User>;
  findById({ id }: { id: string }): Promise<User>;
}
