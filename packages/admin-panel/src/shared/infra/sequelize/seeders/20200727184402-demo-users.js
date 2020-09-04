/* eslint-disable */
const { v4: uuidv4 } = require('uuid');
const { hashSync } = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = password => {
      return hashSync(password, 8);
    };
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          name: 'Admin Super Store',
          email: 'admin@superstore.com',
          password_hash: passwordHash('123456'),
          tenant_id: '111ef2f2-55f0-4e16-aee6-4f960d082188',
          is_staff: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Admin StoreOne',
          email: 'admin-store1@superstore.com',
          password_hash: passwordHash('123456'),
          tenant_id: 'a377d80b-b5b9-47e1-94c6-86de06a0da97',
          is_staff: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: 'User StoreOne',
          email: 'user-store1@superstore.com',
          password_hash: passwordHash('123456'),
          tenant_id: 'a377d80b-b5b9-47e1-94c6-86de06a0da97',
          is_staff: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Admin StoreTwo',
          email: 'admin-store2@superstore.com',
          password_hash: passwordHash('123456'),
          tenant_id: 'db32a4cd-663d-43fe-8b9d-d9ed02409580',
          is_staff: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: 'User StoreTwo',
          email: 'user-store2@superstore.com',
          password_hash: passwordHash('123456'),
          tenant_id: 'db32a4cd-663d-43fe-8b9d-d9ed02409580',
          is_staff: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
