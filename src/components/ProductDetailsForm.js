import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDetailsForm.css';

const ProductDetailsForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productCode: '',
    hsnCode: '',
    rol: '',
    discountP: '', // Changed from discountPercent to match backend
    igst: '',
    sgst: '',
    cgst: '',
    purchasePrice: '',
    salesPrice: '',
    mrp: '',
    purchaseInclusive: false,
    salesInclusive: false,
    unit: '',
    altUnit: '',
    ucFactor: '',
    expiryDate: '',
    productCategoryId: '' // Changed from productCategory to match backend
  });

  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/productcategories/');
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error('Invalid data format:', response.data);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    if (!formData.productName) {
      setErrorMessage('Product name is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting form data:', formData);

    // Format the data to match backend expectations
    const formattedData = {
      productName: formData.productName,
      productCategoryId: formData.productCategoryId, // Ensure this field is included
      productCode: formData.productCode,
      hsnCode: formData.hsnCode,
      rol: formData.rol ? parseFloat(formData.rol) : null,
      discountP: formData.discountP ? parseFloat(formData.discountP) : null,
      igst: formData.igst ? parseFloat(formData.igst) : null,
      sgst: formData.sgst ? parseFloat(formData.sgst) : null,
      cgst: formData.cgst ? parseFloat(formData.cgst) : null,
      purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : null,
      salesPrice: formData.salesPrice ? parseFloat(formData.salesPrice) : null,
      mrp: formData.mrp ? parseFloat(formData.mrp) : null,
      expiryDate: formData.expiryDate || null,
      unit: formData.unit,
      altUnit: formData.altUnit,
      ucFactor: formData.ucFactor ? parseFloat(formData.ucFactor) : null,
      purchaseInclusive: formData.purchaseInclusive,
      salesInclusive: formData.salesInclusive
    };

    console.log('Formatted data:', formattedData);

    try {
      const response = await axios.post('http://localhost:8080/api/productdetails/create', formattedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.success) {
        onSubmit(response.data);
        onClose();
      } else {
        setErrorMessage(`Failed to create product details: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating product details:', error);
      if (error.response && error.response.data) {
        setErrorMessage(`Failed to create product details: ${error.response.data.message || error.message}`);
      } else {
        setErrorMessage('Failed to create product details. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      productName: '',
      productCode: '',
      hsnCode: '',
      rol: '',
      discountP: '', // Changed from discountPercent to match backend
      igst: '',
      sgst: '',
      cgst: '',
      purchasePrice: '',
      salesPrice: '',
      mrp: '',
      purchaseInclusive: false,
      salesInclusive: false,
      unit: '',
      altUnit: '',
      ucFactor: '',
      expiryDate: '',
      productCategory: '' // Changed from productCategory to match backend
    });
    setErrorMessage('');
  };

  return (
    <div className="product-form-container">
      <div className="product-form-header">
        <h2>Add Product Details</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
      
      <div className="product-form-content">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-actions">
          <button onClick={handleClear} className="clear-button">Clear</button>
          <div className="add-actions">
            <span>Add</span>
            <button className="add-more-button" type="button">+</button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Product Category</label>
            <select 
              name="productCategory" 
              value={formData.productCategory}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Product Category</option>
              {Array.isArray(categories) && categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Product Name</label>
            <input 
              type="text" 
              name="productName" 
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter Product Name" 
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Product Code</label>
            <input 
              type="text" 
              name="productCode" 
              value={formData.productCode}
              onChange={handleChange}
              placeholder="Enter Product Code" 
              className="form-control"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>HSN Code</label>
              <input 
                type="text" 
                name="hsnCode" 
                value={formData.hsnCode}
                onChange={handleChange}
                placeholder="Enter HSN Code" 
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>ROL</label>
              <input 
                type="number" 
                name="rol" 
                value={formData.rol}
                onChange={handleChange}
                placeholder="Enter ROL" 
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>Discount %</label>
              <input 
                type="number" 
                name="discountP" 
                value={formData.discountP}
                onChange={handleChange}
                placeholder="Enter Discount" 
                className="form-control"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>IGST</label>
              <input 
                type="number" 
                name="igst" 
                value={formData.igst}
                onChange={handleChange}
                placeholder="Enter IGST" 
                className="form-control"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label>SGST</label>
              <input 
                type="number" 
                name="sgst" 
                value={formData.sgst}
                onChange={handleChange}
                placeholder="Enter SGST" 
                className="form-control"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label>CGST</label>
              <input 
                type="number" 
                name="cgst" 
                value={formData.cgst}
                onChange={handleChange}
                placeholder="Enter CGST" 
                className="form-control"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Purchase Price</label>
              <input 
                type="number" 
                name="purchasePrice" 
                value={formData.purchasePrice}
                onChange={handleChange}
                placeholder="Enter Purchase Price" 
                className="form-control"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label>Sales Price</label>
              <input 
                type="number" 
                name="salesPrice" 
                value={formData.salesPrice}
                onChange={handleChange}
                placeholder="Enter Sales Price" 
                className="form-control"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label>MRP</label>
              <input 
                type="number" 
                name="mrp" 
                value={formData.mrp}
                onChange={handleChange}
                placeholder="Enter MRP" 
                className="form-control"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="form-row checkbox-row">
            <div className="form-group checkbox-group">
              <input 
                type="checkbox" 
                id="purchaseInclusive" 
                name="purchaseInclusive" 
                checked={formData.purchaseInclusive}
                onChange={handleChange}
              />
              <label htmlFor="purchaseInclusive">Purchase Inclusive</label>
            </div>
            
            <div className="form-group checkbox-group">
              <input 
                type="checkbox" 
                id="salesInclusive" 
                name="salesInclusive" 
                checked={formData.salesInclusive}
                onChange={handleChange}
              />
              <label htmlFor="salesInclusive">Sales Inclusive</label>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Unit</label>
              <input 
                type="text" 
                name="unit" 
                value={formData.unit}
                onChange={handleChange}
                placeholder="Enter Unit" 
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>Alt Unit</label>
              <input 
                type="text" 
                name="altUnit" 
                value={formData.altUnit}
                onChange={handleChange}
                placeholder="Enter Alt Unit" 
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>UC Factor</label>
              <input 
                type="number" 
                name="ucFactor" 
                value={formData.ucFactor}
                onChange={handleChange}
                placeholder="Enter UC Factor" 
                className="form-control"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Expiry Date</label>
            <input 
              type="date" 
              name="expiryDate" 
              value={formData.expiryDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="submit-section">
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsForm;