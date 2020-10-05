/* eslint-disable */
import { Request, Response } from 'express';

export class Controller {
  // Example => public async index(req: Request, res: Response): Promise<Response> {}
  public async index(req: Request, res: Response): Promise<void> {}

  public async store(req: Request, res: Response): Promise<void> {}

  public async update(req: Request, res: Response): Promise<void> {}

  public async delete(req: Request, res: Response): Promise<void> {}
}
