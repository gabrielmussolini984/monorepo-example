/* eslint-disable */
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const arrayCatStore1 = [];
    for (let i = 0; i < 24; i++) {
      arrayCatStore1.push({
        id: uuidv4(),
        name: `StoreOne- Categoria: ${i}`,
        description: 'descrição da categoria',
        tenant_id: 'a377d80b-b5b9-47e1-94c6-86de06a0da97',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    const arrayCatStore2 = [];
    for (let i = 0; i < 24; i++) {
      arrayCatStore2.push({
        id: uuidv4(),
        name: `StoreTwo - Categoria: ${i}`,
        description: 'descrição da categoria',
        tenant_id: 'db32a4cd-663d-43fe-8b9d-d9ed02409580',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert(
      'categories',
      [...arrayCatStore1, ...arrayCatStore2],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
