import React, { useState, useEffect } from 'react';
import './ProductDetailsForm.css';

const VendorForm = ({ onClose, onSubmit, vendor, editMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    account_code: '',
    phone_no: '',
    alt_phone_no: '',
    email: '',
    address: '',
    gstin: '',
    state: '',
    city: '',
    opening_balance: '',
    invoice_date: '',
    debit_credit: 'Credit',
    credit_limit: ''
  });

  useEffect(() => {
    // If in edit mode, populate form with vendor data
    if (vendor) {
      setFormData({
        name: vendor.name || '',
        account_code: vendor.account_code || '',
        phone_no: vendor.phone_no || '',
        alt_phone_no: vendor.alt_phone_no || '',
        email: vendor.email || '',
        address: vendor.address || '',
        gstin: vendor.gstin || '',
        state: vendor.state || '',
        city: vendor.city || '',
        opening_balance: vendor.opening_balance || '',
        invoice_date: vendor.invoice_date || '',
        debit_credit: vendor.debit_credit || 'Credit',
        credit_limit: vendor.credit_limit || ''
      });
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClear = () => {
    setFormData({
      name: '',
      account_code: '',
      phone_no: '',
      alt_phone_no: '',
      email: '',
      address: '',
      gstin: '',
      state: '',
      city: '',
      opening_balance: '',
      invoice_date: '',
      debit_credit: 'Credit',
      credit_limit: ''
    });
  };

  return (
    <div className="product-form-container">
      <div className="product-form-header">
        <h2>{editMode ? 'Edit Vendor' : 'Add Vendor'}</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
      
      <div className="product-form-content">
        <div className="form-actions">
          <button onClick={handleClear} className="clear-button">Clear</button>
          <div className="add-actions">
            <span>Vendor</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Vendor Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Vendor Name" 
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Account Code</label>
              <input 
                type="text" 
                name="account_code" 
                value={formData.account_code}
                onChange={handleChange}
                placeholder="Enter Account Code" 
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email" 
                className="form-control"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                name="phone_no" 
                value={formData.phone_no}
                onChange={handleChange}
                placeholder="Enter Phone Number" 
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Alternative Phone</label>
              <input 
                type="text" 
                name="alt_phone_no" 
                value={formData.alt_phone_no}
                onChange={handleChange}
                placeholder="Enter Alternative Phone" 
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>GSTIN</label>
              <input 
                type="text" 
                name="gstin" 
                value={formData.gstin}
                onChange={handleChange}
                placeholder="Enter GSTIN" 
                className="form-control"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>State</label>
              <input 
                type="text" 
                name="state" 
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter State" 
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                name="city" 
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City" 
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>Opening Balance</label>
              <input 
                type="number" 
                name="opening_balance" 
                value={formData.opening_balance}
                onChange={handleChange}
                placeholder="Enter Opening Balance" 
                className="form-control"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Invoice Date</label>
              <input 
                type="date" 
                name="invoice_date" 
                value={formData.invoice_date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>Debit/Credit</label>
              <select 
                name="debit_credit" 
                value={formData.debit_credit}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Credit Limit</label>
              <input 
                type="number" 
                name="credit_limit" 
                value={formData.credit_limit}
                onChange={handleChange}
                placeholder="Enter Credit Limit" 
                className="form-control"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Address</label>
            <textarea 
              name="address" 
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address" 
              className="form-control"
              rows="3"
            />
          </div>
          
          <div className="submit-section">
            <button type="submit" className="submit-button">
              {editMode ? 'Update Vendor' : 'Add Vendor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorForm; 