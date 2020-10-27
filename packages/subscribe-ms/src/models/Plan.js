const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {}
  Plan.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      remote_plan_id: DataTypes.STRING,
      recurrence: DataTypes.STRING,
      active: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Plan'
    }
  );
  return Plan;
};
