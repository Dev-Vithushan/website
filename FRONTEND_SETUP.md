# Frontend Setup Guide

## Environment Variables

Create a `.env` file in the root directory (same level as `package.json`):

```env
VITE_API_URL=http://localhost:5000/api
```

If you don't create this file, it will default to `http://localhost:5000/api`.

## Testing Login

### Test Credentials

You can use these test users:

1. **John Doe**
   - Email: `john@example.com`
   - Password: `password123`

2. **Jane Smith**
   - Email: `jane@example.com`
   - Password: `jane123456`

### Steps to Test

1. **Start Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   npm run dev
   ```

3. **Navigate to Login Page**:
   - Go to `http://localhost:5173/login`
   - Or click "log in" in the header

4. **Login**:
   - Enter email: `john@example.com`
   - Enter password: `password123`
   - Click "Sign In"

5. **Success**:
   - You'll see "Login successful! Redirecting..."
   - You'll be redirected to home page
   - Header will show your name instead of "log in"
   - You can click "Logout" to sign out

## Features

- ✅ User Registration
- ✅ User Login
- ✅ Authentication State Management
- ✅ Token Storage (localStorage)
- ✅ Protected Routes
- ✅ User Display in Header
- ✅ Logout Functionality

## API Integration

The frontend is now connected to:
- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/auth/me` - Get current user (automatic on page load)

