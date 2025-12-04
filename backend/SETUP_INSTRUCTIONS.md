# MongoDB Atlas Setup Instructions

## Your Credentials
- **Username**: `lvithu123_db_user`
- **Password**: `MPz4nGxfVij8hYD8`

## Step 1: Get Your Cluster Connection String

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Log in with your account
3. Click on your cluster
4. Click the **"Connect"** button
5. Select **"Connect your application"**
6. Copy the connection string

The connection string will look like:
```
mongodb+srv://lvithu123_db_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Step 2: Update .env File

1. Open `backend/.env` file
2. Find the line with `MONGODB_URI`
3. Replace `CLUSTER_NAME` with your actual cluster name from the connection string

**Example:**
If your connection string is:
```
mongodb+srv://lvithu123_db_user:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

Then your `.env` should have:
```env
MONGODB_URI=mongodb+srv://lvithu123_db_user:MPz4nGxfVij8hYD8@cluster0.abc123.mongodb.net/onsko-beauty?retryWrites=true&w=majority
```

**Important Notes:**
- Replace `<password>` with your actual password: `MPz4nGxfVij8hYD8`
- Add `/onsko-beauty` before the `?` to specify the database name
- Make sure there are no spaces in the connection string

## Step 3: Whitelist Your IP Address

1. In MongoDB Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

⚠️ **Security Note**: For production, use specific IP addresses only.

## Step 4: Test Connection

```bash
cd backend
npm run test:db
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Database: onsko-beauty
✅ Connection test successful!
```

## Step 5: Start Server

```bash
npm run dev
```

## Step 6: Seed Sample Data (Optional)

```bash
npm run seed
```

This will add 4 sample products to your database.

## Troubleshooting

### Connection Failed
- Check that your IP is whitelisted in Network Access
- Verify the cluster name in the connection string
- Ensure password is correct (no extra spaces)

### Authentication Failed
- Double-check username and password
- Make sure special characters in password are correct
- Verify database user has read/write permissions

### Need Help?
- Check `MONGODB_SETUP.md` for detailed instructions
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/

