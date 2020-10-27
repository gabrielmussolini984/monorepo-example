import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/MainError';
import { Checkout } from '@modules/checkout/infra/sequelize/entities/Checkout';
import { IValidateCheckoutProvider } from '@modules/checkout/providers/CheckoutValidateProvider/models/IValidateCheckoutProvider';
import { ICheckoutRepository } from '@modules/checkout/repositories/ICheckoutRepository';

interface IRequest {
  customer_id: string;
  plan_id: string;
  price: number;
  status: boolean;
}

@injectable()
export class CreateCheckoutService {
  constructor(
    @inject('CheckoutRepository')
    private checkoutRepository: ICheckoutRepository,
    @inject('ValidateCheckoutProvider')
    private validateCheckoutProvider: IValidateCheckoutProvider
  ) {}

  public async execute({
    customer_id,
    plan_id,
    price,
    status
  }: IRequest): Promise<Checkout> {
    const validateParams = this.validateCheckoutProvider.checkoutBodyValidate({
      customer_id,
      plan_id,
      price,
      status
    });
    if (!validateParams) throw new AppError('Missing params required', 400);

    const checkout = await this.checkoutRepository.create({
      price,
      plan_id,
      customer_id,
      status
    });

    return checkout;
  }
}
