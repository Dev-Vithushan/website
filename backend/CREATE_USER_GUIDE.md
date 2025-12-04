# Create User Guide

There are two ways to create users in the Onsko Beauty API:

## Method 1: Using API Endpoint (Recommended)

### Register User via API

**Endpoint**: `POST /api/auth/register`

**Request**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response**:
```json
{
  "_id": "69312dae4a66040d5dc39cfc",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Using Postman**:
1. Method: `POST`
2. URL: `http://localhost:5000/api/auth/register`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Using JavaScript/Fetch**:
```javascript
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => {
  console.log('User created:', data);
  console.log('Token:', data.token);
});
```

---

## Method 2: Using Script (Direct Database)

### Create User via Script

**Command**:
```bash
cd backend
npm run create:user "Name" "email@example.com" "password" "role"
```

**Examples**:

1. **Create regular user**:
```bash
npm run create:user "John Doe" "john@example.com" "password123"
```

2. **Create admin user**:
```bash
npm run create:user "Admin User" "admin@example.com" "admin123" "admin"
```

3. **Create user with defaults**:
```bash
npm run create:user
# Creates: Test User, test{timestamp}@example.com, test123456, user
```

**Parameters**:
- `name` (optional): User's full name
- `email` (optional): User's email address
- `password` (optional): User's password (min 6 characters)
- `role` (optional): User role - "user" or "admin" (default: "user")

---

## User Created Successfully! ✅

**User Details**:
- **ID**: `69312dae4a66040d5dc39cfc`
- **Name**: John Doe
- **Email**: john@example.com
- **Role**: user
- **Created**: Just now

---

## Login with Created User

After creating a user, you can login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response**:
```json
{
  "_id": "69312dae4a66040d5dc39cfc",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Save the `token` to use for authenticated requests!

---

## Validation Rules

- **Name**: Required, any string
- **Email**: Required, valid email format, must be unique
- **Password**: Required, minimum 6 characters
- **Role**: Optional, must be "user" or "admin" (default: "user")

---

## Error Responses

### Email Already Exists
```json
{
  "message": "User already exists"
}
```

### Validation Error
```json
{
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email"
    }
  ]
}
```

---

## Next Steps

1. ✅ User created
2. 🔐 Login to get authentication token
3. 🔑 Use token for protected endpoints
4. 🛒 Start using cart, wishlist, and other features!

