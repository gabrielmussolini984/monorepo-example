import express from 'express';

import { Controller } from '@modules/subscription/infra/controllers/SubscriptionController';

const controller = new Controller();
const router = express.Router();

router.get('/', (req, res) => {
  res.render('example/index', {
    activeAdmin: 'active',
    activeCategory: 'active',
    title: 'Example'
  });
});
router.get('/index', controller.index);

router.post('/', controller.store);

router.delete('/:id', controller.delete);

router.put('/:id', controller.update);

export default router;
