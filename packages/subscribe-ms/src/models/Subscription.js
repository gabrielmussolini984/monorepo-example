const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Subscriber, {
        foreignKey: 'subscriber_id',
        as: 'subscriber'
      });
    }
  }
  Subscription.init(
    {
      subscriber_id: DataTypes.INTEGER,
      remote_subscription_id: DataTypes.STRING,
      remote_plan_id: DataTypes.STRING,
      plan_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      expires_at: DataTypes.DATE,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Subscription'
    }
  );
  return Subscription;
};
