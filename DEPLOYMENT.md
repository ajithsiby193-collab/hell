# Deployment Quick Start

## What's Ready

✅ **Backend API** - Ready for Vercel deployment
- `api/truths.js` - Endpoint: `/api/truths`
- `api/dares.js` - Endpoint: `/api/dares`
- MongoDB integration with fallback to local arrays

✅ **Database Seeding** - Ready to populate MongoDB
- `seed-db.js` - Script to add all truths/dares to your database

✅ **Performance Optimized** - Removed lag-causing animations
- Ultra-fast card reveal (0.1s instead of 0.6s)
- Simplified shadows and transitions
- Removed expensive transform animations on hover
- Will-change properties added for smooth animations

## Step-by-Step Deployment

### 1. Set Up MongoDB Atlas Database

```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create project → Create M0 cluster
3. Create database user (username: admin)
4. Whitelist your IP in Network Access
5. Get connection string from "Connect" button
```

### 2. Prepare Your Project

```bash
# Install dependencies locally
npm install

# Update .env.local with your MongoDB connection string
MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster-name.mongodb.net/truth_or_dare?retryWrites=true&w=majority

# Seed the database
node seed-db.js
```

You should see:
```
✅ Inserted 30 truths
✅ Inserted 30 dares
✨ Database seeded successfully!
```

### 3. Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Add backend with MongoDB"
git push

# Go to vercel.com
# 1. Click "New Project"
# 2. Import your GitHub repo
# 3. Add Environment Variables:
#    - MONGODB_URI = (your connection string)
# 4. Click Deploy
```

### 4. Done!

Your game will be live at: `https://your-project-name.vercel.app`

## Testing API Endpoints

Once deployed, test these:
- `https://your-app.vercel.app/api/truths` - Should return a random truth
- `https://your-app.vercel.app/api/dares` - Should return a random dare

## Performance Improvements Made

| Change | Before | After | Benefit |
|--------|--------|-------|---------|
| Card reveal animation | 0.6s | 0.1s | **6x faster** |
| Modal fade-in | 0.2s | 0.1s | **2x faster** |
| Box shadow | Double layered | Single layer | Lighter rendering |
| Button transitions | all properties | background only | Smoother experience |

## File Structure

```
├── api/
│   ├── truths.js          ← API server function
│   └── dares.js           ← API server function
├── index.html             ← Frontend
├── script.js              ← Frontend (now uses API)
├── style.css              ← Optimized styles
├── package.json           ← Dependencies
├── vercel.json            ← Vercel config
├── seed-db.js             ← Database seeding
├── .gitignore             ← Git configuration
├── .env.local             ← Your MongoDB URI (don't commit!)
└── SETUP.md               ← Detailed setup guide
```

## Troubleshooting

**"API returning undefined"**
- Verify MongoDB is seeded: `node seed-db.js`
- Check MONGODB_URI is correct in Vercel environment variables
- Check browser console for actual errors

**"Still using local fallback arrays"**
- This is intentional! If API fails, it gracefully falls back to local data
- Check Vercel logs to see if API is erroring
- Wait 30-60s for Vercel cold start on first request

**"MongoDB connection timeout"**
- Make sure your IP is whitelisted in MongoDB Atlas
- Or use "Allow Access from Anywhere" in Network Access settings

## Next Steps (Optional)

- Add user authentication
- Store game statistics in MongoDB
- Add more truths/dares via admin panel
- Create game room functionality
