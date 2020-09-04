import bcrypt from 'bcryptjs';
import { User } from '@modules/user/infra/sequelize/entities/User';

interface IRequest {
  user: User;
  password: string;
}

export class ComparePasswordService {
  public async execute({ user, password }: IRequest): Promise<boolean> {
    const passwordIsMatch = await bcrypt.compare(password, user.password_hash);
    return passwordIsMatch;
  }
}
