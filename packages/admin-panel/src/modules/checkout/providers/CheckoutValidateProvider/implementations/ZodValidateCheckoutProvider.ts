import * as z from 'zod';
import { ICreateCheckoutDTO } from '@modules/checkout/dtos/ICreateCheckoutDTO';
import { IValidateCheckoutProvider } from '../models/IValidateCheckoutProvider';

const checkoutSchema = z.object({
  customer_id: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  plan_id: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  price: z.number(),
  status: z.boolean()
});

export class ZodValidateCheckoutProvider implements IValidateCheckoutProvider {
  public checkoutBodyValidate({
    customer_id,
    plan_id,
    price,
    status
  }: ICreateCheckoutDTO): ICreateCheckoutDTO | null {
    if (checkoutSchema.check({ customer_id, plan_id, price, status }))
      return { customer_id, plan_id, price, status };

    return null;
  }
}
