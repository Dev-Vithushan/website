import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const createUser = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Get user data from command line arguments or use defaults
    const name = process.argv[2] || 'Test User';
    const email = process.argv[3] || `test${Date.now()}@example.com`;
    const password = process.argv[4] || 'test123456';
    const role = process.argv[5] || 'user';
    
    console.log('👤 Creating user...');
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Role: ${role}`);
    console.log('');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists with this email!');
      process.exit(1);
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role
    });
    
    console.log('✅ User created successfully!');
    console.log('');
    console.log('User Details:');
    console.log(`   ID: ${user._id}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Created: ${user.createdAt}`);
    console.log('');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    process.exit(1);
  }
};

createUser();

