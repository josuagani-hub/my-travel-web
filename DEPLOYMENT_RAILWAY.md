# 🚀 Deployment ke Railway.app

## Prasyarat
- GitHub account (gratis)
- Railway account (gratis di railway.app)
- Git installed

---

## Step 1: Setup Git Repository

```bash
cd C:\xampp2\htdocs\REACT\my-travel-web

# Jika belum ada repo
git init
git add .
git commit -m "Initial commit: Travel booking app"
```

## Step 2: Push ke GitHub

1. Buka [github.com](https://github.com) → Create new repository
2. Beri nama: `my-travel-web`
3. Jangan initialize dengan README
4. Copy commands dan jalankan:

```bash
git remote add origin https://github.com/YOUR_USERNAME/my-travel-web.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend ke Railway

### 3a. Buka Railway.app

- Pergi ke [railway.app](https://railway.app)
- Klik **"Create New Project"**
- Pilih **"Deploy from GitHub repo"**
- Authorize Railway untuk GitHub
- Pilih repository: `my-travel-web`

### 3b. Setup Backend Service

1. Setelah repo terpilih, klik **"Add Service"**
2. Klik **"GitHub Repo"** → pilih repo lagi
3. **Environment**:
   - `ROOT_DIR` = `server`
   - Start Command: `node server.js`

4. Di tab **Deployments**, Railway otomatis akan detect `package.json`

### 3c. Dapatkan Backend URL

- Buka tab **Networking**
- Copy public domain URL (misal: `https://my-travel-api-prod.railway.app`)
- **Simpan URL ini**, akan digunakan di frontend

---

## Step 4: Deploy Frontend ke Railway

### 4a. Tambah Service Baru

1. Di Railway dashboard, klik **"Add Service"** → **GitHub Repo**
2. Pilih repo yang sama
3. **Environment**:
   - `REACT_APP_API_URL` = `https://my-travel-api-prod.railway.app` (URL backend dari step 3c)
   - `CI` = `false` (agar build sukses)

### 4b. Build Settings

Railway akan auto-detect, tapi pastikan:
- **Build Command**: `npm run build` atau biarkan auto
- **Start Command**: `npm start` atau `serve -s build`

---

## Step 5: Update Frontend API Calls

Edit file [src/App.js](src/App.js) untuk menggunakan environment variable:

```javascript
// Ganti hardcoded URL dengan:
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Di semua fetch/axios calls:
fetch(`${API_BASE_URL}/bookings`, {...})
// atau
axios.get(`${API_BASE_URL}/bookings`)
```

---

## Step 6: Deploy

1. **Push changes ke GitHub**:
```bash
git add .
git commit -m "Add environment variable for API URL"
git push origin main
```

2. **Railway akan auto-redeploy** ketika detect push

3. Tunggu hingga kedua service menunjukkan status ✅ (Deployed)

---

## Step 7: Test

1. Buka URL frontend yang diberikan Railway
2. Test fitur booking
3. Test login admin
4. Check Network tab di browser DevTools

---

## Troubleshooting

### Frontend blank/error?
- Cek `REACT_APP_API_URL` di Railway environment
- Buka DevTools Console, cek error
- Pastikan backend API URL benar

### API request failed?
- Pastikan backend URL di `REACT_APP_API_URL` benar
- Buka backend logs di Railway
- Check CORS settings di `server.js`

### Build failed?
- Set `CI=false` environment variable di Railway
- Pastikan `package.json` scripts ada
- Cek build logs di Railway dashboard

---

## Environment Variables Summary

**Backend**:
```
PORT = (auto dari Railway)
NODE_ENV = production
```

**Frontend**:
```
REACT_APP_API_URL = https://your-railway-backend-url.railway.app
CI = false
```

---

## Domain Custom (Optional)

1. Di Railway → Networking
2. Klik **"Generate Domain"** atau tambahkan custom domain
3. Set DNS ke Railway nameservers

---

## Free Tier Limits

- 5GB RAM total
- 100GB storage
- $5/month free credits (biasanya cukup untuk demo)
- Setelah itu: pay-as-you-go (~$0.1/GB/hour)

---

## Dashboard Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Services Status**: Lihat di dashboard
- **Logs**: Klik service → Deployments → view logs

---

**Selesai! 🎉 Aplikasi Anda sekarang live di internet!**
