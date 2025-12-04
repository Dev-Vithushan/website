# API Testing Guide

This guide provides multiple ways to test the Onsko Beauty API.

## Prerequisites

1. **Start MongoDB**: Make sure MongoDB is running
   ```bash
   # If using local MongoDB
   mongod
   
   # Or if using MongoDB Atlas, ensure connection string is in .env
   ```

2. **Start the Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```

3. **Seed Initial Data** (Optional):
   ```bash
   npm run seed
   ```

---

## Method 1: Automated Test Script (Node.js)

Run the automated test suite that tests all endpoints:

```bash
cd backend
npm test
# or
npm run test:api
```

This will:
- Test all API endpoints
- Show pass/fail status for each test
- Display a summary at the end

---

## Method 2: Shell Script (curl)

Run the bash script that uses curl:

```bash
cd backend
./test-api.sh
```

Make sure the script is executable:
```bash
chmod +x test-api.sh
```

---

## Method 3: Postman Collection

### Import to Postman:

1. Open Postman
2. Click "Import"
3. Use the endpoints listed in `POSTMAN_COLLECTION.md`

### Manual Setup:

1. **Create Environment**:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (leave empty, will be set after login)

2. **Test Flow**:
   - Register/Login → Copy token → Set in environment
   - Use token in Authorization header for protected routes

### Quick Test in Postman:

1. **Health Check**:
   ```
   GET http://localhost:5000/api/health
   ```

2. **Register**:
   ```
   POST http://localhost:5000/api/auth/register
   Body (JSON):
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "test123456"
   }
   ```
   - Copy the `token` from response
   - Set as environment variable `token`

3. **Set Authorization**:
   - Go to Authorization tab
   - Type: Bearer Token
   - Token: `{{token}}` (or paste directly)

4. **Test Protected Endpoints**:
   - Get Products: `GET /api/products`
   - Get My Profile: `GET /api/users/profile/me`
   - Add to Cart: `POST /api/cart` with body `{"productId": "...", "quantity": 1}`

---

## Method 4: Using curl (Manual)

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Products (No Auth Required)
```bash
curl http://localhost:5000/api/products
```

### Get My Profile (Auth Required)
```bash
# Replace YOUR_TOKEN with the token from login/register
curl http://localhost:5000/api/users/profile/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID_HERE",
    "quantity": 2
  }'
```

---

## Method 5: Using Browser Console

Open browser console and test with fetch:

```javascript
// Register
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123456'
  })
})
.then(res => res.json())
.then(data => {
  console.log('Token:', data.token);
  localStorage.setItem('token', data.token);
});

// Get Products
fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(data => console.log('Products:', data));

// Get My Profile (with token)
const token = localStorage.getItem('token');
fetch('http://localhost:5000/api/users/profile/me', {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(res => res.json())
  .then(data => console.log('Profile:', data));
```

---

## Expected Test Results

When running the automated tests, you should see:

✅ **Health Check** - 200 OK
✅ **User Registration** - 201 Created
✅ **User Login** - 200 OK
✅ **Get Current User** - 200 OK
✅ **Get Products** - 200 OK
✅ **Get Single Product** - 200 OK
✅ **Get My Profile** - 200 OK
✅ **Update My Profile** - 200 OK
✅ **Get All Users** - 200 OK (or 403 if not admin)
✅ **Get Single User** - 200 OK
✅ **Add to Wishlist** - 200 OK
✅ **Get Wishlist** - 200 OK
✅ **Add to Cart** - 200 OK
✅ **Get Cart** - 200 OK
✅ **Update Cart Item** - 200 OK
✅ **Newsletter Subscribe** - 201 Created

---

## Troubleshooting

### Server Not Running
```bash
# Check if server is running
lsof -ti:5000

# Start server
cd backend
npm run dev
```

### MongoDB Connection Error
- Check MongoDB is running
- Verify MONGODB_URI in `.env` file
- Test connection: `mongosh "your-connection-string"`

### CORS Errors
- Make sure FRONTEND_URL in `.env` matches your frontend URL
- Default: `http://localhost:5173`

### Authentication Errors
- Verify token is being sent in Authorization header
- Check token format: `Bearer <token>`
- Token might be expired (default: 7 days)

---

## Test Coverage

The automated test script covers:
- ✅ Authentication (Register, Login, Get Me)
- ✅ User Management (CRUD operations)
- ✅ Product Management (Read operations)
- ✅ Wishlist (Add, Get)
- ✅ Cart (Add, Get, Update)
- ✅ Newsletter (Subscribe)

For full CRUD testing of Products and Users (Admin operations), you'll need an admin account.

---

## Creating an Admin User

To test admin endpoints, create an admin user directly in MongoDB:

```javascript
// In MongoDB shell or MongoDB Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or register a user and manually update the role in the database.

