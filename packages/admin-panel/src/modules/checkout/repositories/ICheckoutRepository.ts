import { Checkout } from '@modules/checkout/infra/sequelize/entities/Checkout';

// DTO's
import { ICreateCheckoutDTO } from '@modules/checkout/dtos/ICreateCheckoutDTO';
import { IUpdateCheckoutDTO } from '@modules/checkout/dtos/IUpdateCheckoutDTO';

export interface ICheckoutRepository {
  create(data: ICreateCheckoutDTO): Promise<Checkout>;
  findAndCountAll(data: {
    offset: number;
    limit: number;
  }): Promise<{
    rows: Checkout[];
    count: number;
  }>;
  update(data: IUpdateCheckoutDTO): Promise<[number, Checkout[]]>;
  delete({ id }: { id: string }): Promise<number>;
}
