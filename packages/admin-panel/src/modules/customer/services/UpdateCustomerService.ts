import { inject, injectable } from 'tsyringe';
import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';
import { ICustomerRepository } from '@modules/customer/repositories/ICustomerRepository';

interface IRequest {
  name: string;
  email: string;
  personal_document: string;
  id: string;
}

@injectable()
export class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  public async execute({
    name,
    email,
    personal_document,
    id
  }: IRequest): Promise<[number, Customer[]]> {
    const customerUpdated = await this.customerRepository.update({
      name,
      email,
      personal_document,
      id
    });

    return customerUpdated;
  }
}
