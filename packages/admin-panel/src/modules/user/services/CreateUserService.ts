import { inject, injectable } from 'tsyringe';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  tenant_id: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async execute({
    name,
    email,
    password,
    tenant_id
  }: IRequest): Promise<User> {
    // const checkCategoryExist = await this.CategoryRepository.findByName({name});
    const user = await this.userRepository.create({
      name,
      email,
      password,
      tenant_id
    });
    return user;
  }
}
