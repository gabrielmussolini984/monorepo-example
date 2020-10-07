import { inject, injectable } from 'tsyringe';
import { IPlanRepository } from '@modules/plan/repositories/IPlanRepository';
import { ICustomerRepository } from '@modules/customer/repositories/ICustomerRepository';
import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';
import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';

interface IResponse {
  plans: Plan[];
  customers: Customer[];
}

@injectable()
export class IndexSelectService {
  constructor(
    @inject('PlanRepository')
    private planRepository: IPlanRepository,
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  public async execute(): Promise<IResponse> {
    const plans = await this.planRepository.findAndCountAll({
      offset: 0,
      limit: 20
    });
    const customers = await this.customerRepository.findAndCountAll({
      offset: 0,
      limit: 20
    });
    return { plans: plans.rows, customers: customers.rows };
  }
}
