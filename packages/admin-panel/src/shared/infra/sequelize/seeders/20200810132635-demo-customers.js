/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'customers',
      [
        {
          id: '66bc9eb7-7b8a-44ba-a793-444a02fd6064',
          name: 'Gabriel',
          email: 'gabrielmussolini@hotmail.com',
          personal_document: '11111111111',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'f92aa8b4-7f4d-4910-96d9-c203ebc1298a',
          name: 'Joao',
          email: 'joao@hotmail.com',
          personal_document: '22222222222',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'f6f7a07c-64ba-430b-8931-5423bb12ee75',
          name: 'Marcela',
          email: 'marcela@hotmail.com',
          personal_document: '33333333333',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});
  },
};
