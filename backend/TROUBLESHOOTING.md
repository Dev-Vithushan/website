# MongoDB Connection Troubleshooting

## Current Configuration
- **Username**: `vithushan`
- **Password**: `vithu123`
- **Cluster**: `cluster0.3ompj2y.mongodb.net`
- **Database**: `onsko-beauty`

## Authentication Failed - Common Solutions

### 1. Check IP Whitelist (Most Common Issue)

**MongoDB Atlas requires your IP to be whitelisted:**

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click **"Network Access"** in the left sidebar
3. Click **"Add IP Address"**
4. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**
6. Wait 1-2 minutes for changes to take effect

⚠️ **Important**: Without IP whitelisting, connections will be rejected even with correct credentials.

### 2. Verify Database User

1. Go to **"Database Access"** in MongoDB Atlas
2. Check if user `vithushan` exists
3. Verify the password is correct: `vithu123`
4. Ensure user has **"Read and write to any database"** permissions

### 3. Check Connection String Format

Your connection string should be:
```
mongodb+srv://vithushan:vithu123@cluster0.3ompj2y.mongodb.net/onsko-beauty?retryWrites=true&w=majority
```

**Important points:**
- No spaces in the connection string
- Password should be URL-encoded if it contains special characters
- Database name (`onsko-beauty`) is included before the `?`

### 4. Test Connection with MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Use connection string:
   ```
   mongodb+srv://vithushan:vithu123@cluster0.3ompj2y.mongodb.net/onsko-beauty
   ```
3. If Compass connects, the issue is with the Node.js connection
4. If Compass fails, the issue is with credentials or IP whitelist

### 5. Verify Cluster Status

1. In MongoDB Atlas, check your cluster status
2. Ensure cluster is **running** (not paused)
3. Free tier clusters pause after inactivity - click "Resume" if needed

### 6. Check for Special Characters in Password

If your password contains special characters, they need to be URL-encoded:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- etc.

Your password `vithu123` doesn't have special characters, so this shouldn't be an issue.

### 7. Try Alternative Connection String Format

If the SRV connection fails, try the standard format (but SRV should work):

```
mongodb://vithushan:vithu123@cluster0.3ompj2y.mongodb.net:27017/onsko-beauty?ssl=true
```

## Quick Checklist

- [ ] IP address is whitelisted in Network Access
- [ ] Database user `vithushan` exists
- [ ] Password is correct: `vithu123`
- [ ] Cluster is running (not paused)
- [ ] Connection string format is correct
- [ ] No spaces in connection string
- [ ] Database name is included in URI

## Still Having Issues?

1. **Double-check credentials** in MongoDB Atlas Dashboard
2. **Create a new database user** with a simple password
3. **Test with MongoDB Compass** first
4. **Check MongoDB Atlas logs** for connection attempts

## Test Connection Again

After fixing the issues, test again:
```bash
cd backend
npm run test:db
```

