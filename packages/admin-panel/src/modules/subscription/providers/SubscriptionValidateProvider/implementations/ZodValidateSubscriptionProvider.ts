import * as z from 'zod';
import { ICreateSubscriptionDTO } from '@modules/subscription/dtos/ICreateSubscriptionDTO';
import { IValidateSubscriptionProvider } from '../models/IValidateSubscriptionProvider';

const subscriptionSchema = z.object({
  start_date: z.date(),
  expires_date: z.date(),
  remote_subscription_id: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  checkout_id: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  tenant_id: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' })
});

export class ZodValidateSubscriptionProvider
  implements IValidateSubscriptionProvider {
  public subscriptionBodyValidate({
    start_date,
    expires_date,
    remote_subscription_id,
    checkout_id,
    tenant_id
  }: ICreateSubscriptionDTO): ICreateSubscriptionDTO | null {
    if (
      subscriptionSchema.check({
        start_date,
        expires_date,
        remote_subscription_id,
        checkout_id,
        tenant_id
      })
    )
      return {
        start_date,
        expires_date,
        remote_subscription_id,
        checkout_id,
        tenant_id
      };

    return null;
  }
}
