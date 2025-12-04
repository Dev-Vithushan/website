import dotenv from 'dotenv';
import connectDB from '../config/database.js';

// Load environment variables
dotenv.config();

// Test database connection
async function testConnection() {
  console.log('🔌 Testing MongoDB Connection...');
  console.log(`📍 Connection String: ${process.env.MONGODB_URI ? 'Set ✓' : 'Not set ✗'}`);
  console.log('');
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in .env file');
    console.error('💡 Please create a .env file with your MongoDB connection string');
    process.exit(1);
  }
  
  try {
    await connectDB();
    console.log('');
    console.log('✅ Connection test successful!');
    console.log('🎉 Your database is ready to use.');
    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Connection test failed!');
    process.exit(1);
  }
}

testConnection();

