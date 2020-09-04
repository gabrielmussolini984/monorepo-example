import { Request, Response } from 'express';

export class SessionController {
  public async index(req: Request, res: Response): Promise<void> {
    if (req.user) {
      return res.render('dashboard', {
        activeGraphic: 'active',
        activeOne: 'active',
        title: 'Gráficos',
      });
    }
    return res.render('login', {
      layout: 'mainLogin',
      tenant: req.tenant,
    });
  }
}
