import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css'; // Make sure to create and import a CSS file for styling

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-brand">
      </div>
      <nav>
        <ul className="navbar">
          <li className="dropdown">
            <p>
              <i className="fas fa-database"></i> Master <i className="fas fa-chevron-down" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
            </p>
            <div className="dropdown-content">
              <NavLink to="/ProductCategories"><i className="fas fa-tags"></i> Product Categories</NavLink>
              <NavLink to="/ProductDetails"><i className="fas fa-box"></i> Product Details</NavLink>
              <NavLink to="/Customers"><i className="fas fa-users"></i> Customers</NavLink>
              <NavLink to="/Vendors"><i className="fas fa-building"></i> Vendors</NavLink>
            </div>
          </li>

          <li className="dropdown">
            <p>
              <i className="fas fa-file-invoice-dollar"></i> Billing <i className="fas fa-chevron-down" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
            </p>
            <div className="dropdown-content">
              <NavLink to="/Sales"><i className="fas fa-shopping-cart"></i> Sales</NavLink>
              <NavLink to="/Purchase"><i className="fas fa-truck"></i> Purchase</NavLink>
            </div>
          </li>

          <li className="dropdown">
            <p>
              <i className="fas fa-chart-bar"></i> Report <i className="fas fa-chevron-down" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
            </p>
            <div className="dropdown-content">
              <NavLink to="/SalesReport"><i className="fas fa-chart-line"></i> Sales Report</NavLink>
              <NavLink to="/PurchaseReport"><i className="fas fa-chart-pie"></i> Purchase Report</NavLink>
            </div>
          </li>
        </ul>
      </nav>
      
      <hr />
    </div>
  );
};

export default Navbar;