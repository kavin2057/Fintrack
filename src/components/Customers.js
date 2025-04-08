import React, { useState } from 'react';
import './Customer.css';
import CustomerForm from './CustomerForm';

const Customers = () => {
    // Mock customer data with all requested fields
    const initialCustomers = [
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
        },
        { 
            id: 3, 
            name: 'Michael Brown',
            account_code: 'CUST003',
            phone_no: '555-345-6789',
            alt_phone_no: '555-765-4321',
            email: 'mbrown@example.com',
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

    const [customers, setCustomers] = useState(initialCustomers);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentCustomerId, setCurrentCustomerId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (customer) => {
        setCurrentCustomerId(customer.id);
        setEditMode(true);
        setShowForm(true);
    };

    const handleDelete = (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            setLoading(true);
            
            // Simulate API call delay
            setTimeout(() => {
                setCustomers(customers.filter(customer => customer.id !== customerId));
                setMessage('Customer deleted successfully!');
                setLoading(false);
            }, 500);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setCurrentCustomerId(null);
        setShowForm(false);
    };

    const handleFormSubmit = (formData) => {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            if (editMode) {
                // Update existing customer
                setCustomers(prevCustomers => 
                    prevCustomers.map(cust => 
                        cust.id === currentCustomerId 
                            ? { ...cust, ...formData, id: currentCustomerId } 
                            : cust
                    )
                );
                setMessage('Customer updated successfully!');
            } else {
                // Add new customer
                const newCustomer = {
                    id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
                    ...formData
                };
                setCustomers([...customers, newCustomer]);
                setMessage('Customer added successfully!');
            }
            
            setLoading(false);
            setShowForm(false);
            setEditMode(false);
            setCurrentCustomerId(null);
        }, 500);
    };

    return (
        <div className="customer-container">
            <h2 className="customer-title">Customer Management</h2>
            
            {message && (
                <div className={message.includes('Error') ? 'customer-message error' : 'customer-message success'}>
                    {message}
                </div>
            )}
            
            <div className="customer-section">
                <div className="customer-section-header">
                    <button 
                        className="customer-button"
                        onClick={() => setShowForm(true)}
                    >
                        Add New Customer
                    </button>
                </div>
                
                {/* Search Input */}
                <div className="customer-search-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Customers"
                        className="customer-search-input"
                    />
                </div>
                
                {loading && <p className="customer-loading">Loading customers...</p>}
                
                {customers.length === 0 && !loading ? (
                    <p>No customers found. Add your first customer above.</p>
                ) : (
                    <div className="customer-list">
                        <table className="customer-table">
                            <thead>
                                <tr >
                                    <th>No</th>
                                    <th>NAME</th>
                                    <th>ACCOUNT CODE</th>
                                    <th>PHONE NO</th>
                                    <th>ALT PHONE NO</th>
                                    <th>EMAIL</th>
                                    <th>ADDRESS</th>
                                    <th>GSTIN</th>
                                    <th>STATE</th>
                                    <th>CITY</th>
                                    <th>OPENING BALANCE</th>
                                    <th>INVOICE DATE</th>
                                    <th>DEBIT CREDIT</th>
                                    <th>CREDIT LIMIT</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers
                                    .filter(customer => 
                                        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        customer.account_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        customer.id.toString().includes(searchTerm)
                                    )
                                    .map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.account_code}</td>
                                        <td>{customer.phone_no}</td>
                                        <td>{customer.alt_phone_no}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.gstin}</td>
                                        <td>{customer.state}</td>
                                        <td>{customer.city}</td>
                                        <td>{customer.opening_balance}</td>
                                        <td>{customer.invoice_date}</td>
                                        <td>{customer.debit_credit}</td>
                                        <td>{customer.credit_limit}</td>
                                        <td className='product-details-ac'>
                                            <button 
                                                onClick={() => handleEdit(customer)}
                                                className="customer-action-button edit"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(customer.id)}
                                                className="customer-action-button delete"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showForm && (
                <CustomerForm
                    onClose={handleCancel}
                    onSubmit={handleFormSubmit}
                    customer={editMode ? customers.find(c => c.id === currentCustomerId) : null}
                    editMode={editMode}
                />
            )}
        </div>
    );
};

export default Customers;