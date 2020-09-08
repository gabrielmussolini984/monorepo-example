import { inject, injectable } from 'tsyringe';
import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';
import { IPlanRepository } from '@modules/plan/repositories/IPlanRepository';

interface IRequest {
  name: string;
  billing_cycle: string;
  price: number;
  remote_plan_id: string;
}

@injectable()
export class CreatePlanService {
  constructor(
    @inject('PlanRepository') private planRepository: IPlanRepository
  ) {}

  public async execute({
    name,
    billing_cycle,
    price,
    remote_plan_id
  }: IRequest): Promise<Plan> {
    // const checkCategoryExist = await this.CategoryRepository.findByName({name});
    const plan = await this.planRepository.create({
      name,
      billing_cycle,
      price,
      remote_plan_id
    });

    return plan;
  }
}
