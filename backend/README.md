# Onsko Beauty Backend API

Backend API for Onsko Beauty e-commerce website built with Node.js, Express, and MongoDB.

## Features

- 🔐 User Authentication (Register/Login with JWT)
- 👥 User Management (Full CRUD operations)
- 📦 Product Management (CRUD operations)
- ❤️ Wishlist Functionality
- 🛒 Shopping Cart Management
- 📧 Newsletter Subscription
- 🔒 Protected Routes with JWT
- 👤 Admin Role Management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/onsko-beauty
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user by ID (Admin or own profile)
- `PUT /api/users/:id` - Update user (Admin or own profile)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PUT /api/users/:id/password` - Update user password (Own profile only)
- `GET /api/users/profile/me` - Get current user profile (Protected)
- `PUT /api/users/profile/me` - Update current user profile (Protected)

### Products
- `GET /api/products` - Get all products (with optional query params: category, search, limit, page)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (Protected)
- `POST /api/wishlist` - Add product to wishlist (Protected)
- `DELETE /api/wishlist/:productId` - Remove product from wishlist (Protected)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:productId` - Update cart item quantity (Protected)
- `DELETE /api/cart/:productId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Example API Calls

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

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Get All Users (Admin only)
```bash
curl http://localhost:5000/api/users \
  -H "Authorization: Bearer <admin-token>"
```

### Get Single User
```bash
curl http://localhost:5000/api/users/:userId \
  -H "Authorization: Bearer <your-token>"
```

### Update User Profile
```bash
curl -X PUT http://localhost:5000/api/users/profile/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "Updated Name",
    "email": "updated@example.com"
  }'
```

### Update Password
```bash
curl -X PUT http://localhost:5000/api/users/:userId/password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "currentPassword": "oldpassword",
    "newPassword": "newpassword123"
  }'
```

### Add to Cart (Protected)
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "productId": "product-id-here",
    "quantity": 1
  }'
```

## Database Models

### User
- name, email, password, role, createdAt

**User CRUD Operations:**
- Users can view and update their own profile
- Admins can view, update, and delete any user
- Password updates require current password verification
- Users cannot change their own role (admin only)

### Product
- name, category, price, description, color, image, inStock, stockQuantity, isNew, rating, numReviews, createdAt

### Wishlist
- user, products[], createdAt, updatedAt

### Cart
- user, items[], createdAt, updatedAt

### Newsletter
- email, subscribed, subscribedAt

## Error Handling

The API returns standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## License

ISC

