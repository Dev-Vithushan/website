import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Glow Serum',
    category: 'Face Care',
    price: 48,
    color: '#8BC34A',
    description: 'Vitamin C infused brightening serum',
    inStock: true,
    stockQuantity: 50,
    isNew: true
  },
  {
    name: 'Hydra Cream',
    category: 'Moisturizer',
    price: 52,
    color: '#F4A460',
    description: 'Deep hydration for all skin types',
    inStock: true,
    stockQuantity: 45,
    isNew: true
  },
  {
    name: 'Rose Toner',
    category: 'Toner',
    price: 38,
    color: '#DDA0DD',
    description: 'Balancing rose water formula',
    inStock: true,
    stockQuantity: 60,
    isNew: true
  },
  {
    name: 'Sun Shield',
    category: 'SPF Protection',
    price: 42,
    color: '#87CEEB',
    description: 'Lightweight SPF 50+ protection',
    inStock: true,
    stockQuantity: 55,
    isNew: true
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`Seeded ${createdProducts.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

