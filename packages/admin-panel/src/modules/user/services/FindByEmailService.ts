import { inject, injectable } from 'tsyringe';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

interface IRequest {
  email: string;
  tenant_id: string;
}

@injectable()
export class FindByEmailService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async execute({ email, tenant_id }: IRequest): Promise<User> {
    // const checkCategoryExist = await this.CategoryRepository.findByName({name});
    const user = await this.userRepository.findByEmail({ email, tenant_id });
    return user;
  }
}
