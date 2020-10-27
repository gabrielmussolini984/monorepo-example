import { AppError } from '../../../shared/errors/MainError';
import { FakePlanRepository } from '../repositories/fakes/FakePlanRepository';
import { FakeValidatePlanProvider } from '../providers/PlanValidateProvider/fakes/FakeValidatePlanProvider';
import { CreatePlanService } from './CreatePlanService';

jest.mock('../infra/sequelize/entities/Plan.ts');

describe('Create Plan', () => {
  it('should be able to create a new plan', async () => {
    const fakePlanRepository = new FakePlanRepository();
    const fakeValidatePlanProvider = new FakeValidatePlanProvider();
    const createPlanService = new CreatePlanService(
      fakePlanRepository,
      fakeValidatePlanProvider
    );

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
  it('should not be able to create a new plan because invalidi params', async () => {
    const fakePlanRepository = new FakePlanRepository();
    const fakeValidatePlanProvider = new FakeValidatePlanProvider();
    const createPlanService = new CreatePlanService(
      fakePlanRepository,
      fakeValidatePlanProvider
    );
    await expect(
      createPlanService.execute({
        name: ' ',
        billing_cycle: '',
        price: 1,
        remote_plan_id: ''
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new plan because name already exists', async () => {
    const fakePlanRepository = new FakePlanRepository();
    const fakeValidatePlanProvider = new FakeValidatePlanProvider();
    const createPlanService = new CreatePlanService(
      fakePlanRepository,
      fakeValidatePlanProvider
    );
    await createPlanService.execute({
      name: 'Plano Teste',
      billing_cycle: 'Semestral',
      price: 200,
      remote_plan_id: '123123123'
    });
    await expect(
      createPlanService.execute({
        name: 'Plano Teste',
        billing_cycle: 'Semestral',
        price: 200,
        remote_plan_id: '123123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
