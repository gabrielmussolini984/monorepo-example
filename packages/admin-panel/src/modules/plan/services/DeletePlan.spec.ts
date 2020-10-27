import { FakePlanRepository } from '../repositories/fakes/FakePlanRepository';
import { FakeValidatePlanProvider } from '../providers/PlanValidateProvider/fakes/FakeValidatePlanProvider';
import { DeletePlanService } from './DeletePlanService';
import { CreatePlanService } from './CreatePlanService';

jest.mock('../infra/sequelize/entities/Plan.ts');

describe('Delete Plan', () => {
  it('should be able to delete Plan', async () => {
    const fakePlanRepository = new FakePlanRepository();
    const fakeValidatePlanProvider = new FakeValidatePlanProvider();
    const createPlanService = new CreatePlanService(
      fakePlanRepository,
      fakeValidatePlanProvider
    );
    const newPlan = await createPlanService.execute({
      name: 'Plano Teste',
      billing_cycle: 'Semestral',
      price: 200,
      remote_plan_id: '123123123'
    });

    const deletePlanService = new DeletePlanService(fakePlanRepository);

    const plan = await deletePlanService.execute({
      id: newPlan.id
    });

    expect(plan).toBe(1);
  });
});
