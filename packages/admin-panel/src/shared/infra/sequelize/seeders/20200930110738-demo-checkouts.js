/* eslint-disable */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'checkouts',
      [
        {
          id: '6e75cfdf-a0ba-4230-9b81-c13384df478a',
          price: 100,
          customer_id: '66bc9eb7-7b8a-44ba-a793-444a02fd6064',
          plan_id: '2100654c-4a95-4ca8-897f-0c3ebb085f0d',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '894cfcd2-3118-42ff-8751-fe7fabcf4bad',
          price: 300,
          customer_id: 'f92aa8b4-7f4d-4910-96d9-c203ebc1298a',
          plan_id: 'b9a45b96-816a-4f3c-a281-a48825638f9d',
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '2569f40b-3c54-4a01-af75-e8eff0015676',
          price: 200,
          customer_id: 'f92aa8b4-7f4d-4910-96d9-c203ebc1298a',
          plan_id: 'bb2adb4b-7a53-430d-b8aa-14a3ac5d685c',
          status: false,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('checkouts', null, {});
  },
};
