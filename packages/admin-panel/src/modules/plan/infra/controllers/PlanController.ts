import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePlanService } from '@modules/plan/services/CreatePlanService';
import { DeletePlanService } from '@modules/plan/services/DeletePlanService';
import { FindAllPlansService } from '@modules/plan/services/FindAllPlansService';
import { UpdatePlanService } from '@modules/plan/services/UpdatePlanService';

export class PlanController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { length: limit, start: offset } = req.query;
    const findAllPlans = container.resolve(FindAllPlansService);
    const plans = await findAllPlans.execute({
      offset: Number(offset),
      limit: Number(limit),
    });

    return res.json({
      draw: req.params.draw,
      recordsTotal: plans.count,
      data: plans.rows,
      recordsFiltered: plans.count,
    });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, billing_cycle, price, remote_plan_id } = req.body;
    const createPlan = container.resolve(CreatePlanService);
    await createPlan.execute({
      name,
      billing_cycle,
      price,
      remote_plan_id,
    });
    return res.json({ message: 'Plan has been create' });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, billing_cycle, price, remote_plan_id } = req.body;
    const { id } = req.params;
    const updatePlan = container.resolve(UpdatePlanService);
    await updatePlan.execute({
      name,
      billing_cycle,
      price,
      remote_plan_id,
      id,
    });
    return res.json({ message: 'Plan has been updated ' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deletePlan = container.resolve(DeletePlanService);
    await deletePlan.execute({ id });
    return res.json({ message: 'Plan has been deleted' });
  }
}
