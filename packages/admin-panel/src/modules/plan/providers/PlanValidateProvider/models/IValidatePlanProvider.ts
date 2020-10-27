import { ICreatePlanDTO } from '@modules/plan/dtos/ICreatePlanDTO';

export interface IValidatePlanProvider {
  planBodyValidate({
    name,
    billing_cycle,
    price,
    remote_plan_id
  }: ICreatePlanDTO): ICreatePlanDTO | null;
}
