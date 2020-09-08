import { inject, injectable } from 'tsyringe';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

interface IRequest {
  id: string;
}

@injectable()
export class FindByIdService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    // const checkCategoryExist = await this.CategoryRepository.findByName({name});
    const user = await this.userRepository.findById({ id });
    return user;
  }
}
