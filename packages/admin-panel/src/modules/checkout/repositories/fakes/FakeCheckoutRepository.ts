import { uuid } from 'uuidv4';
import { Checkout } from '@modules/checkout/infra/sequelize/entities/Checkout';
import { ICheckoutRepository } from '@modules/checkout/repositories/ICheckoutRepository';
// DTO's
import { ICreateCheckoutDTO } from '@modules/checkout/dtos/ICreateCheckoutDTO';
import { IUpdateCheckoutDTO } from '@modules/checkout/dtos/IUpdateCheckoutDTO';

export class FakeCheckoutRepository implements ICheckoutRepository {
  private checkouts: Checkout[] = [];

  public async create({
    customer_id,
    plan_id,
    price,
    status
  }: ICreateCheckoutDTO): Promise<Checkout> {
    const checkout = new Checkout();
    Object.assign(checkout, {
      id: uuid(),
      price,
      status,
      customer_id,
      plan_id
    });

    this.checkouts.push(checkout);

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
    const checkouts = this.checkouts.slice(offset, offset + limit);

    return { rows: checkouts, count: this.checkouts.length - 1 };
  }

  public async update({
    customer_id,
    plan_id,
    price,
    status,
    id
  }: IUpdateCheckoutDTO): Promise<[number, Checkout[]]> {
    const checkoutUpdated = this.checkouts.map((checkout) => {
      if (checkout.id === id) {
        Object.assign(checkout, {
          customer_id,
          plan_id,
          price,
          status
        });
      }
      return checkout;
    });
    return [1, checkoutUpdated];
  }

  public async delete({ id }: { id: string }): Promise<number> {
    this.checkouts = this.checkouts.filter((checkout) => checkout.id !== id);
    return 1;
  }
}
