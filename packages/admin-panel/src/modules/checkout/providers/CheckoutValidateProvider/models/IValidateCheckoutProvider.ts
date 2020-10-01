import { ICreateCheckoutDTO } from '@modules/checkout/dtos/ICreateCheckoutDTO';

export interface IValidateCheckoutProvider {
  checkoutBodyValidate({
    customer_id,
    plan_id,
    price,
    status
  }: ICreateCheckoutDTO): ICreateCheckoutDTO | null;
}
