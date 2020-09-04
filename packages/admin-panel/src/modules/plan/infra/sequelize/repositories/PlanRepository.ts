import { Repository } from 'sequelize-typescript';
import { sequelize } from '@shared/infra/sequelize';
import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';
import { IPlanRepository } from '@modules/plan/repositories/IPlanRepository';
// DTO's
import { ICreatePlanDTO } from '@modules/plan/dtos/ICreatePlanDTO';
import { IUpdatePlanDTO } from '@modules/plan/dtos/IUpdatePlanDTO';

export class PlanRepository implements IPlanRepository {
  private sequelizeRepository: Repository<Plan>;

  constructor() {
    this.sequelizeRepository = sequelize.getRepository(Plan);
  }

  public async create({
    name,
    billing_cycle,
    price,
    remote_plan_id,
  }: ICreatePlanDTO): Promise<Plan> {
    const plan = await this.sequelizeRepository.create({
      name,
      billing_cycle,
      price,
      remote_plan_id,
    });
    return plan;
  }

  async findAndCountAll({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<{
    rows: Plan[];
    count: number;
  }> {
    const plans = await this.sequelizeRepository.findAndCountAll({
      limit,
      order: [['created_at', 'DESC']],
      offset,
    });
    return plans;
  }

  public async update({
    name,
    billing_cycle,
    price,
    remote_plan_id,
    id,
  }: IUpdatePlanDTO): Promise<[number, Plan[]]> {
    const planUpdated = await this.sequelizeRepository.update(
      {
        name,
        billing_cycle,
        price,
        remote_plan_id,
      },
      { where: { id } },
    );
    return planUpdated;
  }

  public async delete({ id }: { id: string }): Promise<number> {
    return this.sequelizeRepository.destroy({ where: { id } });
  }
}
