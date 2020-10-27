import { inject, injectable } from 'tsyringe';
import { Checkout } from '@modules/checkout/infra/sequelize/entities/Checkout';
import { ICheckoutRepository } from '@modules/checkout/repositories/ICheckoutRepository';

interface IRequest {
  offset: number;
  limit: number;
}

@injectable()
export class FindAllCheckoutsService {
  constructor(
    @inject('CheckoutRepository')
    private checkoutRepository: ICheckoutRepository
  ) {}

  public async execute({
    offset,
    limit
  }: IRequest): Promise<{
    rows: Checkout[];
    count: number;
  }> {
    const checkouts = await this.checkoutRepository.findAndCountAll({
      offset,
      limit
    });

    return checkouts;
  }
}
