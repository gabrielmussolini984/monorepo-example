/* eslint-disable */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'plans',
      [
        {
          id: uuidv4(),
          name: 'Plano Basico',
          billing_cycle: 'Trimestral',
          price: 100,
          remote_plan_id: 'OxjN4UQAYI99OOi',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Plano Master',
          billing_cycle: 'Semestral',
          price: 200,
          remote_plan_id: 'ZCbB4F6AcaqR8ho',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Plano Premium',
          billing_cycle: 'Anual',
          price: 300,
          remote_plan_id: 'Ugtu8mXDGU7nkkj',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('plans', null, {});
  },
};
