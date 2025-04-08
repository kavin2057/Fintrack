'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductDetails', {
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
          model: 'ProductCategories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productCode: Sequelize.STRING,
      hsnCode: Sequelize.STRING,
      rol: Sequelize.INTEGER,
      igst: Sequelize.FLOAT,
      sgst: Sequelize.FLOAT,
      cgst: Sequelize.FLOAT,
      purchasePrice: Sequelize.FLOAT,
      salesPrice: Sequelize.FLOAT,
      mrp: Sequelize.FLOAT,
      expiryDate: Sequelize.DATE,
      unit: Sequelize.STRING,
      altUnit: Sequelize.STRING,
      ucFactor: Sequelize.FLOAT,
      discountP: Sequelize.FLOAT,
      purchaseInclusive: Sequelize.BOOLEAN,
      salesInclusive: Sequelize.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductDetails');
  },
};
