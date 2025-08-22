const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a product (for admin)
router.post('/add', async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    imageUrl,
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;