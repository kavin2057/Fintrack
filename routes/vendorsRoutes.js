const express = require("express");
const router = express.Router();
const VendorsController = require("../controllers/vendorsController");

router.post('/create', VendorsController.createVendor);

router.get('/', VendorsController.getVendor);

router.get('/:id', VendorsController.getVendorById);

router.put('/:id', VendorsController.updateVendor);

router.delete('/:id', VendorsController.deleteVendor);

module.exports = router;