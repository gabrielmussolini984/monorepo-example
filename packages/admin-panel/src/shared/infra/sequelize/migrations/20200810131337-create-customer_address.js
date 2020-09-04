module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer_addresses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      zip_code: {
        type: Sequelize.STRING,
      },
      street: {
        type: Sequelize.STRING,
      },
      street_number: {
        type: Sequelize.STRING,
      },
      street_complement: {
        type: Sequelize.STRING,
      },
      neighborhood: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      ddd: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      customer_id: {
        type: Sequelize.UUID,
        references: { model: 'customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('customer_addresses');
  },
};
