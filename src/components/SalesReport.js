import React, { useState } from 'react';
import './SalesReport.css';

const SalesReport = () => {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    fromDate: '2025-03-15',
    toDate: '',
    selectedCustomer: '',
    selectedUser: ''
  });
  const [salesData, setSalesData] = useState([]);

  // Mock data for dropdowns - in real app, fetch from API
  const customers = [
    { id: 1, name: 'Kannan' },
    { id: 2, name: 'John Doe' }
  ];

  const users = [
    { id: 1, name: 'virtual' },
    { id: 2, name: 'admin' }
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
    setSalesData([
      {
        id: 6,
        invoiceNo: '2025-03-07',
        date: '2025-03-07',
        customerName: 'Kannan',
        storeName: 'Main Store',
        createdByUser: 'virtual',
        discountType: '',
        discountInput: 0,
        otherExpenses: 0,
        mop: 'CASH',
        taxType: 'GST',
        os: 32500,
        cash: 7499.99,
        card: 0,
        credit: 0,
        bank: '',
        totalAmount: 7499.99,
        discountOnTotal: 0,
        roundOff: 0.01,
        billAmount: 7500,
        narration: '',
        createdAt: '3/7/2025, 12:18:29 PM',
        updatedAt: '3/7/2025, 12:18:29 PM'
      }
    ]);
  };

  const calculateTotals = () => {
    return salesData.reduce((acc, curr) => ({
      cash: (acc.cash || 0) + curr.cash,
      card: (acc.card || 0) + curr.card,
      credit: (acc.credit || 0) + curr.credit,
      totalAmount: (acc.totalAmount || 0) + curr.totalAmount,
      discountOnTotal: (acc.discountOnTotal || 0) + curr.discountOnTotal,
      roundOff: (acc.roundOff || 0) + curr.roundOff,
      billAmount: (acc.billAmount || 0) + curr.billAmount
    }), {});
  };

  const handleReset = () => {
    setShowForm(true);
    setSalesData([]);
    setFormData({
      fromDate: '2025-03-15',
      toDate: '',
      selectedCustomer: '',
      selectedUser: ''
    });
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Sales Report</h2>
      
      <div className="products-section">
        {showForm ? (
          <div className="search-section">
            <form onSubmit={handleSubmit} className="sales-report-form">
              <div className="search-row">
                <div className="search-group">
                  <label>From Date:</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleInputChange}
                    required
                    className="search-input"
                  />
                </div>

                <div className="search-group">
                  <label>To Date:</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleInputChange}
                    className="search-input"
                  />
                </div>

                <div className="search-group">
                  <label>Select Customer:</label>
                  <select
                    name="selectedCustomer"
                    value={formData.selectedCustomer}
                    onChange={handleInputChange}
                    className="search-input"
                  >
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="search-group">
                  <label>Select User:</label>
                  <select
                    name="selectedUser"
                    value={formData.selectedUser}
                    onChange={handleInputChange}
                    className="search-input"
                  >
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="search-group submit-group">
                  <button type="submit" className="action-button submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="sales-report-results">
            <div className="action-bar">
              <button onClick={handleReset} className="action-button reset">New Search</button>
            </div>
            <div className="table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Date</th>
                    <th>Customer Name</th>
                    <th>Store Name</th>
                    <th>Created by User</th>
                    <th>Discount Type</th>
                    <th>Discount Input</th>
                    <th>Other Expenses</th>
                    <th>MOP</th>
                    <th>Tax Type</th>
                    <th>OS</th>
                    <th>Cash</th>
                    <th>Card</th>
                    <th>Credit</th>
                    <th>Bank</th>
                    <th>Total Amount</th>
                    <th>Discount On Total</th>
                    <th>Round Off</th>
                    <th>Bill Amount</th>
                    <th>Narration</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((sale, index) => (
                    <tr key={index}>
                      
                      <td>{sale.invoiceNo}</td>
                      <td>{sale.date}</td>
                      <td>{sale.customerName}</td>
                      <td>{sale.storeName}</td>
                      <td>{sale.createdByUser}</td>
                      <td>{sale.discountType}</td>
                      <td>{sale.discountInput}</td>
                      <td>{sale.otherExpenses}</td>
                      <td>{sale.mop}</td>
                      <td>{sale.taxType}</td>
                      <td>{sale.os}</td>
                      <td>{sale.cash.toFixed(2)}</td>
                      <td>{sale.card.toFixed(2)}</td>
                      <td>{sale.credit.toFixed(2)}</td>
                      <td>{sale.bank}</td>
                      <td>{sale.totalAmount.toFixed(2)}</td>
                      <td>{sale.discountOnTotal.toFixed(2)}</td>
                      <td>{sale.roundOff.toFixed(2)}</td>
                      <td>{sale.billAmount.toFixed(2)}</td>
                      <td>{sale.narration}</td>
                      <td>{sale.createdAt}</td>
                      <td>{sale.updatedAt}</td>
                    </tr>
                  ))}
                  {salesData.length > 0 && (
                    <tr className="totals-row">
                      <td colSpan="12">Total</td>
                      <td>{calculateTotals().cash.toFixed(2)}</td>
                      <td>{calculateTotals().card.toFixed(2)}</td>
                      <td>{calculateTotals().credit.toFixed(2)}</td>
                      <td></td>
                      <td>{calculateTotals().totalAmount.toFixed(2)}</td>
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

export default SalesReport;