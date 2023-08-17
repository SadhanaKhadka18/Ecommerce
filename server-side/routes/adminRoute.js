const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Product = require('../model/Product').ProductModel; // Assuming you have your Product model defined

const app = express();

// ... (other middleware and database connection setup)

// Use express.json() middleware to parse incoming JSON data
app.use(express.json());

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a route to handle the product addition
app.post('/', upload.single('productImage'), async (req, res) => {
    try {
        console.log("hereeeee",req.body)

        const {
            id:productId,
            name:productName,
            price:productPrice,
            stock:productStock,
            description:productDescription,
            imageName:productImage
        } = req.body;

        // // Create a new Product instance using the schema
        console.log("hereeeee",productDescription)
        const newProduct = new Product({
            id: parseInt(productId),
            name: productName,
            price: parseInt(productPrice),
            stock: parseInt(productStock),
            description: productDescription,
            imageName: productImage,
        });

        // Save the new product to the database
        await newProduct.save();

        res.status(200).json({ message: 'Product added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the product.' });
        console.error(error);
    }
});

// ... (other routes and server setup)

module.exports = app;
