import express from 'express';

import { CategoryController } from '@modules/category/infra/controllers/CategoryController';

const Category = new CategoryController();
const router = express.Router();

router.get('/', (req, res) => {
  res.render('category/index', {
    activeAdmin: 'active',
    activeCategory: 'active',
    title: 'Categorias'
  });
});
router.get('/index', Category.index);

router.post('/', Category.store);

router.delete('/:id', Category.delete);

router.put('/:id', Category.update);

export default router;
