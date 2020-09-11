import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateUserService } from '@modules/user/services/CreateUserService';

export class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreateUserService);
    await createUser.execute({
      name,
      email,
      password,
      tenant_id: req.tenant.id
    });
    return res.json({ message: 'User has been create' });
  }
}
