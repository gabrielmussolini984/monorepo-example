import { Request, Response } from 'express';
import { CreateUserService } from '@modules/user/services/CreateUserService';
import { UserRepository } from '@modules/user/infra/sequelize/repositories/UserRepository';

export class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService(new UserRepository());
    await createUser.execute({
      name,
      email,
      password,
      tenant_id: req.tenant.id,
    });
    return res.json({ message: 'User has been create' });
  }
}
