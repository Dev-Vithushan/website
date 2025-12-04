# Quick Start Guide - Database Connection

## 🚀 Quick Setup (5 minutes)

### Step 1: Choose Your MongoDB Option

**Option A: MongoDB Atlas (Cloud - Recommended)**
- Free tier available
- No local installation needed
- Accessible from anywhere

**Option B: Local MongoDB**
- Requires installation
- Runs on your machine
- Good for offline development

---

### Step 2: Get Your Connection String

#### For MongoDB Atlas:
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user (Database Access → Add User)
4. Whitelist IP (Network Access → Add IP → Allow from anywhere)
5. Get connection string (Connect → Connect your application)
6. Format: `mongodb+srv://username:password@cluster.mongodb.net/onsko-beauty?retryWrites=true&w=majority`

#### For Local MongoDB:
1. Install MongoDB ([Download here](https://www.mongodb.com/try/download/community))
2. Start MongoDB service
3. Connection string: `mongodb://localhost:27017/onsko-beauty`

---

### Step 3: Create .env File

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your connection string:

```env
MONGODB_URI=your-connection-string-here
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

---

### Step 4: Test Connection

```bash
npm run test:db
```

You should see:
```
✅ MongoDB Connected: ...
📊 Database: onsko-beauty
✅ Connection test successful!
```

---

### Step 5: Start Server

```bash
npm run dev
```

---

### Step 6: Seed Sample Data (Optional)

```bash
npm run seed
```

This adds 4 sample products to your database.

---

## ✅ You're Done!

Your database is now connected and ready to use!

For detailed instructions, see [MONGODB_SETUP.md](./MONGODB_SETUP.md)

