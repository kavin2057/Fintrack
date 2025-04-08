const { ProductDetails } = require('../models');
const { sequelize, Sequelize } = require('../models');
const { Op } = Sequelize;

exports.createProductDetails = async (req, res) => {
    try {
        const {
            productName, productCategoryId, productCode, hsnCode, rol, igst, sgst, cgst,
            purchasePrice, salesPrice, mrp, expiryDate, unit, altUnit,
            ucFactor, discountP, purchaseInclusive, salesInclusive
        } = req.body;

        if (!productName || !productCategoryId || !productCode) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        await ProductDetails.create({
            productName, productCategoryId, productCode, hsnCode, rol, igst, sgst, cgst,
            purchasePrice, salesPrice, mrp, expiryDate, unit, altUnit,
            ucFactor, discountP, purchaseInclusive, salesInclusive
        });

        res.status(201).json({ success: true, message: 'Product details created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        const productDetails = await ProductDetails.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json(productDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getProductDetailsById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ success: false, message: 'Valid product detail ID is required' });
        }

        const productDetail = await ProductDetails.findByPk(id);
        if (!productDetail) {
            return res.status(404).json({ success: false, message: 'Product detail not found' });
        }
        res.status(200).json(productDetail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            productName, productCategoryId, productCode, hsnCode, rol, igst, sgst, cgst,
            purchasePrice, salesPrice, mrp, expiryDate, unit, altUnit,
            ucFactor, discountP, purchaseInclusive, salesInclusive
        } = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ success: false, message: 'Valid product detail ID is required' });
        }

        const productDetail = await ProductDetails.findByPk(id);
        if (!productDetail) {
            return res.status(404).json({ success: false, message: 'Product detail not found' });
        }

        await productDetail.update({
            productName, productCategoryId, productCode, hsnCode, rol, igst, sgst, cgst,
            purchasePrice, salesPrice, mrp, expiryDate, unit, altUnit,
            ucFactor, discountP, purchaseInclusive, salesInclusive
        });

        res.status(200).json({ success: true, message: 'Product details updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteProductDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ success: false, message: 'Valid product detail ID is required' });
        }

        const productDetail = await ProductDetails.findByPk(id);
        if (!productDetail) {
            return res.status(404).json({ success: false, message: 'Product detail not found' });
        }

        await productDetail.destroy();
        res.status(200).json({ success: true, message: 'Product details deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
