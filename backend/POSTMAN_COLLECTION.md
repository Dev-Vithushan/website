# Postman Collection Guide

This guide provides all the API endpoints for testing in Postman or any API testing tool.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-token>
```

---

## 1. Health Check

**GET** `/health`
- **Auth**: None
- **Response**: `{ status: 'OK', message: 'Server is running' }`

---

## 2. Authentication Endpoints

### Register User
**POST** `/auth/register`
- **Auth**: None
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
**POST** `/auth/login`
- **Auth**: None
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**: Returns token in response

### Get Current User
**GET** `/auth/me`
- **Auth**: Required (Bearer Token)

---

## 3. User Endpoints

### Get All Users (Admin Only)
**GET** `/users`
- **Auth**: Required (Admin Token)
- **Query Params**: 
  - `limit` (optional, default: 20)
  - `page` (optional, default: 1)
  - `search` (optional)

### Get Single User
**GET** `/users/:id`
- **Auth**: Required (Own profile or Admin)
- **Params**: `id` - User ID

### Get My Profile
**GET** `/users/profile/me`
- **Auth**: Required

### Update My Profile
**PUT** `/users/profile/me`
- **Auth**: Required
- **Body**:
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

### Update User
**PUT** `/users/:id`
- **Auth**: Required (Own profile or Admin)
- **Body**:
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "admin"  // Admin only
}
```

### Update Password
**PUT** `/users/:id/password`
- **Auth**: Required (Own profile only)
- **Body**:
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### Delete User (Admin Only)
**DELETE** `/users/:id`
- **Auth**: Required (Admin Token)

---

## 4. Product Endpoints

### Get All Products
**GET** `/products`
- **Auth**: None
- **Query Params**:
  - `category` (optional)
  - `search` (optional)
  - `limit` (optional, default: 20)
  - `page` (optional, default: 1)

### Get Single Product
**GET** `/products/:id`
- **Auth**: None
- **Params**: `id` - Product ID

### Create Product (Admin Only)
**POST** `/products`
- **Auth**: Required (Admin Token)
- **Body**:
```json
{
  "name": "New Product",
  "category": "Face Care",
  "price": 50,
  "description": "Product description",
  "color": "#8BC34A",
  "inStock": true,
  "stockQuantity": 100
}
```

### Update Product (Admin Only)
**PUT** `/products/:id`
- **Auth**: Required (Admin Token)
- **Body**: Same as create, all fields optional

### Delete Product (Admin Only)
**DELETE** `/products/:id`
- **Auth**: Required (Admin Token)

---

## 5. Wishlist Endpoints

### Get Wishlist
**GET** `/wishlist`
- **Auth**: Required

### Add to Wishlist
**POST** `/wishlist`
- **Auth**: Required
- **Body**:
```json
{
  "productId": "product-id-here"
}
```

### Remove from Wishlist
**DELETE** `/wishlist/:productId`
- **Auth**: Required
- **Params**: `productId` - Product ID

---

## 6. Cart Endpoints

### Get Cart
**GET** `/cart`
- **Auth**: Required

### Add to Cart
**POST** `/cart`
- **Auth**: Required
- **Body**:
```json
{
  "productId": "product-id-here",
  "quantity": 2
}
```

### Update Cart Item
**PUT** `/cart/:productId`
- **Auth**: Required
- **Body**:
```json
{
  "quantity": 3
}
```

### Remove from Cart
**DELETE** `/cart/:productId`
- **Auth**: Required
- **Params**: `productId` - Product ID

### Clear Cart
**DELETE** `/cart`
- **Auth**: Required

---

## 7. Newsletter Endpoints

### Subscribe to Newsletter
**POST** `/newsletter`
- **Auth**: None
- **Body**:
```json
{
  "email": "user@example.com"
}
```

### Unsubscribe from Newsletter
**POST** `/newsletter/unsubscribe`
- **Auth**: None
- **Body**:
```json
{
  "email": "user@example.com"
}
```

---

## Testing Workflow

1. **Start the server**: `npm run dev` in the backend directory
2. **Health Check**: Test `/api/health` to ensure server is running
3. **Register/Login**: Create a user and get a token
4. **Save Token**: Copy the token from login/register response
5. **Set Authorization**: In Postman, go to Authorization tab, select "Bearer Token", paste your token
6. **Test Endpoints**: Start testing protected endpoints

## Environment Variables for Postman

Create a Postman environment with:
- `base_url`: `http://localhost:5000/api`
- `token`: (will be set after login)
- `user_id`: (will be set after login)
- `product_id`: (will be set after getting products)

## Common Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (no/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Server Error

