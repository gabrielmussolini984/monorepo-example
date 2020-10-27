import { FakePlanRepository } from '../repositories/fakes/FakePlanRepository';
import { FakeValidatePlanProvider } from '../providers/PlanValidateProvider/fakes/FakeValidatePlanProvider';
import { CreatePlanService } from './CreatePlanService';
import { UpdatePlanService } from './UpdatePlanService';

jest.mock('../infra/sequelize/entities/Plan.ts');

describe('Update Plan', () => {
  it('should be able to update Plan', async () => {
    const fakePlanRepository = new FakePlanRepository();
    const fakeValidatePlanProvider = new FakeValidatePlanProvider();
    const createPlanService = new CreatePlanService(
      fakePlanRepository,
      fakeValidatePlanProvider
    );

    const newPlan = await createPlanService.execute({
      name: 'Plano Teste 1',
      billing_cycle: 'Semestral',
      price: 200,
      remote_plan_id: '123123123'
    });

    const updatePlanService = new UpdatePlanService(fakePlanRepository);

    const planUpdated = await updatePlanService.execute({
      name: 'Plano Editado',
      billing_cycle: 'Mensal',
      price: 100,
      remote_plan_id: '111111111',
      id: newPlan.id
    });
    expect(planUpdated).toEqual(expect.arrayContaining([1]));
  });
  // it('should not able to create a new Customer because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
