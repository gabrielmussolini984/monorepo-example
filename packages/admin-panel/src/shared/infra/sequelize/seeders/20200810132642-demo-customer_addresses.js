/* eslint-disable */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'customer_addresses',
      [
        {
          id: uuidv4(),
          zip_code: '38071305',
          street: 'Rua Doutor Adilson Resende Facure',
          street_number: '12',
          street_complement: '',
          neighborhood: 'Vila Arquelau',
          city: 'Uberaba',
          state: 'MG',
          ddd: '12',
          phone: '990000001',
          customer_id: '66bc9eb7-7b8a-44ba-a793-444a02fd6064',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          zip_code: '35181569',
          street: 'Rua Murici',
          street_number: '12',
          street_complement: '',
          neighborhood: 'Recanto Verde',
          city: 'Timóteo',
          state: 'MG',
          ddd: '12',
          phone: '990000002',
          customer_id: 'f92aa8b4-7f4d-4910-96d9-c203ebc1298a',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          zip_code: '36309026',
          street: 'Rua Comandante José Flores',
          street_number: '225',
          street_complement: 'Bloco 3',
          neighborhood: 'Guarda-Mor',
          city: 'São João Del Rei',
          state: 'MG',
          ddd: '12',
          phone: '990000003',
          customer_id: 'f6f7a07c-64ba-430b-8931-5423bb12ee75',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customer_addresses', null, {});
  },
};
