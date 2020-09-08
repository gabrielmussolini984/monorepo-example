import { FakePlanRepository } from '../repositories/fakes/FakePlanRepository';
import { CreatePlanService } from './CreatePlanService';

jest.mock('../infra/sequelize/entities/Plan.ts');

describe('Create Plan', () => {
  it('should be able to create a new plan', async () => {
    const fakePlanRepository = new FakePlanRepository();
    const createPlanService = new CreatePlanService(fakePlanRepository);

    const plan = await createPlanService.execute({
      name: 'Plano Teste',
      billing_cycle: 'Semestral',
      price: 200,
      remote_plan_id: '123123123'
    });

    expect(plan).toHaveProperty('id');
    expect(plan.name).toBe('Plano Teste');
    expect(plan.billing_cycle).toBe('Semestral');
    expect(plan.price).toBe(200);
    expect(plan.remote_plan_id).toBe('123123123');
  });
});
