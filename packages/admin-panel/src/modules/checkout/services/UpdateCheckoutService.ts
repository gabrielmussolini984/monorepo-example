import { inject, injectable } from 'tsyringe';
import { Checkout } from '@modules/checkout/infra/sequelize/entities/Checkout';
import { ICheckoutRepository } from '@modules/checkout/repositories/ICheckoutRepository';

interface IRequest {
  plan_id: string;
  status: boolean;
  price: number;
  customer_id: string;
  id: string;
}
@injectable()
export class UpdateCheckoutService {
  constructor(
    @inject('CheckoutRepository')
    private checkoutRepository: ICheckoutRepository
  ) {}

  public async execute({
    plan_id,
    status,
    price,
    customer_id,
    id
  }: IRequest): Promise<[number, Checkout[]]> {
    const checkoutUpdated = await this.checkoutRepository.update({
      plan_id,
      status,
      price,
      customer_id,
      id
    });

    return checkoutUpdated;
  }
}
