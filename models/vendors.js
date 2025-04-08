'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vendors.init({
    name: DataTypes.STRING,
    accountCode: DataTypes.STRING,
    phoneNo: DataTypes.STRING,
    altPhoneNo: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    gstin: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    openingBalance: DataTypes.DECIMAL,
    invoiceDate: DataTypes.DATE,
    debitCredit: DataTypes.STRING,
    creditLimit: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Vendors',
  });
  return Vendors;
};