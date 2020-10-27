import { uuid } from 'uuidv4';
import { Subscription } from '@modules/subscription/infra/sequelize/entities/SubscriptionEntity';
import { ISubscriptionRepository } from '@modules/subscription/repositories/ISubscriptionRepository';
// DTO's
import { ICreateSubscriptionDTO } from '@modules/subscription/dtos/ICreateSubscriptionDTO';

export class FakeSubscriptionRepository implements ISubscriptionRepository {
  private subscriptions: Subscription[] = [];

  public async create({
    start_date,
    expires_date,
    remote_subscription_id,
    checkout_id,
    tenant_id
  }: ICreateSubscriptionDTO): Promise<Subscription> {
    const subscription = new Subscription();
    Object.assign(subscription, {
      id: uuid(),
      start_date,
      expires_date,
      remote_subscription_id,
      checkout_id,
      tenant_id
    });

    this.subscriptions.push(subscription);

    return subscription;
  }

  public async findAndCountAll({
    offset,
    limit
  }: {
    offset: number;
    limit: number;
  }): Promise<{
    rows: Subscription[];
    count: number;
  }> {
    const subscriptions = this.subscriptions.slice(offset, offset + limit);

    return { rows: subscriptions, count: this.subscriptions.length - 1 };
  }

  public async update({
    start_date,
    expires_date,
    remote_subscription_id,
    checkout_id,
    tenant_id,
    id
  }: {
    start_date: Date;
    expires_date: Date;
    remote_subscription_id: string;
    checkout_id: string;
    tenant_id: string;
    id: string;
  }): Promise<[number, Subscription[]]> {
    const subscriptionUpdated = this.subscriptions.map((subscription) => {
      if (subscription.id === id) {
        Object.assign(subscription, {
          start_date,
          expires_date,
          remote_subscription_id,
          checkout_id,
          tenant_id
        });
      }
      return subscription;
    });
    return [1, subscriptionUpdated];
  }

  public async delete({ id }: { id: string }): Promise<number> {
    this.subscriptions = this.subscriptions.filter(
      (subscription) => subscription.id !== id
    );
    return 1;
  }
}
