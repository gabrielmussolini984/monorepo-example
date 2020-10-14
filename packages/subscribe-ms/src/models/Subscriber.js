const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {}
  Subscriber.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      document_number: DataTypes.STRING,
      street: DataTypes.STRING,
      street_number: DataTypes.STRING,
      complementary: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      ddd: DataTypes.STRING,
      number: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Subscriber'
    }
  );
  return Subscriber;
};
