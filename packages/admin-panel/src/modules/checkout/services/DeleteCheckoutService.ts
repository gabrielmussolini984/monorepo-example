import { inject, injectable } from 'tsyringe';
import { ICheckoutRepository } from '@modules/checkout/repositories/ICheckoutRepository';

@injectable()
export class DeleteCheckoutService {
  constructor(
    @inject('CheckoutRepository')
    private checkoutRepository: ICheckoutRepository
  ) {}

  public async execute({ id }: { id: string }): Promise<number> {
    const checkoutDeleted = await this.checkoutRepository.delete({ id });

    return checkoutDeleted;
  }
}
