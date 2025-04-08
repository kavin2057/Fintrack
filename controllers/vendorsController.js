const { Vendors } = require('../models');

exports.createVendor = async (req, res) => {
    try {
        const { name, accountCode, phoneNo, altPhoneNo, email, address, gstin, state, city, openingBalance, invoiceDate, debitCredit, creditLimit } = req.body;

        const existingVendor = await Vendors.findOne({ where: { accountCode } });
        if (existingVendor) {
            return res.status(400).json({ success: false, message: 'Vendor already exists' });
        }

        await Vendors.create({ name, accountCode, phoneNo, altPhoneNo, email, address, gstin, state, city, openingBalance, invoiceDate, debitCredit, creditLimit });

        res.status(201).json({ success: true, message: 'Vendor created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getVendor = async (req, res) => {
    try {
        const vendors = await Vendors.findAll();
        res.status(200).json(vendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await Vendors.findByPk(id);
        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, accountCode, phoneNo, altPhoneNo, email, address, gstin, state, city, openingBalance, invoiceDate, debitCredit, creditLimit } = req.body;
        const existingVendor = await Vendors.findByPk(id);
        if (!existingVendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }
        await existingVendor.update({ name, accountCode, phoneNo, altPhoneNo, email, address, gstin, state, city, openingBalance, invoiceDate, debitCredit, creditLimit });
        res.status(200).json({ success: true, message: 'Vendor updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await Vendors.findByPk(id);
        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }
        await vendor.destroy();
        res.status(200).json({ success: true, message: 'Vendor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
