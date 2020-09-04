import express from 'express';
import { CustomerController } from '@modules/customer/infra/controllers/CustomerController';

const router = express.Router();
const Customer = new CustomerController();
router.get('/', (req, res) => {
  res.render('customer/index', {
    activeConf: 'active',
    activeCustomer: 'active',
    title: 'Clientes',
  });
});

router.get('/index', Customer.index);

router.post('/', Customer.store);

router.put('/:id', Customer.update);
router.delete('/:id', Customer.delete);

export default router;
