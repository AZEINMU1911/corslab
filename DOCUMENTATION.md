# 📘 Roxy Web — Developer Runbook

**"I just got back from vacation. What do I do?"**
This manual assumes you have forgotten everything. Follow the recipes below to run, build, and fix the project.

---

## ⚡ 0. Quick Start (Start Here)

You need **two terminals** open to run this project.

**Terminal 1: The Backend (CMS)**
1. `cd roxy-strapi` (or whatever your backend folder is named)
2. `npm run develop`
   - **Admin Panel:** [http://127.0.0.1:1337/admin](http://127.0.0.1:1337/admin)
   - **API Endpoint:** [http://127.0.0.1:1337/api](http://127.0.0.1:1337/api)

**Terminal 2: The Frontend (Website)**
1. `cd roxy-web`
2. `npm run dev`
   - **Website:** [http://localhost:3000](http://localhost:3000)

> **⚠️ CRITICAL RULE:** The Frontend **cannot** work without the Backend running. If the website is blank, check Terminal 1.

---

## ✅ 0.1 Prereqs (Before you do anything)

**Required**
- Node.js LTS (use whatever the team standard is; if unsure, use the newest LTS).
- npm (or your repo’s preferred package manager).
- Git.

**Recommended**
- VS Code.
- Useful extensions: ESLint, Prettier, Tailwind CSS IntelliSense.

**Verify your setup**
- `node -v`
- `npm -v`

---

## 🗺️ 1. Project Map (Where is everything?)

| Folder / File | What it does |
| :--- | :--- |
| **`src/app/page.tsx`** | **The Brain.** Fetches ALL data from Strapi. If a section is missing/empty, check the `query` string here. |
| **`src/types/index.ts`** | **The Dictionary.** Defines what the Strapi JSON looks like. If TypeScript yells at you, check this file. |
| **`src/components/sections/`** | **The UI Blocks.** Individual sections (Hero, FAQ, Process). Edits to *design* happen here. |
| **`src/lib/media.ts`** | **The Image Handler.** Converts `/uploads/image.jpg` into `http://localhost:1337/uploads/image.jpg`. |
| **`public/assets/`** | **Local Fallbacks.** Static images used if Strapi fails or for testing. |

---

## 🔑 2. One-Time Setup (Do this once per machine)

### 2.1 Frontend environment variables
Create `.env.local` in `roxy-web`:
- `NEXT_PUBLIC_STRAPI_API_URL=http://127.0.0.1:1337`
- `NEXT_PUBLIC_STRAPI_API_TOKEN=[Your Long Token]`

> Never commit real tokens. If you need to share setup, share variable names only.

### 2.2 Getting the Strapi API token
1. Go to Strapi Admin: [http://127.0.0.1:1337/admin](http://127.0.0.1:1337/admin)
2. Find **API Tokens** (or Settings → API Tokens, depending on Strapi setup).
3. Create a token with the minimum required permissions for the frontend to read content.
4. Paste it into `.env.local` as `NEXT_PUBLIC_STRAPI_API_TOKEN`.

### 2.3 Strapi roles & permissions (common gotcha)
If the API returns 403/401:
- In Strapi Admin, ensure the relevant Content Types are readable by the role used by your token (or Public, if applicable).

---

## 🛠️ 3. Golden Commands (The ones you’ll actually use)

### Frontend (Next.js)
- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Run production build locally: `npm run start`

### Backend (Strapi)
- Install deps: `npm install`
- Dev server: `npm run develop`

### “It’s broken, I want a clean install”
1. Stop both servers.
2. Delete `node_modules`.
3. Reinstall: `npm install`.

> Prefer keeping the lockfile consistent with the repo’s standard (don’t casually switch package managers).

---

## 🧪 4. Smoke Tests (How to know it’s working)

### 4.1 Backend checks (Strapi)
- Admin loads: [http://127.0.0.1:1337/admin](http://127.0.0.1:1337/admin)
- API responds: [http://127.0.0.1:1337/api](http://127.0.0.1:1337/api)

If you know the content endpoint used by the homepage, open it in the browser and confirm:
- Status is 200
- JSON includes expected fields
- Media fields include URLs (or relative paths) and are not `null`

### 4.2 Frontend checks (Next.js)
- Homepage loads: [http://localhost:3000](http://localhost:3000)
- Hard refresh after content edits: `Cmd+Shift+R` / `Ctrl+Shift+R`

---

## 🛠️ 5. "How-To" Recipes

### 🟢 Recipe A: I want to edit text/images on the site
**Do NOT touch the code.**
1. Go to [http://127.0.0.1:1337/admin](http://127.0.0.1:1337/admin).
2. Click **Content Manager** -> **Homepage**.
3. Edit the fields.
4. Click **Save**.
5. Refresh [http://localhost:3000](http://localhost:3000).

### 🟡 Recipe B: I want to add a NEW Section
1. **Strapi:** Create Component -> Add to Homepage.
2. **Types:** Update `src/types/index.ts` (Watch out for Case-Sensitivity!).
3. **Component:** Create `src/components/sections/NewSection.tsx` (Copy `FAQSection.tsx` structure).
4. **Wiring:** Update query in `src/app/page.tsx` (`populate[NewSection][populate]=*`).

### 🟠 Recipe C: I changed Strapi content but the UI didn’t update
1. Confirm the backend is running.
2. Confirm you edited the correct entry (Homepage vs another type).
3. Hard refresh the browser.
4. If still stale, restart `npm run dev`.

---

## 🧠 6. Data Patterns (Read this before debugging “missing data”)

### 6.1 Deep Populate Trap (Strapi v5)
Strapi v5 does not auto-populate nested components. The API response can look “present” but key fields (especially media) will be `null`/missing unless you explicitly populate nested objects.

**Pattern**
- `populate[SectionName][populate]=*`

**Concept**
- You must “open the door” (the nested object) before you can see what’s inside.

### 6.2 Case sensitivity is not optional
Strapi keys are often capitalized (e.g. `Headline`, `Vision`). Your types and access patterns must match exactly.

---

## 🚨 7. Troubleshooting Cheat Sheet

| Symptom | Likely Cause | The Fix |
| :--- | :--- | :--- |
| **White Screen** | Backend is off. | Start Terminal 1 (`npm run develop`). |
| **401 / 403 from API** | Token/permissions misconfigured. | Check `.env.local` + Strapi roles/permissions for read access. |
| **Images Broken** | Localhost blocking. | Add `unoptimized={true}` to `<Image />`. |
| **"Cannot read property"** | Null data from Strapi. | Use optional chaining: `data?.Title`. |
| **Data Missing** | **Deep Populate Trap.** | Change `populate=*` to `populate[SectionName][populate]=*`. |
| **Type Error** | **Case Sensitivity.** | Strapi sends `Headline`, not `headline`. Check Types. |

---

## 🧯 8. Debug Playbook (What to check, in order)

1. **Is Strapi running?** If not, nothing else matters.
2. **Can you hit the Strapi endpoint in the browser?** Confirm status + JSON shape.
3. **Is the correct section populated?** Missing nested media usually means missing `populate[...]`.
4. **Check your env vars:** wrong API URL or token breaks everything quietly.
5. **Check logs:**
   - Frontend errors: Terminal running `npm run dev`
   - Backend errors: Terminal running `npm run develop`

---

## ♻️ 9. Recovery / Reset (When your local setup is cursed)

**Safe first moves**
- Restart both dev servers.
- Do a clean install (`node_modules` → reinstall).
- Re-check `.env.local` variables (names + values).

**If Strapi data is the problem**
- Confirm you’re editing the right content entry.
- If your team has a seed/backup process, restore from that source (ask in the escalation section below).

> Avoid deleting databases/content unless your team explicitly expects it.

---

## 🚀 10. Deployment Notes (So you don’t panic on release day)

**What changes between local and prod**
- `NEXT_PUBLIC_STRAPI_API_URL` must point at the hosted Strapi instance.
- Tokens in production should be least-privilege and stored in the hosting provider’s env settings.

**Common deployment failure modes**
- Wrong API URL (points to localhost).
- Missing token env var.
- Media URLs not accessible publicly (Strapi hosting / CORS / networking).

---

## 🆘 11. When you’re stuck (Escalation checklist)

When asking for help, include:
- What you were trying to do (1 sentence).
- The exact endpoint you hit (URL path only; don’t paste secrets).
- The error message + stack trace.
- A short snippet of the JSON shape you received (no tokens).
- What you already tried from Sections 7–9.

