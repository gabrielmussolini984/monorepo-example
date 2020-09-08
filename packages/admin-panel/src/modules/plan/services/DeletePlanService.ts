import { inject, injectable } from 'tsyringe';
import { IPlanRepository } from '@modules/plan/repositories/IPlanRepository';

@injectable()
export class DeletePlanService {
  constructor(
    @inject('PlanRepository') private planRepository: IPlanRepository
  ) {}

  public async execute({ id }: { id: string }): Promise<number> {
    const planDeleted = await this.planRepository.delete({ id });

    return planDeleted;
  }
}
