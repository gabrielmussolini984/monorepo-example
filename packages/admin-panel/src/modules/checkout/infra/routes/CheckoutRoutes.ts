import express from 'express';
import { CheckoutController } from '@modules/checkout/infra/controllers/CheckoutController';

const router = express.Router();
const Checkout = new CheckoutController();

router.get('/', (req, res) => {
  res.render('checkout/index', {
    activeConf: 'active',
    activePlan: 'active',
    title: 'Processos de assinatura'
  });
});

router.get('/index', Checkout.index);

router.post('/', Checkout.store);

router.put('/:id', Checkout.update);

router.delete('/:id', Checkout.delete);

export default router;
