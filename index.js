const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productcategoriesRoutes = require('./routes/productcategoriesRoutes')
const productdetailsRoutes = require('./routes/productdetailsRoutes')
const customerRoutes = require('./routes/customerRoutes');
const vendorsRoutes = require('./routes/vendorsRoutes');

const app = express();
const PORT = 8080;

app.use(cors({ 
    origin: '*', 
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/productcategories',productcategoriesRoutes);
app.use('/api/productdetails',productdetailsRoutes); 
app.use('/api/customer',customerRoutes);
app.use('/api/vendor', vendorsRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
