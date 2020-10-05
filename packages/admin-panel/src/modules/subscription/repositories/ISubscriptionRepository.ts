import { Subscription } from '@modules/subscription/infra/sequelize/entities/SubscriptionEntity';

// DTO's
import { ICreateSubscriptionDTO } from '@modules/subscription/dtos/ICreateSubscriptionDTO';

export interface ISubscriptionRepository {
  create(data: ICreateSubscriptionDTO): Promise<Subscription>;
  findAndCountAll(data: {
    offset: number;
    limit: number;
  }): Promise<{
    rows: Subscription[];
    count: number;
  }>;
  update({
    start_date,
    expires_date,
    remote_subscription_id,
    checkout_id,
    id
  }: {
    start_date: Date;
    expires_date: Date;
    remote_subscription_id: string;
    checkout_id: string;
    id: string;
  }): Promise<[number, Subscription[]]>;
  delete({ id }: { id: string }): Promise<number>;
}
