import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/MainError';
import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';
import { IValidatePlanProvider } from '@modules/plan/providers/PlanValidateProvider/models/IValidatePlanProvider';
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
    @inject('PlanRepository') private planRepository: IPlanRepository,
    @inject('ValidatePlanProvider')
    private validatePlanProvider: IValidatePlanProvider
  ) {}

  public async execute({
    name,
    billing_cycle,
    price,
    remote_plan_id
  }: IRequest): Promise<Plan> {
    const validateParams = this.validatePlanProvider.planBodyValidate({
      name,
      billing_cycle,
      price,
      remote_plan_id
    });
    if (!validateParams) throw new AppError('Missing params required', 400);

    const checkPlanExist = await this.planRepository.findByName({ name });
    if (checkPlanExist) throw new AppError('Plan already exists', 400);

    const plan = await this.planRepository.create({
      name,
      billing_cycle,
      price,
      remote_plan_id
    });

    return plan;
  }
}
