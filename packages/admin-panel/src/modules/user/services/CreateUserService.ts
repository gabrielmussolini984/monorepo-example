import { inject, injectable } from 'tsyringe';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IValidateProvider } from '../providers/ValidateProvider/models/IValidateProvider';

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
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('ValidateProvider') private validateProvider: IValidateProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    tenant_id
  }: IRequest): Promise<User> {
    this.validateProvider.userBodyValidate({
      name,
      email,
      password,
      tenant_id
    });
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
