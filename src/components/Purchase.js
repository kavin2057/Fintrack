import React, { useState, useEffect } from 'react';
import './Purchase.css';
import ProductDetailsForm from './ProductDetailsForm';

const Purchase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('vendors'); // 'customers' or 'vendors'
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null); // Selected customer or vendor
  const [showProductForm, setShowProductForm] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [roundOff, setRoundOff] = useState(0);
  const [showEntitySearch, setShowEntitySearch] = useState(true); // Control visibility of entity search
  
  // Mock product data (in a real app, this would come from your backend)
  const [products] = useState([
    {
      id: 1,
      productCode: 'P001',
      productName: 'Product 1',
      unit: 'PCS',
      purchasePrice: 80,
      purchaseInclusive: true,
      cost: 80,
      salesPrice: 100,
      mrp: 120,
      cgst: 9,
      sgst: 9,
      igst: 18,
      discountPercent: 5
    },
    {
      id: 2,
      productCode: 'P002',
      productName: 'Product 2',
      unit: 'KG',
      purchasePrice: 150,
      purchaseInclusive: false,
      cost: 150,
      salesPrice: 200,
      mrp: 220,
      cgst: 5,
      sgst: 5,
      igst: 10,
      discountPercent: 2
    }
  ]);

  // Use useEffect to load data when component mounts
  useEffect(() => {
    // Since we can't directly import the data from Customers.js and Vendors.js,
    // we'll use the mock data that matches the structure of those components
    
    // Mock customer data based on Customers.js structure
    const mockCustomers = [
      { 
        id: 1, 
        name: 'John Smith',
        account_code: 'CUST001',
        phone_no: '555-123-4567',
        alt_phone_no: '555-987-6543',
        email: 'john.smith@example.com',
        address: '123 Main St, Anytown, USA',
        gstin: 'GSTIN1234567890',
        state: 'California',
        city: 'Los Angeles',
        opening_balance: 5000,
        invoice_date: '2023-01-15',
        debit_credit: 'Credit',
        credit_limit: 10000
      },
      { 
        id: 2, 
        name: 'Sarah Johnson',
        account_code: 'CUST002',
        phone_no: '555-234-5678',
        alt_phone_no: '555-876-5432',
        email: 'sarah.j@example.com',
        address: '456 Oak Ave, Somewhere, USA',
        gstin: 'GSTIN0987654321',
        state: 'New York',
        city: 'New York City',
        opening_balance: 7500,
        invoice_date: '2023-02-20',
        debit_credit: 'Debit',
        credit_limit: 15000
      }
    ];

    // Mock vendor data based on Vendors.js structure
    const mockVendors = [
      { 
        id: 1, 
        name: 'ABC Suppliers',
        account_code: 'VEND001',
        phone_no: '555-123-4567',
        alt_phone_no: '555-987-6543',
        email: 'contact@abcsuppliers.com',
        address: '123 Main St, Anytown, USA',
        gstin: 'GSTIN1234567890',
        state: 'California',
        city: 'Los Angeles',
        opening_balance: 5000,
        invoice_date: '2023-01-15',
        debit_credit: 'Credit',
        credit_limit: 10000
      },
      { 
        id: 2, 
        name: 'XYZ Manufacturing',
        account_code: 'VEND002',
        phone_no: '555-234-5678',
        alt_phone_no: '555-876-5432',
        email: 'info@xyzmanufacturing.com',
        address: '456 Oak Ave, Somewhere, USA',
        gstin: 'GSTIN0987654321',
        state: 'New York',
        city: 'New York City',
        opening_balance: 7500,
        invoice_date: '2023-02-20',
        debit_credit: 'Debit',
        credit_limit: 15000
      },
      { 
        id: 3, 
        name: 'Global Distributors',
        account_code: 'VEND003',
        phone_no: '555-345-6789',
        alt_phone_no: '555-765-4321',
        email: 'sales@globaldistributors.com',
        address: '789 Pine Rd, Nowhere, USA',
        gstin: 'GSTIN5678901234',
        state: 'Texas',
        city: 'Houston',
        opening_balance: 3000,
        invoice_date: '2023-03-10',
        debit_credit: 'Credit',
        credit_limit: 8000
      }
    ];

    // Format the data to match our table structure
    const formattedCustomers = mockCustomers.map(customer => ({
      id: customer.id,
      date: customer.invoice_date || 'N/A',
      name: customer.name,
      contactNo: customer.phone_no,
      gstin: customer.gstin,
      city: customer.city,
      address: customer.address,
      os: 'N/A', // This field doesn't exist in customer data
      count: 1, // Default value
    }));

    const formattedVendors = mockVendors.map(vendor => ({
      id: vendor.id,
      date: vendor.invoice_date || 'N/A',
      name: vendor.name,
      contactNo: vendor.phone_no,
      gstin: vendor.gstin,
      city: vendor.city,
      address: vendor.address,
      os: 'N/A', // This field doesn't exist in vendor data
      count: 1, // Default value
    }));

    setCustomers(formattedCustomers);
    setVendors(formattedVendors);
  }, []);

  // Get the appropriate data based on the selected search type
  const getData = () => {
    return searchType === 'customers' ? customers : vendors;
  };

  // Filter data based on search term
  const filteredData = getData().filter(item => 
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.contactNo && item.contactNo.includes(searchTerm)) ||
    (item.gstin && item.gstin.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.city && item.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle entity selection
  const handleEntitySelect = (entity) => {
    setSelectedEntity(entity);
    setShowEntitySearch(false); // Hide search after selection
  };

  // Reset entity selection
  const handleChangeEntity = () => {
    setSelectedEntity(null);
    setShowEntitySearch(true);
    setSearchTerm('');
  };

  const handleProductSearch = (e) => {
    const value = e.target.value;
    setProductSearchTerm(value);
    setShowProductSuggestions(value.length > 0);
  };

  const filteredProducts = products.filter(product =>
    product.productCode.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.productName.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      quantity: 1,
      grossAmt: product.purchasePrice,
      taxable: product.purchasePrice,
      cgstAmount: (product.purchasePrice * product.cgst) / 100,
      sgstAmount: (product.purchasePrice * product.sgst) / 100,
      igstAmount: (product.purchasePrice * product.igst) / 100,
      discountAmount: (product.purchasePrice * product.discountPercent) / 100,
      subTotal: calculateSubTotal(product)
    };
    setSelectedProducts([...selectedProducts, newProduct]);
    setProductSearchTerm('');
    setShowProductSuggestions(false);
  };

  const calculateSubTotal = (product) => {
    const baseAmount = product.purchasePrice;
    const discount = (baseAmount * product.discountPercent) / 100;
    const afterDiscount = baseAmount - discount;
    const tax = (afterDiscount * (product.igst || (product.cgst + product.sgst))) / 100;
    return afterDiscount + tax;
  };

  const updateProductQuantity = (index, quantity) => {
    const updatedProducts = [...selectedProducts];
    const product = updatedProducts[index];
    product.quantity = quantity;
    product.grossAmt = product.purchasePrice * quantity;
    product.taxable = product.grossAmt;
    product.cgstAmount = (product.taxable * product.cgst) / 100;
    product.sgstAmount = (product.taxable * product.sgst) / 100;
    product.igstAmount = (product.taxable * product.igst) / 100;
    product.discountAmount = (product.taxable * product.discountPercent) / 100;
    product.subTotal = calculateSubTotal(product) * quantity;
    setSelectedProducts(updatedProducts);
  };

  // Calculate summary values
  const calculateSummary = () => {
    const totalAmount = selectedProducts.reduce((sum, product) => sum + product.grossAmt, 0);
    const totalDiscount = selectedProducts.reduce((sum, product) => sum + product.discountAmount, 0);
    const billAmountBeforeRound = totalAmount - totalDiscount + parseFloat(otherExpenses || 0);
    const roundedBillAmount = Math.round(billAmountBeforeRound);
    const calculatedRoundOff = roundedBillAmount - billAmountBeforeRound;
    
    return {
      totalAmount: totalAmount.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      otherExpenses: parseFloat(otherExpenses || 0).toFixed(2),
      roundOff: calculatedRoundOff.toFixed(2),
      billAmount: roundedBillAmount.toFixed(2)
    };
  };

  const handleSubmit = () => {
    const summary = calculateSummary();
    // Here you would typically send the data to your backend
    console.log('Submitting purchase:', {
      customer: searchType === 'customers' ? getData().find(c => c.name === searchTerm) : null,
      vendor: searchType === 'vendors' ? getData().find(v => v.name === searchTerm) : null,
      products: selectedProducts,
      summary
    });
  };

  const summary = calculateSummary();

  return (
    <div className="purchase-container">
      <h2 className="purchase-title">Purchase</h2>
      
      <div className="purchase-section">
        <h3>Purchase Invoice</h3>
        
        {/* Entity Type Selection */}
        <div className="purchase-search-type-container">
          <div className="purchase-search-switches">
            <label className="purchase-switch-label">
              <input
                type="radio"
                name="searchType"
                value="customers"
                checked={searchType === 'customers'}
                onChange={() => {
                  setSearchType('customers');
                  setSelectedEntity(null);
                  setShowEntitySearch(true);
                  setSearchTerm('');
                }}
              />
              <span className="switch-text">Customers</span>
            </label>
            <label className="purchase-switch-label">
              <input
                type="radio"
                name="searchType"
                value="vendors"
                checked={searchType === 'vendors'}
                onChange={() => {
                  setSearchType('vendors');
                  setSelectedEntity(null);
                  setShowEntitySearch(true);
                  setSearchTerm('');
                }}
              />
              <span className="switch-text">Vendors</span>
            </label>
          </div>
        </div>
        
        {/* Entity Search or Selected Entity Display */}
        {showEntitySearch ? (
          <div>
            <div className="purchase-search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${searchType === 'customers' ? 'Customers' : 'Vendors'}`}
                className="purchase-search-input"
              />
            </div>
            
            {/* Entity Search Results */}
            {searchTerm && (
              <div className="purchase-list">
                <table className="purchase-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Contact No</th>
                      <th>GSTIN</th>
                      <th>City</th>
                      <th>Address</th>
                      <th>OS</th>
                      <th>Count</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan="9" style={{ textAlign: 'center' }}>
                          No {searchType} found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.date}</td>
                          <td>{item.name}</td>
                          <td>{item.contactNo}</td>
                          <td>{item.gstin}</td>
                          <td>{item.city}</td>
                          <td>{item.address}</td>
                          <td>{item.os}</td>
                          <td>{item.count}</td>
                          <td>
                            <button 
                              className="purchase-action-button edit"
                              onClick={() => handleEntitySelect(item)}
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* Selected Entity Display */
          <div className="selected-entity">
            <div className="entity-details">
              <h4>{searchType === 'customers' ? 'Customer' : 'Vendor'} Details</h4>
              <div className="entity-info">
                <div className="entity-info-row">
                  <span className="entity-label">Name:</span>
                  <span className="entity-value">{selectedEntity.name}</span>
                </div>
                <div className="entity-info-row">
                  <span className="entity-label">Contact:</span>
                  <span className="entity-value">{selectedEntity.contactNo}</span>
                </div>
                <div className="entity-info-row">
                  <span className="entity-label">GSTIN:</span>
                  <span className="entity-value">{selectedEntity.gstin}</span>
                </div>
                <div className="entity-info-row">
                  <span className="entity-label">Address:</span>
                  <span className="entity-value">{selectedEntity.address}, {selectedEntity.city}</span>
                </div>
              </div>
              <button 
                className="change-entity-button"
                onClick={handleChangeEntity}
              >
                Change {searchType === 'customers' ? 'Customer' : 'Vendor'}
              </button>
            </div>
          </div>
        )}

        {/* Only show product details section if an entity is selected */}
        {selectedEntity && (
          <>
            {/* Product Details Section */}
            <div className="product-details-section">
              <h3>Product Details</h3>
              
              {/* Product Search with Suggestions */}
              <div className="product-search-container">
                <div className="search-with-button">
                  <input
                    type="text"
                    value={productSearchTerm}
                    onChange={handleProductSearch}
                    placeholder="Search by Product Code or Name"
                    className="purchase-search-input"
                  />
                  <button 
                    className="add-product-button"
                    onClick={() => setShowProductForm(true)}
                  >
                    +
                  </button>
                </div>
                
                {showProductSuggestions && (
                  <div className="purchase-product-suggestions">
                    {filteredProducts.map(product => (
                      <div 
                        key={product.id}
                        className="purchase-suggestion-item"
                        onClick={() => addProduct(product)}
                      >
                        <span>{product.productCode} - {product.productName}</span>
                        <button className="add-suggestion">+</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Products Table */}
              <div className="purchase-list">
                <table className="purchase-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Product Code</th>
                      <th>Product Name</th>
                      <th>Unit</th>
                      <th>Quantity</th>
                      <th>Purchase Price</th>
                      <th>Purchase Inclusive</th>
                      <th>Cost</th>
                      <th>Sales Price</th>
                      <th>MRP</th>
                      <th>Gross Amt</th>
                      <th>Taxable</th>
                      <th>CGST %</th>
                      <th>CGST</th>
                      <th>SGST %</th>
                      <th>SGST</th>
                      <th>IGST %</th>
                      <th>IGST</th>
                      <th>Discount %</th>
                      <th>Discount</th>
                      <th>Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{product.productCode}</td>
                        <td>{product.productName}</td>
                        <td>{product.unit}</td>
                        <td>
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) => updateProductQuantity(index, parseInt(e.target.value))}
                            min="1"
                            className="quantity-input"
                          />
                        </td>
                        <td>{product.purchasePrice}</td>
                        <td>{product.purchaseInclusive ? 'Yes' : 'No'}</td>
                        <td>{product.cost}</td>
                        <td>{product.salesPrice}</td>
                        <td>{product.mrp}</td>
                        <td>{product.grossAmt}</td>
                        <td>{product.taxable}</td>
                        <td>{product.cgst}</td>
                        <td>{product.cgstAmount}</td>
                        <td>{product.sgst}</td>
                        <td>{product.sgstAmount}</td>
                        <td>{product.igst}</td>
                        <td>{product.igstAmount}</td>
                        <td>{product.discountPercent}</td>
                        <td>{product.discountAmount}</td>
                        <td>{product.subTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="summary">Purchase Summary</div>
            {/* Summary Section */}
            <div className="purchase-summary-section">
              <div className="purchase-summary-row">
                <div className="purchase-summary-label">Total Amount:</div>
                <div className="summary-value">₹ {summary.totalAmount}</div>
              </div>
              <div className="purchase-summary-row">
                <div className="purchase-summary-label">Discount:</div>
                <div className="summary-value">₹ {summary.totalDiscount}</div>
              </div>
              <div className="purchase-summary-row">
                <div className="purchase-summary-label">Other Expenses:</div>
                <div className="summary-value">
                  <input
                    type="number"
                    value={otherExpenses}
                    onChange={(e) => setOtherExpenses(e.target.value)}
                    className="purchase-summary-input"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="purchase-summary-row">
                <div className="purchase-summary-label">Round Off:</div>
                <div className="summary-value">₹ {summary.roundOff}</div>
              </div>
              <div className="purchase-summary-row total">
                <div className="purchase-summary-label">Bill Amount:</div>
                <div className="summary-value">₹ {summary.billAmount}</div>
              </div>
              <div className="purchase-submit-row">
                <button className="purchase-submit-button" onClick={handleSubmit}>
                  Submit Purchase
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Product Details Form Modal */}
      {showProductForm && (
        <ProductDetailsForm
          onClose={() => setShowProductForm(false)}
          onSubmit={(formData) => {
            // Add the new product to the products list
            const newProduct = {
              id: products.length + 1,
              productCode: formData.productCode,
              productName: formData.productName,
              unit: formData.unit,
              purchasePrice: parseFloat(formData.purchasePrice),
              purchaseInclusive: formData.purchaseInclusive,
              cost: parseFloat(formData.purchasePrice),
              salesPrice: parseFloat(formData.salesPrice),
              mrp: parseFloat(formData.mrp),
              cgst: parseFloat(formData.cgst),
              sgst: parseFloat(formData.sgst),
              igst: parseFloat(formData.igst),
              discountPercent: parseFloat(formData.discountPercent)
            };
            products.push(newProduct);
            addProduct(newProduct);
            setShowProductForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Purchase;