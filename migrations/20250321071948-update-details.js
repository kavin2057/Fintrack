'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add new columns if not already present
    await queryInterface.addColumn('productdetails', 'productCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'hsnCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'rol', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'igst', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'sgst', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'cgst', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'purchasePrice', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'salesPrice', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'mrp', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'expiryDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'unit', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'altUnit', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'ucFactor', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'discountP', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'purchaseInclusive', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });

    await queryInterface.addColumn('productdetails', 'salesInclusive', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove added columns during rollback
    await queryInterface.removeColumn('productdetails', 'productCode');
    await queryInterface.removeColumn('productdetails', 'hsnCode');
    await queryInterface.removeColumn('productdetails', 'rol');
    await queryInterface.removeColumn('productdetails', 'igst');
    await queryInterface.removeColumn('productdetails', 'sgst');
    await queryInterface.removeColumn('productdetails', 'cgst');
    await queryInterface.removeColumn('productdetails', 'purchasePrice');
    await queryInterface.removeColumn('productdetails', 'salesPrice');
    await queryInterface.removeColumn('productdetails', 'mrp');
    await queryInterface.removeColumn('productdetails', 'expiryDate');
    await queryInterface.removeColumn('productdetails', 'unit');
    await queryInterface.removeColumn('productdetails', 'altUnit');
    await queryInterface.removeColumn('productdetails', 'ucFactor');
    await queryInterface.removeColumn('productdetails', 'discountP');
    await queryInterface.removeColumn('productdetails', 'purchaseInclusive');
    await queryInterface.removeColumn('productdetails', 'salesInclusive');
  },
};