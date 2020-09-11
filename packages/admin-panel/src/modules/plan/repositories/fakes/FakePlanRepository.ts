import { uuid } from 'uuidv4';
import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';
import { IPlanRepository } from '@modules/plan/repositories/IPlanRepository';
// DTO's
import { ICreatePlanDTO } from '@modules/plan/dtos/ICreatePlanDTO';
import { IUpdatePlanDTO } from '@modules/plan/dtos/IUpdatePlanDTO';

export class FakePlanRepository implements IPlanRepository {
  private plans: Plan[] = [];

  public async create({
    name,
    billing_cycle,
    price,
    remote_plan_id
  }: ICreatePlanDTO): Promise<Plan> {
    const plan = new Plan();
    Object.assign(plan, {
      id: uuid(),
      name,
      billing_cycle,
      price,
      remote_plan_id
    });

    this.plans.push(plan);

    return plan;
  }

  async findAndCountAll({
    offset,
    limit
  }: {
    offset: number;
    limit: number;
  }): Promise<{
    rows: Plan[];
    count: number;
  }> {
    const plans = this.plans.slice(offset, offset + limit);

    return { rows: plans, count: this.plans.length - 1 };
  }

  public async update({
    name,
    billing_cycle,
    price,
    remote_plan_id,
    id
  }: IUpdatePlanDTO): Promise<[number, Plan[]]> {
    const planUpdated = this.plans.map((plan) => {
      if (plan.id === id) {
        Object.assign(plan, { name, billing_cycle, price, remote_plan_id });
      }
      return plan;
    });
    return [1, planUpdated];
  }

  public async delete({ id }: { id: string }): Promise<number> {
    this.plans = this.plans.filter((plan) => plan.id !== id);
    return 1;
  }
}
