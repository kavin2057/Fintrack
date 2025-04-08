'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategories extends Model {
    static associate(models) {
      // Define association with ProductDetails
      ProductCategories.hasMany(models.ProductDetails, {
        foreignKey: 'productCategoryId',
        as: 'products', // Alias for easier querying
        onDelete: 'CASCADE', // Ensure cascading deletion
        onUpdate: 'CASCADE', // Ensure cascading updates
      });
    }
  }

  ProductCategories.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'ProductCategories',
      tableName: 'ProductCategories', // Explicit table name
      timestamps: false, // Disable createdAt and updatedAt
    }
  );

  return ProductCategories;
};
