import { inject, injectable } from 'tsyringe';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  tenant_id: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    tenant_id
  }: IRequest): Promise<User> {
    // const checkCategoryExist = await this.CategoryRepository.findByName({name});
    const passwordHashed = await this.hashProvider.generate(password);
    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
      tenant_id
    });
    return user;
  }
}
