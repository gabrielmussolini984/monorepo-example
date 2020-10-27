/* eslint-disable */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'plans',
      [
        {
          id: '2100654c-4a95-4ca8-897f-0c3ebb085f0d',
          name: 'Plano Basico',
          billing_cycle: 'Trimestral',
          price: 100,
          remote_plan_id: 'OxjN4UQAYI99OOi',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'bb2adb4b-7a53-430d-b8aa-14a3ac5d685c',
          name: 'Plano Master',
          billing_cycle: 'Semestral',
          price: 200,
          remote_plan_id: 'ZCbB4F6AcaqR8ho',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'b9a45b96-816a-4f3c-a281-a48825638f9d',
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
