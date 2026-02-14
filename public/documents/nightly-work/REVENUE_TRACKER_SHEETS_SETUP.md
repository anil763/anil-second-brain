# Revenue Tracker Setup for Google Sheets

Quick setup guide to get your 30-day revenue tracker live in Google Sheets (5 min setup).

---

## 📋 SHEET STRUCTURE

Create a Google Sheet with these tabs:

### 1. **DAILY LOG** (Main tab)

```
Columns: A-E

A: Date (Feb 13, Feb 14, etc.)
B: UGC Revenue
C: Numerology Revenue
D: Vault Revenue
E: Daily Total (=B+C+D)
F: Cumulative (=SUM($E$2:E2)) [copy down]
G: Notes
```

**Formatting Tips:**
- Column B, C, D: Format as Currency ($)
- Column E, F: Bold, background light green
- Row 1: Freeze (View → Freeze → 1 row)

### 2. **WEEKLY SUMMARY**

```
Columns: A-F

A: Week # (1, 2, 3, 4)
B: Week Range (Feb 13-19, etc.)
C: Target ($)
D: UGC Actual
E: Numerology Actual
F: Vault Actual
G: Total Actual
H: Status (On Track / Catching Up / Ahead)
I: Next Week Adjustment
```

**Formatting:**
- Use conditional formatting: 
  - Green if Total ≥ Target
  - Orange if Total 75-99% of Target
  - Red if Total < 75% of Target

### 3. **DASHBOARD** (Your command center)

```
Top Section:
GOAL: $1,000
DEADLINE: March 8, 2026
DAYS REMAINING: [formula: =DAYS("2026-03-08",TODAY())]
CURRENT TOTAL: [formula: =SUM(DAILY LOG!F:F)]
PROGRESS: [formula: =CURRENT_TOTAL/1000*100] %
DAILY AVERAGE NEEDED: [formula: =1000/24]

Middle Section:
Income Stream | Target | Actual | % of Target | On Track?
UGC | $600 | $[sum] | % | Y/N
Numerology | $300 | $[sum] | % | Y/N
Vault | $100 | $[sum] | % | Y/N

Progress Chart (Simple):
Week 1: $[sum] vs $250 target
Week 2: $[sum] vs $500 cumulative target
Week 3: $[sum] vs $750 cumulative target
Week 4: $[sum] vs $1,000 cumulative target
```

**Make it visual:**
- Use a simple bar chart showing Week 1-4 actual vs target
- Add a progress gauge (0-100% toward $1K)
- Highlight any stream that's lagging

### 4. **BRAND TRACKING** (UGC accountability)

```
Columns: A-G

A: Date Sent
B: Brand Name
C: Brand Contact Email
D: Video Type (product review, tutorial, etc.)
E: Status (Sent / No Reply / Interested / Accepted / Paid)
F: Offer ($)
G: Notes
```

**Why:** You'll send ~20 emails/week. Track responses to see what works.

### 5. **NUMEROLOGY READERS** (Privacy-friendly)

```
Columns: A-F

A: Date Booked
B: Reader ID (just 001, 002, etc. - no names)
C: Package ($97 / $297 / $497)
D: Amount Paid
E: Platform Source (TikTok / IG / YouTube / Facebook)
F: Notes (optional)
```

**Why:** See which platform converts best. Total revenue. Understand your audience.

### 6. **VAULT MEMBERS**

```
Columns: A-F

A: Date Joined
B: Member ID (001, 002, etc.)
C: Tier ($97 / $297 / $497)
D: Type (One-time / Monthly)
E: Status (Onboarding / Active / Churned)
F: Last Activity Date
```

**Why:** Track member health. Spot churn early. Measure onboarding success.

---

## ✨ USEFUL FORMULAS

Copy these into your sheets:

### Daily Total
```
=B2+C2+D2
```

### Cumulative Sum
```
=SUM($E$2:E2)
```
Copy down the entire column.

### Percent of Target
```
=D2/C2
```
Format as percentage (0%).

### Days Remaining
```
=DAYS("2026-03-08",TODAY())
```

### Current Average (Today)
```
=F2/DAYS("2026-02-13",TODAY())
```

### Daily Average Needed
```
=1000/24
```
Result: $41.67/day

### Week Total
```
=SUM(DAILY LOG!F2:F8)  [for week 1]
=SUM(DAILY LOG!F9:F15) [for week 2]
```

---

## 🎯 DAILY WORKFLOW (2 min entry)

1. Open "DAILY LOG" tab
2. Go to today's row
3. Enter UGC revenue (if any)
4. Enter Numerology revenue (if any)
5. Enter Vault revenue (if any)
6. Add quick note (optional)
7. Hit save

That's it. The cumulative and dashboard auto-calculate.

---

## 📌 SHARE WITH SUPPORT

You can share this sheet with me (for accountability checks) or keep it private. Either way:
- Every morning, I'll ask: "What's today's revenue target?"
- Every week, I'll say: "You're $X ahead/behind. Here's the adjustment."

---

## 🚀 NEXT STEPS

1. Create new Google Sheet named "30-Day Revenue Tracker"
2. Create tabs: DAILY LOG, WEEKLY SUMMARY, DASHBOARD, BRAND TRACKING, NUMEROLOGY READERS, VAULT MEMBERS
3. Set up headers and 24 rows (Feb 13 - Mar 8)
4. Plug in the formulas above
5. Start entering today's data
6. Share the link with me so I can monitor alongside you

**Expected time:** 15 minutes

---

## 💡 PRO TIPS

**For maximum impact:**
- Check dashboard every morning (2-sec glance)
- Enter yesterday's data before breakfast
- If day is slow, look at Brand Tracking → See which platforms got responses
- If revenue dips, look at Numerology Readers → See which platform converts
- By week 2, you'll know your highest-value activities. Double down.

**Weekly reviews (Sunday night, 5 min):**
- Look at WEEKLY SUMMARY
- Identify the revenue winner (which stream is paying?)
- Set next week's #1 priority
- Celebrate wins

