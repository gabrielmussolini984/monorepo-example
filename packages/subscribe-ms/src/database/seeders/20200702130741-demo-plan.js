module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'plans',
      [
        {
          name: 'Plano Master',
          description:
            'Officia tempor et magna ut non exercitation laborum incididunt aute cillum proident nostrud.',
          price: 50.99,
          remote_plan_id: '1',
          recurrence: '12 meses',
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Plano Supremo',
          description:
            'Officia tempor et magna ut non exercitation laborum incididunt aute cillum proident nostrud.',
          price: 100.99,
          remote_plan_id: '2',
          recurrence: '12 meses',
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Plano Vitalicio',
          description:
            'Officia tempor et magna ut non exercitation laborum incididunt aute cillum proident nostrud.',
          price: 500.99,
          remote_plan_id: '3',
          recurrence: '12 meses',
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('plans', null, {});
  }
};
