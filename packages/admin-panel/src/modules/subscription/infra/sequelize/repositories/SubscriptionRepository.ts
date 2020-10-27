import { Repository } from 'sequelize-typescript';
import { sequelize } from '@shared/infra/sequelize';
import { Subscription } from '@modules/subscription/infra/sequelize/entities/SubscriptionEntity';
import { ISubscriptionRepository } from '@modules/subscription/repositories/ISubscriptionRepository';
// DTO's
import { ICreateSubscriptionDTO } from '@modules/subscription/dtos/ICreateSubscriptionDTO';

export class SubscriptionRepository implements ISubscriptionRepository {
  private sequelizeRepository: Repository<Subscription>;

  constructor() {
    this.sequelizeRepository = sequelize.getRepository(Subscription);
  }

  public async create({
    start_date,
    expires_date,
    checkout_id,
    tenant_id
  }: ICreateSubscriptionDTO): Promise<Subscription> {
    const subscription = await this.sequelizeRepository.create({
      start_date,
      expires_date,
      checkout_id,
      tenant_id
    });
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
    const subscriptions = await this.sequelizeRepository.findAndCountAll({
      limit,
      order: [['created_at', 'DESC']],
      offset
    });
    return subscriptions;
  }

  public async update({
    id,
    start_date,
    expires_date,
    checkout_id
  }: {
    id: string;
    start_date: Date;
    expires_date: Date;
    checkout_id: string;
  }): Promise<[number, Subscription[]]> {
    const subscriptionUpdated = await this.sequelizeRepository.update(
      { start_date, expires_date, checkout_id },
      { where: { id } }
    );
    return subscriptionUpdated;
  }

  public async delete({ id }: { id: string }): Promise<number> {
    return this.sequelizeRepository.destroy({ where: { id } });
  }
}
