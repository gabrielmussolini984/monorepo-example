const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Subscription, {
        foreignKey: 'subscription_id',
        as: 'subscription'
      });
    }
  }
  Payment.init(
    {
      transaction_id: DataTypes.STRING,
      subscription_id: DataTypes.INTEGER,
      gateway: DataTypes.STRING,
      payment_type: DataTypes.STRING,
      card_brand: DataTypes.STRING,
      card_last_digits: DataTypes.STRING,
      boleto_url: DataTypes.STRING,
      boleto_barcode: DataTypes.STRING,
      boleto_expiration_date: DataTypes.STRING,
      status: DataTypes.STRING,
      total: DataTypes.INTEGER,
      installments: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Payment'
    }
  );
  return Payment;
};
