import { inject, injectable } from 'tsyringe';
import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';
import { ICustomerRepository } from '@modules/customer/repositories/ICustomerRepository';
import { ICreateCustomerAddressDTO } from '@modules/customer/dtos/ICreateCustomerAddressDTO';

interface IRequest {
  name: string;
  email: string;
  personal_document: string;
  addresses: ICreateCustomerAddressDTO[];
}

@injectable()
export class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    name,
    email,
    personal_document,
    addresses,
  }: IRequest): Promise<Customer> {
    const customer = await this.customerRepository.create({
      name,
      email,
      personal_document,
      addresses,
    });

    return customer;
  }
}
