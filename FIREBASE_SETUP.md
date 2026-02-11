# Firebase Cloud Sync Setup (5 minutes)

## Quick Setup

### 1. Create Firebase Project (2 min)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project** → Name it `second-brain` → Continue
3. Disable Google Analytics (optional) → Create Project

### 2. Enable Realtime Database (1 min)
1. In Firebase Console, click **Build** → **Realtime Database**
2. Click **Create Database**
3. Choose location: **United States (us-central1)**
4. Start in **test mode** (we'll secure it later)
5. Click **Enable**

### 3. Get Firebase Config (1 min)
1. Click the ⚙️ gear icon → **Project settings**
2. Scroll down to **Your apps** → Click web icon `</>`
3. Register app name: `second-brain-web`
4. Copy the `firebaseConfig` object values

### 4. Add Environment Variables (1 min)

**For local development:**
Create `.env.local` in project root:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=second-brain-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://second-brain-xxxxx-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=second-brain-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=second-brain-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

**For Vercel (production):**
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add each `NEXT_PUBLIC_FIREBASE_*` variable with its value
3. Redeploy

### 5. Secure Database Rules (Important!)

In Firebase Console → Realtime Database → **Rules**, replace with:
```json
{
  "rules": {
    "users": {
      "$userId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

Click **Publish**.

---

## How It Works

1. **First visit:** App shows "Local only" - data saved to browser
2. **Enable sync:** Click the cloud icon → Enter a sync code (e.g., "anil")
3. **On another device:** Visit the site → Enter the SAME sync code
4. **Real-time sync:** Tasks sync instantly across all devices with that code

### Sync Code Tips
- Use something memorable: your name, "work", "home"
- Same code = same data across devices
- Different codes = separate task lists

---

## Troubleshooting

**"Firebase not configured" warning:**
- Check that `.env.local` exists with all variables
- Restart the dev server after adding env vars
- For Vercel: Ensure env vars are added and app is redeployed

**Tasks not syncing:**
- Both devices must use the same sync code
- Check browser console for errors
- Verify Firebase Database URL is correct (includes `-default-rtdb`)

**Database rules error:**
- Make sure you updated the rules in Firebase Console
- Rules should allow read/write under `users/$userId`

---

## Free Tier Limits (Generous!)

Firebase Realtime Database free tier:
- 1 GB storage
- 10 GB/month download
- 100 simultaneous connections

For a personal Kanban, you'll never hit these limits.
