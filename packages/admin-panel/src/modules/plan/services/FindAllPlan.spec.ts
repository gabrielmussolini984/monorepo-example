import { FakePlanRepository } from '../repositories/fakes/FakePlanRepository';
import { CreatePlanService } from './CreatePlanService';
import { FindAllPlansService } from './FindAllPlansService';

jest.mock('../infra/sequelize/entities/Plan.ts');

describe('Find all Plan', () => {
  it('should be able to find all categories', async () => {
    const fakePlanRepository = new FakePlanRepository();
    const createPlanService = new CreatePlanService(fakePlanRepository);

    await createPlanService.execute({
      name: 'Plano Teste 1',
      billing_cycle: 'Semestral',
      price: 200,
      remote_plan_id: '123123123'
    });

    await createPlanService.execute({
      name: 'Plano Teste 2',
      billing_cycle: 'Semestral',
      price: 200,
      remote_plan_id: '123123123'
    });

    await createPlanService.execute({
      name: 'Plano Teste 3',
      billing_cycle: 'Semestral',
      price: 200,
      remote_plan_id: '123123123'
    });

    await createPlanService.execute({
      name: 'Plano Teste 4',
      billing_cycle: 'Semestral',
      price: 200,
      remote_plan_id: '123123123'
    });

    await createPlanService.execute({
      name: 'Plano Teste 5',
      billing_cycle: 'Semestral',
      price: 200,
      remote_plan_id: '123123123'
    });

    const findAllPlanService = new FindAllPlansService(fakePlanRepository);

    const plans = await findAllPlanService.execute({
      limit: 10,
      offset: 1
    });

    expect(plans).toHaveProperty('rows');
    expect(plans).toHaveProperty('count');
    expect(plans.count).toBe(4);
  });
  // it('should not able to create a new category because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
