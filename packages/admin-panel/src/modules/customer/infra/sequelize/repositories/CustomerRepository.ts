import { Repository } from 'sequelize-typescript';
import { sequelize } from '@shared/infra/sequelize';
import { CustomerAddress } from '@modules/customer/infra/sequelize/entities/CustomerAddress';
import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';
import { ICustomerRepository } from '@modules/customer/repositories/ICustomerRepository';
// DTO's
import { ICreateCustomerDTO } from '@modules/customer/dtos/ICreateCustomerDTO';
import { IUpdateCustomerDTO } from '@modules/customer/dtos/IUpdateCustomerDTO';

export class CustomerRepository implements ICustomerRepository {
  private sequelizeRepository: Repository<Customer>;

  constructor() {
    this.sequelizeRepository = sequelize.getRepository(Customer);
  }

  public async update({
    name,
    email,
    personal_document,
    id
  }: IUpdateCustomerDTO): Promise<[number, Customer[]]> {
    const customerUpdated = await this.sequelizeRepository.update(
      {
        name,
        email,
        personal_document
      },
      { where: { id } }
    );
    return customerUpdated;
  }

  public async create({
    name,
    email,
    personal_document,
    addresses
  }: ICreateCustomerDTO): Promise<Customer> {
    const newCustomer = await this.sequelizeRepository.create(
      {
        name,
        email,
        personal_document,
        addresses
      },
      { include: [CustomerAddress] }
    );

    return newCustomer;
  }

  public async findAndCountAll({
    offset,
    limit
  }: {
    offset: number;
    limit: number;
  }): Promise<{ rows: Customer[]; count: number }> {
    const customers = await this.sequelizeRepository.findAndCountAll({
      limit,
      order: [['created_at', 'DESC']],
      offset
    });
    return customers;
  }

  public async delete({ id }: { id: string }): Promise<number> {
    return this.sequelizeRepository.destroy({ where: { id } });
  }

  public async findByPersonalDocument({
    personal_document
  }: {
    personal_document: string;
  }): Promise<Customer> {
    return this.sequelizeRepository.findOne({ where: { personal_document } });
  }
}
