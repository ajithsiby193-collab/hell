# Truth or Dare Game - Backend Setup Guide

## Quick Start

### Step 1: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Create a free account" and sign up
3. Create a new project (name it "truth-or-dare")
4. Create a new M0 (Free) cluster
5. Wait for the cluster to be created (~5-10 minutes)
6. In "Database Access", create a new user:
   - Username: `admin`
   - Password: Generate a strong password
   - Add user
7. In "Network Access", click "Add IP Address" and select "Allow Access from Anywhere" (or add your specific IP)
8. Click on "Databases" and then "Connect"
9. Choose "Drivers" and copy the connection string
10. Replace `<password>` with your actual password and save it

### Step 2: Set Up Your Local Environment

1. Open `.env.local` in the project root
2. Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster-name.mongodb.net/truth_or_dare?retryWrites=true&w=majority
   ```

### Step 3: Seed the Database

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the seed script:
   ```bash
   node seed-db.js
   ```
   You should see:
   ```
   ✅ Inserted 30 truths
   ✅ Inserted 30 dares
   ✨ Database seeded successfully!
   ```

### Step 4: Test Locally (Optional)

```bash
npm run dev
```

Then visit `http://localhost:3000` and test clicking the cards.

### Step 5: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add backend"
   git push origin main
   ```

2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. In "Environment Variables", add:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string
6. Click "Deploy"

### Step 6: Update Frontend

After deployment, Vercel will give you a domain (e.g., `https://your-project.vercel.app`). The frontend will automatically use relative paths (`/api/truths`, `/api/dares`), so it will work with your deployed backend.

## API Endpoints

- `GET /api/truths` - Returns a random truth
- `GET /api/dares` - Returns a random dare

Response format:
```json
{
  "content": "Truth or dare question",
  "type": "truth|dare"
}
```

## File Structure

```
.
├── api/
│   ├── truths.js       # API endpoint for truths
│   └── dares.js        # API endpoint for dares
├── index.html          # Frontend
├── script.js           # Frontend logic (updated to use API)
├── style.css           # Frontend styles
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
├── seed-db.js          # Database seeding script
└── .env.local          # Environment variables (local only)
```

## Troubleshooting

**API returning errors locally?**
- Make sure MongoDB is connected by checking MongoDB Atlas dashboard
- Check that your IP is whitelisted in Network Access
- Verify MONGODB_URI in .env.local

**Still using local fallback?**
- Check browser console for errors
- The API might be slow on first call (cold start)
- Make sure the API response has a `content` field

**Deployed but getting 500 errors?**
- Add MONGODB_URI to Vercel Environment Variables
- Rebuild the project in Vercel dashboard
- Check Vercel function logs

## Future Enhancements

- Add more truths/dares via admin panel
- Implement user authentication
- Add game room functionality
- Track statistics
