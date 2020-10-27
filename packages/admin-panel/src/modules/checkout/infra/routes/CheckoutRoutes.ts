import express from 'express';
import { container } from 'tsyringe';
import { CheckoutController } from '@modules/checkout/infra/controllers/CheckoutController';
import { IndexSelectService } from '@modules/checkout/services/IndexSelectService';

const router = express.Router();
const Checkout = new CheckoutController();

router.get('/', async (req, res) => {
  const indexSelectService = container.resolve(IndexSelectService);
  const { plans, customers } = await indexSelectService.execute();
  res.render('checkout/index', {
    activeConf: 'active',
    activeCheckout: 'active',
    title: 'Processos de assinatura',
    plans,
    customers
  });
});

router.get('/index', Checkout.index);

router.post('/', Checkout.store);

router.put('/:id', Checkout.update);

router.delete('/:id', Checkout.delete);

export default router;
