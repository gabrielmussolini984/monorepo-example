import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/MainError';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IValidateUserProvider } from '../providers/ValidateUserProvider/models/IValidateUserProvider';

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
    @inject('ValidateUserProvider')
    private validateUserProvider: IValidateUserProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    tenant_id
  }: IRequest): Promise<User> {
    const validateParams = this.validateUserProvider.userBodyValidate({
      name,
      email,
      password,
      tenant_id
    });
    if (!validateParams.result)
      throw new AppError('Missing params required', 400);

    const checkUserExist = await this.userRepository.findByEmail({
      email,
      tenant_id
    });
    if (checkUserExist) throw new AppError('Email already exists', 400);

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
