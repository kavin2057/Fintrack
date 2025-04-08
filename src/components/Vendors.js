import React, { useState } from 'react';
import './Vendors.css';
import './Customer.css'
import VendorForm from './VendorForm';

const Vendors = () => {
    // Mock vendor data with all requested fields
    const initialVendors = [
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

    const [vendors, setVendors] = useState(initialVendors);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentVendorId, setCurrentVendorId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (vendor) => {
        setCurrentVendorId(vendor.id);
        setEditMode(true);
        setShowForm(true);
    };

    const handleDelete = (vendorId) => {
        if (window.confirm('Are you sure you want to delete this vendor?')) {
            setLoading(true);
            
            // Simulate API call delay
            setTimeout(() => {
                setVendors(vendors.filter(vendor => vendor.id !== vendorId));
                setMessage('Vendor deleted successfully!');
                setLoading(false);
            }, 500);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setCurrentVendorId(null);
        setShowForm(false);
    };

    const handleFormSubmit = (formData) => {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            if (editMode) {
                // Update existing vendor
                setVendors(prevVendors => 
                    prevVendors.map(vendor => 
                        vendor.id === currentVendorId 
                            ? { ...vendor, ...formData, id: currentVendorId } 
                            : vendor
                    )
                );
                setMessage('Vendor updated successfully!');
            } else {
                // Add new vendor
                const newVendor = {
                    id: vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1,
                    ...formData
                };
                setVendors([...vendors, newVendor]);
                setMessage('Vendor added successfully!');
            }
            
            setLoading(false);
            setShowForm(false);
            setEditMode(false);
            setCurrentVendorId(null);
        }, 500);
    };

    return (
        <div className="vend-container">
            <h2 className="vend-title">Vendor Management</h2>
            
            {message && (
                <div className={message.includes('Error') ? 'vend-message error' : 'vend-message success'}>
                    {message}
                </div>
            )}
            
            <div className="vend-section">
                <div className="vend-section-header">
                    <button 
                        className="vend-button"
                        onClick={() => setShowForm(true)}
                    >
                        Add New Vendor
                    </button>
                </div>
                
                {/* Search Input */}
                <div className="search-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Vendors"
                        className="search-input"
                    />
                </div>
                
                {loading && <p className="vend-loading">Loading vendors...</p>}
                
                {vendors.length === 0 && !loading ? (
                    <p>No vendors found. Add your first vendor above.</p>
                ) : (
                    <div className="vend-list">
                        <table className="vend-table">
                            <thead>
                                <tr>
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
                                {vendors
                                    .filter(vendor => 
                                        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        vendor.account_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        vendor.id.toString().includes(searchTerm)
                                    )
                                    .map((vendor) => (
                                    <tr key={vendor.id}>
                                        <td>{vendor.id}</td>
                                        <td>{vendor.name}</td>
                                        <td>{vendor.account_code}</td>
                                        <td>{vendor.phone_no}</td>
                                        <td>{vendor.alt_phone_no}</td>
                                        <td>{vendor.email}</td>
                                        <td>{vendor.address}</td>
                                        <td>{vendor.gstin}</td>
                                        <td>{vendor.state}</td>
                                        <td>{vendor.city}</td>
                                        <td>{vendor.opening_balance}</td>
                                        <td>{vendor.invoice_date}</td>
                                        <td>{vendor.debit_credit}</td>
                                        <td>{vendor.credit_limit}</td>
                                        <td className='product-details-ac'>
                                            <button 
                                                onClick={() => handleEdit(vendor)}
                                                className="vend-action-button edit"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(vendor.id)}
                                                className="vend-action-button delete"
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
                <VendorForm
                    onClose={handleCancel}
                    onSubmit={handleFormSubmit}
                    vendor={editMode ? vendors.find(v => v.id === currentVendorId) : null}
                    editMode={editMode}
                />
            )}
        </div>
    );
};

export default Vendors;