import dotenv from 'dotenv';

dotenv.config();

// Use native fetch (Node.js 18+)
const fetch = globalThis.fetch;

const BASE_URL = process.env.API_URL || 'http://localhost:5000/api';
let authToken = '';
let adminToken = '';
let userId = '';
let productId = '';
let testUser = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`,
  password: 'test123456'
};

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', body = null, token = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    let data;
    const text = await response.text();
    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      data = { raw: text, parseError: parseError.message };
    }
    return { status: response.status, data };
  } catch (error) {
    return { status: 500, data: { error: error.message } };
  }
}

// Test functions
async function testHealthCheck() {
  console.log('\n🏥 Testing Health Check...');
  const result = await apiCall('/health');
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testRegister() {
  console.log('\n📝 Testing User Registration...');
  const result = await apiCall('/auth/register', 'POST', testUser);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  if (result.status === 201) {
    authToken = result.data.token;
    userId = result.data._id;
  }
  return result.status === 201;
}

async function testLogin() {
  console.log('\n🔐 Testing User Login...');
  const result = await apiCall('/auth/login', 'POST', {
    email: testUser.email,
    password: testUser.password
  });
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  if (result.status === 200) {
    authToken = result.data.token;
    userId = result.data._id;
  }
  return result.status === 200;
}

async function testGetMe() {
  console.log('\n👤 Testing Get Current User...');
  const result = await apiCall('/auth/me', 'GET', null, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testGetProducts() {
  console.log('\n📦 Testing Get Products...');
  const result = await apiCall('/products');
  console.log(`Status: ${result.status}`);
  console.log(`Total Products: ${result.data.total || result.data.products?.length || 0}`);
  if (result.data.products && result.data.products.length > 0) {
    productId = result.data.products[0]._id;
  }
  return result.status === 200;
}

async function testGetProduct() {
  if (!productId) {
    console.log('\n⚠️  Skipping Get Single Product - No product ID available');
    return false;
  }
  console.log('\n📦 Testing Get Single Product...');
  const result = await apiCall(`/products/${productId}`);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testGetMyProfile() {
  console.log('\n👤 Testing Get My Profile...');
  const result = await apiCall('/users/profile/me', 'GET', null, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testUpdateMyProfile() {
  console.log('\n✏️  Testing Update My Profile...');
  const result = await apiCall('/users/profile/me', 'PUT', {
    name: 'Updated Test User'
  }, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testGetUsers() {
  console.log('\n👥 Testing Get All Users (Admin only)...');
  const result = await apiCall('/users', 'GET', null, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.status === 200 ? `Total Users: ${result.data.total || 0}` : result.data);
  return result.status === 200 || result.status === 403;
}

async function testGetUser() {
  if (!userId) {
    console.log('\n⚠️  Skipping Get User - No user ID available');
    return false;
  }
  console.log('\n👤 Testing Get Single User...');
  const result = await apiCall(`/users/${userId}`, 'GET', null, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testUpdateUser() {
  if (!userId) {
    console.log('\n⚠️  Skipping Update User - No user ID available');
    return false;
  }
  console.log('\n✏️  Testing Update User...');
  const result = await apiCall(`/users/${userId}`, 'PUT', {
    name: 'Updated Name Again'
  }, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testAddToWishlist() {
  if (!productId) {
    console.log('\n⚠️  Skipping Add to Wishlist - No product ID available');
    return false;
  }
  console.log('\n❤️  Testing Add to Wishlist...');
  const result = await apiCall('/wishlist', 'POST', {
    productId: productId
  }, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testGetWishlist() {
  console.log('\n❤️  Testing Get Wishlist...');
  const result = await apiCall('/wishlist', 'GET', null, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testAddToCart() {
  if (!productId) {
    console.log('\n⚠️  Skipping Add to Cart - No product ID available');
    return false;
  }
  console.log('\n🛒 Testing Add to Cart...');
  const result = await apiCall('/cart', 'POST', {
    productId: productId,
    quantity: 2
  }, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testGetCart() {
  console.log('\n🛒 Testing Get Cart...');
  const result = await apiCall('/cart', 'GET', null, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testUpdateCartItem() {
  if (!productId) {
    console.log('\n⚠️  Skipping Update Cart Item - No product ID available');
    return false;
  }
  console.log('\n🛒 Testing Update Cart Item...');
  const result = await apiCall(`/cart/${productId}`, 'PUT', {
    quantity: 3
  }, authToken);
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testNewsletterSubscribe() {
  console.log('\n📧 Testing Newsletter Subscribe...');
  const result = await apiCall('/newsletter', 'POST', {
    email: `newsletter${Date.now()}@example.com`
  });
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  return result.status === 201;
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting API Tests...');
  console.log(`Base URL: ${BASE_URL}`);
  
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  // Health check
  const healthCheck = await testHealthCheck();
  results.tests.push({ name: 'Health Check', passed: healthCheck });
  healthCheck ? results.passed++ : results.failed++;

  // Auth tests
  const register = await testRegister();
  results.tests.push({ name: 'User Registration', passed: register });
  register ? results.passed++ : results.failed++;

  const login = await testLogin();
  results.tests.push({ name: 'User Login', passed: login });
  login ? results.passed++ : results.failed++;

  const getMe = await testGetMe();
  results.tests.push({ name: 'Get Current User', passed: getMe });
  getMe ? results.passed++ : results.failed++;

  // Product tests
  const getProducts = await testGetProducts();
  results.tests.push({ name: 'Get Products', passed: getProducts });
  getProducts ? results.passed++ : results.failed++;

  const getProduct = await testGetProduct();
  if (getProduct !== false) {
    results.tests.push({ name: 'Get Single Product', passed: getProduct });
    getProduct ? results.passed++ : results.failed++;
  }

  // User tests
  const getMyProfile = await testGetMyProfile();
  results.tests.push({ name: 'Get My Profile', passed: getMyProfile });
  getMyProfile ? results.passed++ : results.failed++;

  const updateMyProfile = await testUpdateMyProfile();
  results.tests.push({ name: 'Update My Profile', passed: updateMyProfile });
  updateMyProfile ? results.passed++ : results.failed++;

  const getUsers = await testGetUsers();
  results.tests.push({ name: 'Get All Users', passed: getUsers });
  getUsers ? results.passed++ : results.failed++;

  const getUser = await testGetUser();
  if (getUser !== false) {
    results.tests.push({ name: 'Get Single User', passed: getUser });
    getUser ? results.passed++ : results.failed++;
  }

  const updateUser = await testUpdateUser();
  if (updateUser !== false) {
    results.tests.push({ name: 'Update User', passed: updateUser });
    updateUser ? results.passed++ : results.failed++;
  }

  // Wishlist tests
  const addToWishlist = await testAddToWishlist();
  if (addToWishlist !== false) {
    results.tests.push({ name: 'Add to Wishlist', passed: addToWishlist });
    addToWishlist ? results.passed++ : results.failed++;
  }

  const getWishlist = await testGetWishlist();
  results.tests.push({ name: 'Get Wishlist', passed: getWishlist });
  getWishlist ? results.passed++ : results.failed++;

  // Cart tests
  const addToCart = await testAddToCart();
  if (addToCart !== false) {
    results.tests.push({ name: 'Add to Cart', passed: addToCart });
    addToCart ? results.passed++ : results.failed++;
  }

  const getCart = await testGetCart();
  results.tests.push({ name: 'Get Cart', passed: getCart });
  getCart ? results.passed++ : results.failed++;

  const updateCartItem = await testUpdateCartItem();
  if (updateCartItem !== false) {
    results.tests.push({ name: 'Update Cart Item', passed: updateCartItem });
    updateCartItem ? results.passed++ : results.failed++;
  }

  // Newsletter tests
  const newsletter = await testNewsletterSubscribe();
  results.tests.push({ name: 'Newsletter Subscribe', passed: newsletter });
  newsletter ? results.passed++ : results.failed++;

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  results.tests.forEach(test => {
    const icon = test.passed ? '✅' : '❌';
    console.log(`${icon} ${test.name}`);
  });
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  console.log('='.repeat(50));
}

// Run tests
runTests().catch(console.error);

