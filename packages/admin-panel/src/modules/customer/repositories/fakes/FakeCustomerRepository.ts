import uuid from 'uuid';
import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';
import { ICustomerRepository } from '@modules/customer/repositories/ICustomerRepository';
// DTO's
import { ICreateCustomerDTO } from '@modules/customer/dtos/ICreateCustomerDTO';
import { IUpdateCustomerDTO } from '@modules/customer/dtos/IUpdateCustomerDTO';

export class FakeCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async create({
    name,
    email,
    personal_document,
    addresses
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();
    Object.assign(customer, {
      id: uuid.v4(),
      name,
      email,
      personal_document,
      addresses
    });

    this.customers.push(customer);

    return customer;
  }

  async findAndCountAll({
    offset,
    limit
  }: {
    offset: number;
    limit: number;
  }): Promise<{
    rows: Customer[];
    count: number;
  }> {
    const customers = this.customers.slice(offset, offset + limit);

    return { rows: customers, count: this.customers.length - 1 };
  }

  public async update({
    name,
    email,
    personal_document,
    id
  }: IUpdateCustomerDTO): Promise<[number, Customer[]]> {
    const customerUpdated = this.customers.map((customer) => {
      if (customer.id === id) {
        Object.assign(customer, { name, email, personal_document });
      }
      return customer;
    });
    return [1, customerUpdated];
  }

  public async delete({ id }: { id: string }): Promise<number> {
    this.customers = this.customers.filter((customer) => customer.id !== id);
    return 1;
  }
}
