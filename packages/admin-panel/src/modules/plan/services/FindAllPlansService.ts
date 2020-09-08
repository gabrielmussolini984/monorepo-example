import { inject, injectable } from 'tsyringe';
import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';
import { IPlanRepository } from '@modules/plan/repositories/IPlanRepository';

interface IRequest {
  offset: number;
  limit: number;
}

@injectable()
export class FindAllPlansService {
  constructor(
    @inject('PlanRepository') private planRepository: IPlanRepository
  ) {}

  public async execute({
    offset,
    limit
  }: IRequest): Promise<{
    rows: Plan[];
    count: number;
  }> {
    const plans = await this.planRepository.findAndCountAll({
      offset,
      limit
    });

    return plans;
  }
}
