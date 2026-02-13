# 🚀 Firebase Cloud Sync Setup

**Status:** Firebase code is ready. Just need your Firebase credentials.

**Time to complete:** 5 minutes

---

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project**
3. Name it: `second-brain`
4. Click **Continue**
5. Disable Google Analytics (optional) → **Create Project**
6. Wait for it to provision (30-60 seconds)

---

## Step 2: Enable Realtime Database

1. In Firebase Console, click **Build** (left sidebar)
2. Click **Realtime Database**
3. Click **Create Database**
4. Choose location: **United States (us-central1)**
5. Start in **Test mode** (for now)
6. Click **Enable**

---

## Step 3: Copy Your Firebase Config

1. Click the ⚙️ **gear icon** (top-left) → **Project Settings**
2. Scroll down to **Your apps**
3. Click the web icon **`</>`** 
4. Look for the config object that looks like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "second-brain-xxxxx.firebaseapp.com",
  databaseURL: "https://second-brain-xxxxx-default-rtdb.firebaseio.com",
  projectId: "second-brain-xxxxx",
  storageBucket: "second-brain-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

---

## Step 4: Update Your .env.local File

Replace the `xxx` values in `.env.local` with your actual Firebase config values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

**Save the file. Don't commit it to GitHub (it's in .gitignore).**

---

## Step 5: Add to Vercel (Production)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your **second-brain** project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Name: `NEXT_PUBLIC_FIREBASE_API_KEY`
   - Value: `AIza...`
   - (Repeat for all 7 variables)
5. Click **Save**
6. Go to **Deployments** → Click the latest deployment → **Redeploy**

---

## Step 6: Secure Firebase Database Rules

1. Back in Firebase Console → **Realtime Database**
2. Click the **Rules** tab
3. Replace the code with:
```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "documents": {
      "$syncCode": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```
4. Click **Publish**

---

## How Cloud Sync Works

Once configured:

1. **First visit**: App loads documents from local files
2. **Enable sync**: Click the cloud icon → Enter a sync code (e.g., "anil")
3. **Another device**: Visit the app → Enter the SAME sync code
4. **Real-time sync**: Documents sync instantly across all devices

### Sync Code Examples
- "anil" - Personal code
- "work" - Work documents
- "projects" - Project-specific docs

Each code = separate document collection (isolated).

---

## Verify It's Working

After `.env.local` is updated:

1. **Stop dev server** (Ctrl+C)
2. **Restart**: `npm run dev`
3. Go to http://localhost:3000
4. Check browser console (F12) for "Firebase initialized successfully"
5. If you see the cloud icon in the UI, you're connected

---

## Troubleshooting

**"Firebase not configured" message:**
- Make sure `.env.local` has all 7 variables filled in
- Restart dev server after editing `.env.local`
- Check that values don't have extra spaces or quotes

**Env vars not working in Vercel:**
- Make sure you added variables to Vercel project settings
- Redeploy after adding them
- Wait 2-3 minutes for Vercel to rebuild

**Still blank in production:**
- Check Vercel deployment logs (Vercel Dashboard → Deployments → [latest] → Logs)
- Make sure database URL includes `-default-rtdb` in the URL

**Database rules error:**
- Go back to Firebase → Realtime Database → Rules
- Make sure your JSON is valid (check for syntax errors)
- Click **Publish** (not just close)

---

## What's Next?

Once Firebase is connected:
- Documents automatically sync in real-time
- Multiple devices = same documents
- Changes instantly visible across all clients
- Backup system for your Second Brain

---

**Ready?** 
1. Create Firebase project (5 min)
2. Copy config values
3. Update `.env.local`
4. Update Vercel environment variables
5. Test it works

Let me know once you've done this and I'll verify the sync is working.
