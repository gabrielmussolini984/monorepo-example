import { ICreatePlanDTO } from '@modules/plan/dtos/ICreatePlanDTO';
import { IValidatePlanProvider } from '../models/IValidatePlanProvider';

export class FakeValidatePlanProvider implements IValidatePlanProvider {
  public planBodyValidate({
    name,
    billing_cycle,
    price,
    remote_plan_id
  }: ICreatePlanDTO): ICreatePlanDTO | null {
    if (
      name.length > 5 &&
      billing_cycle.length > 5 &&
      price > 1 &&
      remote_plan_id.length > 5
    )
      return { name, billing_cycle, price, remote_plan_id };
    return null;
  }
}
