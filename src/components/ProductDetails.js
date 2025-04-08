import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import ProductDetailsForm from './ProductDetailsForm';

const ProductDetails = () => {
    // Mock data for categories
    const mockCategories = [
        { category_id: 1, category_name: "Electronics" },
        { category_id: 2, category_name: "Clothing" },
        { category_id: 3, category_name: "Home & Kitchen" },
        { category_id: 4, category_name: "Food" }
    ];

    // Updated mock data to match all columns from screenshot
    const mockProducts = [
        { 
            product_id: 1, 
            product_name: "test", 
            product_code: "test",
            hsn_code: "0",
            rol: 0,
            igst: 0,
            sgst: 0,
            cgst: 0,
            purchase_price: 10,
            sales_price: 0,
            mrp: 0,
            expiry_date: "",
            unit: "0",
            alt_unit: 0,
            uc_factor: 0,
            discountp: 0,
            product_category: "test",
            purchase_inclusive: "no",
            sales_inclusive: "no",
            category_id: 1,
            description: "Test product"
        }
    ];

    const [products, setProducts] = useState(mockProducts);
    const [categories, setCategories] = useState(mockCategories);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Updated form state to include all fields
    const [formData, setFormData] = useState({
        product_name: '',
        product_code: '',
        hsn_code: '',
        rol: 0,
        igst: 0,
        sgst: 0,
        cgst: 0,
        purchase_price: '',
        sales_price: '',
        mrp: 0,
        expiry_date: '',
        unit: '',
        alt_unit: 0,
        uc_factor: 0,
        discountp: 0,
        product_category: '',
        purchase_inclusive: 'no',
        sales_inclusive: 'no',
        category_id: '',
        description: ''
    });

    useEffect(() => {
        // Set default category if available
        if (categories.length > 0 && !formData.category_id) {
            setFormData(prev => ({ 
                ...prev, 
                category_id: categories[0].category_id,
                product_category: categories[0].category_name
            }));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            if (editMode) {
                // Update existing product in our mock data
                setProducts(prevProducts => 
                    prevProducts.map(prod => 
                        prod.product_id === currentProductId 
                            ? { ...prod, ...formData } 
                            : prod
                    )
                );
                setMessage('Product updated successfully!');
                setEditMode(false);
                setCurrentProductId(null);
            } else {
                // Add new product to our mock data
                const newProduct = {
                    product_id: products.length > 0 ? Math.max(...products.map(p => p.product_id)) + 1 : 1,
                    ...formData
                };
                setProducts([...products, newProduct]);
                setMessage('Product added successfully!');
            }
            
            // Reset form
            resetForm();
            setLoading(false);
        }, 500); // Simulate network delay
    };

    const handleEdit = (product) => {
        setFormData({
            product_name: product.product_name,
            product_code: product.product_code,
            hsn_code: product.hsn_code,
            rol: product.rol,
            igst: product.igst,
            sgst: product.sgst,
            cgst: product.cgst,
            purchase_price: product.purchase_price,
            sales_price: product.sales_price,
            mrp: product.mrp,
            expiry_date: product.expiry_date,
            unit: product.unit,
            alt_unit: product.alt_unit,
            uc_factor: product.uc_factor,
            discountp: product.discountp,
            product_category: product.product_category,
            purchase_inclusive: product.purchase_inclusive,
            sales_inclusive: product.sales_inclusive,
            category_id: product.category_id,
            description: product.description || ''
        });
        setCurrentProductId(product.product_id);
        setEditMode(true);
        setShowForm(true);
    };

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setLoading(true);
            
            // Simulate API call delay
            setTimeout(() => {
                setProducts(products.filter(prod => prod.product_id !== productId));
                setMessage('Product deleted successfully!');
                setLoading(false);
            }, 500);
        }
    };

    const resetForm = () => {
        setFormData({
            product_name: '',
            product_code: '',
            hsn_code: '',
            rol: 0,
            igst: 0,
            sgst: 0,
            cgst: 0,
            purchase_price: '',
            sales_price: '',
            mrp: 0,
            expiry_date: '',
            unit: '',
            alt_unit: 0,
            uc_factor: 0,
            discountp: 0,
            product_category: '',
            purchase_inclusive: 'no',
            sales_inclusive: 'no',
            category_id: categories.length > 0 ? categories[0].category_id : '',
            description: ''
        });
        setEditMode(false);
        setCurrentProductId(null);
    };

    const handleCancel = () => {
        resetForm();
        setShowForm(false);
    };

    const handleFormSubmit = (formData) => {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            const newProduct = {
                product_id: products.length > 0 ? Math.max(...products.map(p => p.product_id)) + 1 : 1,
                product_name: formData.product_name,
                product_code: formData.product_code,
                hsn_code: formData.hsn_code || '0',
                rol: formData.rol || 0,
                igst: formData.igst || 0,
                sgst: formData.sgst || 0,
                cgst: formData.cgst || 0,
                purchase_price: formData.purchase_price || 0,
                sales_price: formData.sales_price || 0,
                mrp: formData.mrp || 0,
                expiry_date: formData.expiry_date || '',
                unit: formData.unit || '',
                alt_unit: formData.alt_unit || 0,
                uc_factor: formData.uc_factor || 0,
                discountp: formData.discountp || 0,
                product_category: formData.product_category || '',
                purchase_inclusive: formData.purchase_inclusive || 'no',
                sales_inclusive: formData.sales_inclusive || 'no',
                category_id: parseInt(formData.category_id),
                description: formData.description || '',
            };
            setProducts([...products, newProduct]);
            setMessage('Product added successfully!');
            setLoading(false);
            setShowForm(false);
        }, 500);
    };

    // Find category name by ID
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.category_id === categoryId);
        return category ? category.category_name : 'Unknown';
    };

    return (
        <div className="product-details-container">
            <h2 className="product-details-title">Product Management</h2>
            
            {message && (
                <div className={message.includes('Error') ? 'product-details-message error' : 'product-details-message success'}>
                    {message}
                </div>
            )}
            
            <div className="product-details-section">
                <div className="product-details-section-header">
                    <button 
                        className="product-details-button"
                        onClick={() => setShowForm(true)}
                    >
                        Add New Product
                    </button>
                </div>
                
                {/* Search Input */}
                <div className="product-details-search-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Products..."
                        className="product-details-search-input"
                    />
                </div>
                
                {loading && <p className="product-details-loading">Loading products...</p>}
                
                {products.length === 0 && !loading ? (
                    <p>No products found. Add your first product above.</p>
                ) : (
                    <div className="product-details-list">
                        <table className="product-details-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>PRODUCT NAME</th>
                                    <th>PRODUCT CODE</th>
                                    <th>HSN CODE</th>
                                    <th>ROL</th>
                                    <th>IGST</th>
                                    <th>SGST</th>
                                    <th>CGST</th>
                                    <th>PURCHASE PRICE</th>
                                    <th>SALES PRICE</th>
                                    <th>MRP</th>
                                    <th>EXPIRY DATE</th>
                                    <th>UNIT</th>
                                    <th>ALT UNIT</th>
                                    <th>UC FACTOR</th>
                                    <th>DISCOUNTP</th>
                                    <th>PRODUCT CATEGORY</th>
                                    <th>PURCHASE INCLUSIVE</th>
                                    <th>SALES INCLUSIVE</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products
                                    .filter(product => 
                                        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        product.product_id.toString().includes(searchTerm)
                                    )
                                    .map((product) => (
                                    <tr key={product.product_id}>
                                        <td>{product.product_id}</td>
                                        <td>{product.product_name}</td>
                                        <td>{product.product_code}</td>
                                        <td>{product.hsn_code}</td>
                                        <td>{product.rol}</td>
                                        <td>{product.igst}</td>
                                        <td>{product.sgst}</td>
                                        <td>{product.cgst}</td>
                                        <td>{product.purchase_price}</td>
                                        <td>{product.sales_price}</td>
                                        <td>{product.mrp}</td>
                                        <td>{product.expiry_date}</td>
                                        <td>{product.unit}</td>
                                        <td>{product.alt_unit}</td>
                                        <td>{product.uc_factor}</td>
                                        <td>{product.discountp}</td>
                                        <td>{product.product_category}</td>
                                        <td>{product.purchase_inclusive}</td>
                                        <td>{product.sales_inclusive}</td>
                                        <td className="product-details-act">
                                            <button 
                                                onClick={() => handleEdit(product)}
                                                className="product-details-action-button edit"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.product_id)}
                                                className="product-details-action-button delete"
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
                <ProductDetailsForm
                    onClose={handleCancel}
                    onSubmit={handleFormSubmit}
                    formData={formData}
                    categories={categories}
                    editMode={editMode}
                />
            )}
        </div>
    );
};

export default ProductDetails;