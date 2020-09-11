import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/MainError';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { User } from '../infra/sequelize/entities/User';

interface IRequest {
  password: string;
  email: string;
  tenant_id: string;
}
@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
    tenant_id
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findByEmail({
      email,
      tenant_id
    });
    // console.log(user);
    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const passwordIsMatch = await this.hashProvider.compare(
      password,
      user.password
    );

    if (!passwordIsMatch)
      throw new AppError('Incorrect email/password combination', 401);

    return user;
  }
}
