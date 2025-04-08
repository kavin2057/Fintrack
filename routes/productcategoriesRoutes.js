const express = require("express");
const router = express.Router();
const productcategoriesController = require("../controllers/productcategoriesController");

// Define the route for creating a product category
router.post('/create', productcategoriesController.createProductCategories);
router.get( '/',productcategoriesController.getProductCategories);
router.get( '/:id',productcategoriesController.getProductCategoriesbyid);
router.put('/:id',productcategoriesController.updateProductCategories);
router.delete('/:id',productcategoriesController.deleteProductCategories);



module.exports = router;