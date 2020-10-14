const { Plan } = require('../models');

class PlanController {
  async index(req, res) {
    try {
      const plans = await Plan.findAll();
      return res.render('plans', { plans: plans.map((plan) => plan.toJSON()) });
    } catch (error) {
      return res.redirect('/');
    }
  }
}

module.exports = new PlanController();
