'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductDetails extends Model {
    // Associate ProductDetails with ProductCategories
    static associate(models) {
      ProductDetails.belongsTo(models.ProductCategories, {
        foreignKey: 'productCategoryId', // FK in ProductDetails
        targetKey: 'id', // PK in ProductCategories
        as: 'category', // Alias for eager loading
        onDelete: 'CASCADE', // Delete ProductDetails if category is deleted
        onUpdate: 'CASCADE', // Update ProductDetails if category id changes
      });
    }
  }

  ProductDetails.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      productCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ProductCategories', // Ensure correct table name
          key: 'id',
        },
      },
      productCode: DataTypes.STRING,
      hsnCode: DataTypes.STRING,
      rol: DataTypes.INTEGER,
      igst: DataTypes.FLOAT,
      sgst: DataTypes.FLOAT,
      cgst: DataTypes.FLOAT,
      purchasePrice: DataTypes.FLOAT,
      salesPrice: DataTypes.FLOAT,
      mrp: DataTypes.FLOAT,
      expiryDate: DataTypes.DATE,
      unit: DataTypes.STRING,
      altUnit: DataTypes.STRING,
      ucFactor: DataTypes.FLOAT,
      discountP: DataTypes.FLOAT,
      purchaseInclusive: DataTypes.BOOLEAN,
      salesInclusive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'ProductDetails',
      tableName: 'productdetails', // Consistent table name
      timestamps: false, // Disable createdAt/updatedAt
    }
  );

  return ProductDetails;
};
