import { inject, injectable } from 'tsyringe';
import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';
import { IPlanRepository } from '@modules/plan/repositories/IPlanRepository';

interface IRequest {
  name: string;
  billing_cycle: string;
  price: number;
  remote_plan_id: string;
  id: string;
}
@injectable()
export class UpdatePlanService {
  constructor(
    @inject('PlanRepository') private planRepository: IPlanRepository
  ) {}

  public async execute({
    name,
    billing_cycle,
    price,
    remote_plan_id,
    id
  }: IRequest): Promise<[number, Plan[]]> {
    const planUpdated = await this.planRepository.update({
      name,
      billing_cycle,
      price,
      remote_plan_id,
      id
    });

    return planUpdated;
  }
}
