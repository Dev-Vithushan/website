# MongoDB Database Setup Guide

This guide will help you set up and connect MongoDB to your Onsko Beauty backend.

## Prerequisites

- Node.js installed
- MongoDB installed locally OR MongoDB Atlas account

---

## Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (Free tier M0 is perfect for development)

### Step 2: Create Database User
1. In Atlas dashboard, go to **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Create username and password (save these!)
5. Set user privileges to **Read and write to any database**
6. Click **Add User**

### Step 3: Whitelist IP Address
1. Go to **Network Access**
2. Click **Add IP Address**
3. For development, click **Allow Access from Anywhere** (0.0.0.0/0)
   - ⚠️ For production, use specific IPs only
4. Click **Confirm**

### Step 4: Get Connection String
1. Go to **Database** → Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string
4. It will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Update .env File
1. Create `.env` file in `backend/` directory:
   ```bash
   cp .env.example .env
   ```

2. Update the connection string:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/onsko-beauty?retryWrites=true&w=majority
   ```
   
   **Important**: Replace:
   - `your-username` with your database username
   - `your-password` with your database password
   - `cluster0.xxxxx` with your cluster name
   - Add database name: `/onsko-beauty` before the `?`

---

## Option 2: Local MongoDB Installation

### Step 1: Install MongoDB

#### macOS (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Windows:
1. Download MongoDB from [mongodb.com/download](https://www.mongodb.com/try/download/community)
2. Run the installer
3. MongoDB will start automatically as a service

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Step 2: Verify MongoDB is Running
```bash
# Check if MongoDB is running
mongosh
# or
mongo
```

If you see the MongoDB shell, you're good to go!

### Step 3: Update .env File
```env
MONGODB_URI=mongodb://localhost:27017/onsko-beauty
```

---

## Step 6: Create .env File

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Copy the example file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` file with your MongoDB connection string:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   # For MongoDB Atlas (Cloud):
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/onsko-beauty?retryWrites=true&w=majority
   
   # For Local MongoDB:
   # MONGODB_URI=mongodb://localhost:27017/onsko-beauty

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   ```

---

## Step 7: Test Database Connection

1. Start the server:
   ```bash
   cd backend
   npm run dev
   ```

2. You should see:
   ```
   MongoDB Connected: cluster0.xxxxx.mongodb.net
   Server running in development mode on port 5000
   ```

3. If you see connection errors, check:
   - MongoDB is running (for local)
   - Connection string is correct
   - IP is whitelisted (for Atlas)
   - Username/password are correct

---

## Step 8: Seed Initial Data (Optional)

Populate your database with sample products:

```bash
cd backend
npm run seed
```

This will create:
- 4 sample products (Glow Serum, Hydra Cream, Rose Toner, Sun Shield)

---

## Troubleshooting

### Connection Timeout
- **Atlas**: Check IP whitelist, ensure 0.0.0.0/0 is added
- **Local**: Ensure MongoDB service is running

### Authentication Failed
- Double-check username and password in connection string
- Ensure special characters in password are URL-encoded
- Verify database user has correct permissions

### Connection String Format
- Make sure there are no spaces in the connection string
- Password should be URL-encoded if it contains special characters
- Database name should be included in the URI

### Port Already in Use
- Change PORT in `.env` file to a different port (e.g., 5001)
- Or stop the service using port 5000

---

## Database Structure

Once connected, MongoDB will automatically create:

### Collections:
- `users` - User accounts
- `products` - Product catalog
- `wishlists` - User wishlists
- `carts` - Shopping carts
- `newsletters` - Newsletter subscriptions

### Indexes:
- Users: email (unique)
- Products: name, category
- Wishlists: user (indexed)
- Carts: user (unique index)

---

## Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong JWT_SECRET** - Generate a random string
3. **Limit IP access** - For production, use specific IPs only
4. **Use environment variables** - Different values for dev/prod
5. **Regular backups** - MongoDB Atlas provides automatic backups

---

## Next Steps

After successful connection:
1. ✅ Database is connected
2. ✅ Run seed script to add sample data
3. ✅ Test API endpoints
4. ✅ Start building your application!

---

## Quick Reference

### Connection Strings:

**MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

**Local MongoDB:**
```
mongodb://localhost:27017/database-name
```

**Local MongoDB with Authentication:**
```
mongodb://username:password@localhost:27017/database-name
```

---

## Need Help?

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

