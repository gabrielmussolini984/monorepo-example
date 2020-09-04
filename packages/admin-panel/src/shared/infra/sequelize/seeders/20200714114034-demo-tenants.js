/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'tenants',
      [
        {
          id: '111ef2f2-55f0-4e16-aee6-4f960d082188',
          company: 'Super Store',
          is_admin: true,
          fallback_subdomain: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'a377d80b-b5b9-47e1-94c6-86de06a0da97',
          company: 'Store One',
          is_admin: false,
          fallback_subdomain: 'store1',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'db32a4cd-663d-43fe-8b9d-d9ed02409580',
          company: 'Store Two',
          is_admin: false,
          fallback_subdomain: 'store2',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tenants', null, {});
  },
};
