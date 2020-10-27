import { ICreateSubscriptionDTO } from '@modules/subscription/dtos/ICreateSubscriptionDTO';

export interface IValidateSubscriptionProvider {
  subscriptionBodyValidate({
    start_date,
    expires_date,
    remote_subscription_id,
    checkout_id,
    tenant_id
  }: ICreateSubscriptionDTO): ICreateSubscriptionDTO | null;
}
