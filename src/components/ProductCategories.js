import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCategories.css";

const ProductCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categoriesPerPage = 5;

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/productcategories/");
      console.log("API Response:", response);
      console.log("API Response Data:", response.data);
      
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
        setMessage("Invalid data format from API");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMessage(`Error fetching categories: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setMessage("Category name cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const payload = { name: categoryName.trim() };

      if (editMode && currentCategoryId) {
        await axios.put(`http://localhost:8080/api/productcategories/${currentCategoryId}`, payload);
        setMessage("Category updated successfully!");
      } else {
        await axios.post("http://localhost:8080/api/productcategories/create", payload);
        setMessage("Category added successfully!");
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error during category creation/updation:", error);
      if (error.response && error.response.status === 409) {
        setMessage("Category name already exists.");
      } else if (error.response && error.response.status === 400) {
        setMessage("Category name is required.");
      } else {
        setMessage(`Error processing category: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCategoryName("");
    setEditMode(false);
    setCurrentCategoryId(null);
  };

  const handleEdit = (category) => {
    if (!category || !category.id) {
      setMessage("Cannot edit category: Invalid category data");
      return;
    }
    setCategoryName(category.name);
    setCurrentCategoryId(category.id);
    setEditMode(true);
  };

  const handleDelete = async (categoryId) => {
    if (!categoryId) {
      setMessage("Cannot delete category: Invalid category ID");
      return;
    }
    
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/api/productcategories/${categoryId}`);
      setMessage("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      setMessage(`Error deleting category: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    (category && category.name ? category.name.toLowerCase().includes(searchTerm.toLowerCase()) : false)
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="categories-container">
      <h2 className="categories-title">Product Categories</h2>

      {message && <div className={`categories-message ${message.includes("Error") ? "error" : "success"}`}>{message}</div>}

      <div className="categories-section">
        <h3>{editMode ? "Edit Category" : "Add New Category"}</h3>
        <form onSubmit={handleAddCategory} className="categories-form">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="categories-input"
            required
          />
          <button type="submit" className="categories-button" disabled={loading}>
            {loading ? "Processing..." : editMode ? "Update Category" : "Add Category"}
          </button>
          {editMode && (
            <button type="button" className="categories-button cancel" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="categories-section">
        <h3>Existing Categories</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Categories"
          className="categories-search-input"
        />

        {loading && <p className="categories-loading">Loading categories...</p>}

        {!loading && (
          <div className="categories-status">
            {filteredCategories.length === 0 ? (
              <p>No categories found. {searchTerm ? "Try a different search term or " : ""}Add your first category above.</p>
            ) : (
              <p>Showing {currentCategories.length} of {filteredCategories.length} categories</p>
            )}
          </div>
        )}

        {filteredCategories.length > 0 && (
          <table className="categories-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button onClick={() => handleEdit(category)} className="categories-action-button edit">Edit</button>
                    <button onClick={() => handleDelete(category.id)} className="categories-action-button delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filteredCategories.length > categoriesPerPage && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredCategories.length / categoriesPerPage) }, (_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)} className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategories;