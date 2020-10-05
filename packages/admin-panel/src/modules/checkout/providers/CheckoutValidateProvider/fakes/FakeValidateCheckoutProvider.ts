import { ICreateCheckoutDTO } from '@modules/checkout/dtos/ICreateCheckoutDTO';
import { IValidateCheckoutProvider } from '../models/IValidateCheckoutProvider';

export class FakeValidateCheckoutProvider implements IValidateCheckoutProvider {
  public checkoutBodyValidate({
    customer_id,
    plan_id,
    price,
    status
  }: ICreateCheckoutDTO): ICreateCheckoutDTO | null {
    if (
      customer_id.length > 5 &&
      plan_id.length > 5 &&
      price > 1 &&
      (status || !status)
    )
      return { customer_id, plan_id, price, status };
    return null;
  }
}
