import { Repository } from 'sequelize-typescript';
import { sequelize } from '@shared/infra/sequelize';
import { Checkout } from '@modules/checkout/infra/sequelize/entities/Checkout';
import { ICheckoutRepository } from '@modules/checkout/repositories/ICheckoutRepository';
// DTO's
import { ICreateCheckoutDTO } from '@modules/checkout/dtos/ICreateCheckoutDTO';
import { IUpdateCheckoutDTO } from '@modules/checkout/dtos/IUpdateCheckoutDTO';

export class CheckoutRepository implements ICheckoutRepository {
  private sequelizeRepository: Repository<Checkout>;

  constructor() {
    this.sequelizeRepository = sequelize.getRepository(Checkout);
  }

  public async create({
    customer_id,
    status,
    price,
    plan_id
  }: ICreateCheckoutDTO): Promise<Checkout> {
    const checkout = await this.sequelizeRepository.create({
      customer_id,
      status,
      price,
      plan_id
    });
    return checkout;
  }

  public async findAndCountAll({
    offset,
    limit
  }: {
    offset: number;
    limit: number;
  }): Promise<{
    rows: Checkout[];
    count: number;
  }> {
    const checkouts = await this.sequelizeRepository.findAndCountAll({
      limit,
      order: [['created_at', 'DESC']],
      offset
    });
    return checkouts;
  }

  public async update({
    customer_id,
    plan_id,
    price,
    status,
    id
  }: IUpdateCheckoutDTO): Promise<[number, Checkout[]]> {
    const checkoutUpdated = await this.sequelizeRepository.update(
      {
        customer_id,
        plan_id,
        price,
        status
      },
      { where: { id } }
    );
    return checkoutUpdated;
  }

  public async delete({ id }: { id: string }): Promise<number> {
    return this.sequelizeRepository.destroy({ where: { id } });
  }
}
