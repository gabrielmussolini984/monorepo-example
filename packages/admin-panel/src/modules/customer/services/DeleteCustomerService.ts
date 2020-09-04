import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '@modules/customer/repositories/ICustomerRepository';

@injectable()
export class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: { id: string }): Promise<number> {
    const customerDeleted = await this.customerRepository.delete({ id });

    return customerDeleted;
  }
}
