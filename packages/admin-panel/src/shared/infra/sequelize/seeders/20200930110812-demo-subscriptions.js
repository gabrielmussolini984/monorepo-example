/* eslint-disable */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'subscriptions',
      [
        {
          id: '10b60fdc-5142-4a24-a7d5-2a26b04f7df0',
          start_date: '2020-03-03 00:00:00',
          expires_date: '2020-09-03 00:00:00',
          remote_subscription_id: '75b59c48-3ff1-4a8f-866a-c4072c7b2eaa',
          checkout_id: '6e75cfdf-a0ba-4230-9b81-c13384df478a',
          tenant_id: 'a377d80b-b5b9-47e1-94c6-86de06a0da97',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '6fe25cee-2d21-4002-aa27-c2c758da1588',
          start_date: '2020-04-04 00:00:00',
          expires_date: '2020-10-04 00:00:00',
          remote_subscription_id: '261863b5-76d4-4cbe-afb1-4b1b36dd93e4',
          checkout_id: '894cfcd2-3118-42ff-8751-fe7fabcf4bad',
          tenant_id: 'db32a4cd-663d-43fe-8b9d-d9ed02409580',
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subscriptions', null, {});
  },
};