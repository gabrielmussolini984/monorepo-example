import { ICreateSubscriptionDTO } from '@modules/subscription/dtos/ICreateSubscriptionDTO';
import { IValidateSubscriptionProvider } from '../models/IValidateSubscriptionProvider';

export class FakeValidateSubscriptionProvider
  implements IValidateSubscriptionProvider {
  public subscriptionBodyValidate({
    start_date,
    expires_date,
    remote_subscription_id,
    checkout_id,
    tenant_id
  }: ICreateSubscriptionDTO): ICreateSubscriptionDTO | null {
    if (
      start_date < new Date() &&
      expires_date > new Date() &&
      remote_subscription_id.length > 5 &&
      checkout_id.length > 5 &&
      tenant_id.length > 5
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
