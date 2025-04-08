const { ProductCategories } = require('../models');

// Create Product Category
exports.createProductCategories = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: 'Category name is required' });
        }

        const existingProductCategory = await ProductCategories.findOne({ where: { name } });
        if (existingProductCategory) {
            return res.status(409).json({ success: false, message: 'Product category already exists' });
        }

        const newCategory = await ProductCategories.create({ name });

        res.status(201).json({ success: true, message: 'Product category created successfully', data: newCategory });
    } catch (error) {
        console.error('Error creating product category:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get All Product Categories
exports.getProductCategories = async (req, res) => {
    try {
        const productCategories = await ProductCategories.findAll();
        res.status(200).json({ success: true, data: productCategories });
    } catch (error) {
        console.error('Error fetching product categories:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get Product Category by ID
exports.getProductCategoriesbyid = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Valid product category ID is required' });
        }

        const productCategory = await ProductCategories.findByPk(id);

        if (!productCategory) {
            return res.status(404).json({ success: false, message: 'Product category not found' });
        }

        res.status(200).json({ success: true, data: productCategory });
    } catch (error) {
        console.error('Error fetching product category by ID:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Update Product Category
exports.updateProductCategories = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!id || isNaN(id) || !name) {
            return res.status(400).json({ success: false, message: 'Valid product category ID and name are required' });
        }

        const existingProductCategory = await ProductCategories.findByPk(id);

        if (!existingProductCategory) {
            return res.status(404).json({ success: false, message: 'Product category not found' });
        }

        await existingProductCategory.update({ name });

        res.status(200).json({ success: true, message: 'Product category updated successfully', data: existingProductCategory });
    } catch (error) {
        console.error('Error updating product category:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Delete Product Category
exports.deleteProductCategories = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Valid product category ID is required' });
        }

        const productCategory = await ProductCategories.findByPk(id);

        if (!productCategory) {
            return res.status(404).json({ success: false, message: 'Product category not found' });
        }

        await productCategory.destroy();

        res.status(200).json({ success: true, message: 'Product category deleted successfully' });
    } catch (error) {
        console.error('Error deleting product category:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};