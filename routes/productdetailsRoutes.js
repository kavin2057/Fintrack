const express = require("express");
const router = express.Router();
const productdetailsController = require("../controllers/productdetailsController");

// Define the route for creating a product category
router.post('/create', productdetailsController.createProductDetails);
router.get('/', productdetailsController.getProductDetails);
router.get('/:id', productdetailsController.getProductDetailsById);
router.put('/:id', productdetailsController.updateProductDetails);
router.delete('/:id', productdetailsController.deleteProductDetails);







module.exports = router;