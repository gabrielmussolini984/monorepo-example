import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCheckoutService } from '@modules/checkout/services/CreateCheckoutService';
import { DeleteCheckoutService } from '@modules/checkout/services/DeleteCheckoutService';
import { FindAllCheckoutsService } from '@modules/checkout/services/FindAllCheckoutsService';
import { UpdateCheckoutService } from '@modules/checkout/services/UpdateCheckoutService';

export class CheckoutController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { length: limit, start: offset } = req.query;
    const findAllCheckouts = container.resolve(FindAllCheckoutsService);
    const checkouts = await findAllCheckouts.execute({
      offset: Number(offset),
      limit: Number(limit)
    });

    return res.json({
      draw: req.params.draw,
      recordsTotal: checkouts.count,
      data: checkouts.rows,
      recordsFiltered: checkouts.count
    });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const {
      price = null,
      status = null,
      customer_id = null,
      plan_id = null
    } = req.body;
    const createCheckout = container.resolve(CreateCheckoutService);
    await createCheckout.execute({
      price,
      status,
      customer_id,
      plan_id
    });
    return res.json({ message: 'Checkout has been create' });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      price = null,
      status = null,
      customer_id = null,
      plan_id = null
    } = req.body;
    const { id } = req.params;
    const updateCheckout = container.resolve(UpdateCheckoutService);
    await updateCheckout.execute({
      status,
      customer_id,
      price,
      plan_id,
      id
    });
    return res.json({ message: 'Checkout has been updated ' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCheckout = container.resolve(DeleteCheckoutService);
    await deleteCheckout.execute({ id });
    return res.json({ message: 'Checkout has been deleted' });
  }
}
