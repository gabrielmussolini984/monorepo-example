const { Router } = require('express');
const Plan = require('../controllers/Plan');
const Subscribe = require('../controllers/Subscribe');

const router = new Router();

router.get('/', (req, res) => {
  return res.render('home');
});

router.get('/plans', Plan.index);

router.get('/subscribe/:id', Subscribe.index);
router.post('/subscribe', Subscribe.store);

module.exports = router;
