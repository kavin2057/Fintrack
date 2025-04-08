'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      productCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ProductCategories', // Ensure this matches the actual table name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hsnCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rol: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      igst: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      sgst: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      cgst: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      purchasePrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      salesPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      mrp: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      expiryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      altUnit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ucFactor: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      discountP: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      purchaseInclusive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      salesInclusive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productdetails');
  },
};
