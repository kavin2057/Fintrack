const { Customer } = require('../models');

exports.createCustomer = async (req, res) => {
    try {
        const { name, accountCode, phoneNo, altPhoneNo, email, address, gstin, state, city, openingBalance, invoiceDate, debitCredit, creditLimit } = req.body;

        const existingCustomer = await Customer.findOne({ where: { accountCode } });
        if (existingCustomer) {
            return res.status(400).json({ success: false, message: 'Customer already exists' });
        }

        await Customer.create({ name, accountCode, phoneNo, altPhoneNo, email, address, gstin, state, city, openingBalance, invoiceDate, debitCredit, creditLimit });

        res.status(201).json({ success: true, message: 'Customer created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, accountCode, phoneNo, altPhoneNo, email, address, gstin, state, city, openingBalance, invoiceDate, debitCredit, creditLimit } = req.body;
        const existingCustomer = await Customer.findByPk(id);
        if (!existingCustomer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        await existingCustomer.update({ name, accountCode, phoneNo, altPhoneNo, email, address, gstin, state, city, openingBalance, invoiceDate, debitCredit, creditLimit });
        res.status(200).json({ success: true, message: 'Customer updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        await customer.destroy();
        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
