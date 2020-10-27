import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';

// DTO's
import { ICreatePlanDTO } from '@modules/plan/dtos/ICreatePlanDTO';
import { IUpdatePlanDTO } from '@modules/plan/dtos/IUpdatePlanDTO';

export interface IPlanRepository {
  create(data: ICreatePlanDTO): Promise<Plan>;
  findAndCountAll(data: {
    offset: number;
    limit: number;
  }): Promise<{
    rows: Plan[];
    count: number;
  }>;
  findByName({ name }: { name: string }): Promise<Plan>;
  update(data: IUpdatePlanDTO): Promise<[number, Plan[]]>;
  delete({ id }: { id: string }): Promise<number>;
}
