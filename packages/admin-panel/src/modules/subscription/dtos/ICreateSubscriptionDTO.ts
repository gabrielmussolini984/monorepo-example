export interface ICreateSubscriptionDTO {
  start_date: Date;
  expires_date: Date;
  remote_subscription_id: string;
  checkout_id: string;
  tenant_id: string;
}
