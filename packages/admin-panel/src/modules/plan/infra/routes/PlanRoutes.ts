import express from 'express';
import { PlanController } from '@modules/plan/infra/controllers/PlanController';

const router = express.Router();
const Plan = new PlanController();

router.get('/', (req, res) => {
  res.render('plan/index', {
    activeConf: 'active',
    activePlan: 'active',
    title: 'Planos'
  });
});

router.get('/index', Plan.index);

router.post('/', Plan.store);

router.put('/:id', Plan.update);

router.delete('/:id', Plan.delete);

export default router;
