import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';

// DTO's
import { ICreateCustomerDTO } from '@modules/customer/dtos/ICreateCustomerDTO';

export interface ICustomerRepository {
  findAndCountAll(data: {
    offset: number;
    limit: number;
  }): Promise<{
    rows: Customer[];
    count: number;
  }>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
  update({
    name,
    email,
    personal_document,
    id
  }: {
    name: string;
    email: string;
    personal_document: string;
    id: string;
  }): Promise<[number, Customer[]]>;
  delete({ id }: { id: string }): Promise<number>;
}
