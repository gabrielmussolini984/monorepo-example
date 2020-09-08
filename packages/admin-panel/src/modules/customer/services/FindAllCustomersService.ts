import { inject, injectable } from 'tsyringe';
import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';
import { ICustomerRepository } from '@modules/customer/repositories/ICustomerRepository';

interface IRequest {
  offset: number;
  limit: number;
}

@injectable()
export class FindAllCustomersService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  public async execute({
    offset,
    limit
  }: IRequest): Promise<{
    rows: Customer[];
    count: number;
  }> {
    const customers = await this.customerRepository.findAndCountAll({
      offset,
      limit
    });

    return customers;
  }
}
