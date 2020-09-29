import * as z from 'zod';
import { ICreatePlanDTO } from '@modules/plan/dtos/ICreatePlanDTO';
import { IValidatePlanProvider } from '../models/IValidatePlanProvider';

const planSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  billing_cycle: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' }),
  price: z.number(),
  remote_plan_id: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
});

export class ZodValidatePlanProvider implements IValidatePlanProvider {
  public planBodyValidate({
    name,
    billing_cycle,
    price,
    remote_plan_id
  }: ICreatePlanDTO): ICreatePlanDTO | null {
    if (planSchema.check({ name, billing_cycle, price, remote_plan_id }))
      return { name, billing_cycle, price, remote_plan_id };

    return null;
  }
}
