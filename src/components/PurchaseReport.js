import React, { useState } from 'react';
import './PurchaseReport.css'; // We can reuse the same CSS

const PurchaseReport = () => {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    fromDate: '2025-03-15',
    toDate: '',
    selectedVendor: '',
    selectedUser: ''
  });
  const [purchaseData, setPurchaseData] = useState([]);

  // Mock data for dropdowns - in real app, fetch from API
  const vendors = [
    { id: 1, name: 'ABC Suppliers', accountCode: 'VEND001' },
    { id: 2, name: 'XYZ Trading', accountCode: 'VEND002' }
  ];

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    // In a real app, you would fetch data based on the form inputs
    // For now, we'll set some mock data
    setPurchaseData([
      {
        id: 1,
        invoiceNo: '2025-03-07',
        date: '2025-03-07',
        vendorAccountCode: 'VEND001',
        vendorName: 'ABC Suppliers',
        storeName: 'Main Store',
        createdByUser: 'virtual',
        mop: 'CASH',
        taxType: 'GST',
        os: 32500,
        totalAmount: 7499.99,
        discountType: 'Percentage',
        discountInput: 5,
        otherExpenses: 100,
        discountOnTotal: 375,
        roundOff: 0.01,
        billAmount: 7225,
        narration: 'Regular purchase',
        createdAt: '3/7/2025, 12:18:29 PM',
        updatedAt: '3/7/2025, 12:18:29 PM'
      }
    ]);
  };

  const calculateTotals = () => {
    return purchaseData.reduce((acc, curr) => ({
      totalAmount: (acc.totalAmount || 0) + curr.totalAmount,
      discountOnTotal: (acc.discountOnTotal || 0) + curr.discountOnTotal,
      roundOff: (acc.roundOff || 0) + curr.roundOff,
      billAmount: (acc.billAmount || 0) + curr.billAmount
    }), {});
  };

  const handleReset = () => {
    setShowForm(true);
    setPurchaseData([]);
    setFormData({
      fromDate: '2025-03-15',
      toDate: '',
      selectedVendor: '',
      selectedUser: ''
    });
  };

  return (
    <div className="pr-container">
      <h2 className="pr-title">Purchase Report</h2>
      
      <div className="pr-section">
        {showForm ? (
          <div className="pr-search-section">
            <form onSubmit={handleSubmit} className="pr-form">
              <div className="pr-search-row">
                <div className="pr-search-group">
                  <label>From Date:</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleInputChange}
                    required
                    className="pr-search-input"
                  />
                </div>

                <div className="pr-search-group">
                  <label>To Date:</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleInputChange}
                    className="pr-search-input"
                  />
                </div>

                <div className="pr-search-group">
                  <label>Select Vendor:</label>
                  <select
                    name="selectedVendor"
                    value={formData.selectedVendor}
                    onChange={handleInputChange}
                    className="pr-search-input"
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                </div>

                

                <div className="pr-search-group pr-submit-group">
                  <button type="submit" className="pr-action-button submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="sales-report-results">
            <div className="action-bar">
              <button onClick={handleReset} className="pr-action-button reset">New Search</button>
            </div>
            <div className="pr-table-container">
              <table className="pr-table">
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Date</th>
                    <th>Vendor Account Code</th>
                    <th>Vendor Name</th>
                    <th>Store Name</th>
                    <th>Created by User</th>
                    <th>MOP</th>
                    <th>Tax Type</th>
                    <th>OS</th>
                    <th>Total Amount</th>
                    <th>Discount Type</th>
                    <th>Discount Input</th>
                    <th>Other Expenses</th>
                    <th>Discount on Total</th>
                    <th>Round Off</th>
                    <th>Bill Amount</th>
                    <th>Narration</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseData.map((purchase, index) => (
                    <tr key={index}>
                      <td>{purchase.invoiceNo}</td>
                      <td>{purchase.date}</td>
                      <td>{purchase.vendorAccountCode}</td>
                      <td>{purchase.vendorName}</td>
                      <td>{purchase.storeName}</td>
                      <td>{purchase.createdByUser}</td>
                      <td>{purchase.mop}</td>
                      <td>{purchase.taxType}</td>
                      <td>{purchase.os}</td>
                      <td>{purchase.totalAmount.toFixed(2)}</td>
                      <td>{purchase.discountType}</td>
                      <td>{purchase.discountInput}</td>
                      <td>{purchase.otherExpenses}</td>
                      <td>{purchase.discountOnTotal.toFixed(2)}</td>
                      <td>{purchase.roundOff.toFixed(2)}</td>
                      <td>{purchase.billAmount.toFixed(2)}</td>
                      <td>{purchase.narration}</td>
                      <td>{purchase.createdAt}</td>
                      <td>{purchase.updatedAt}</td>
                    </tr>
                  ))}
                  {purchaseData.length > 0 && (
                    <tr className="pr-totals-row">
                      <td colSpan="9">Total</td>
                      <td>{calculateTotals().totalAmount.toFixed(2)}</td>
                      <td colSpan="3"></td>
                      <td>{calculateTotals().discountOnTotal.toFixed(2)}</td>
                      <td>{calculateTotals().roundOff.toFixed(2)}</td>
                      <td>{calculateTotals().billAmount.toFixed(2)}</td>
                      <td colSpan="3"></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseReport;