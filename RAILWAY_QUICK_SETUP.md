# 🚀 Railway Deployment - Quick Checklist

## ✅ Persiapan (LOCAL)

- [ ] `git init` di folder root
- [ ] `git add .` dan `git commit -m "Initial commit"`
- [ ] Push ke GitHub: `git push origin main`

## ✅ Step 1: Backend Setup di Railway

```
1. Buka railway.app → Login/Signup dengan GitHub
2. "Create New Project" → "Deploy from GitHub"
3. Pilih repository: my-travel-web
4. Root Directory: server
5. Start Command: node server.js
6. Tunggu deploy ✅
7. COPY DOMAIN URL dari Networking tab
   Contoh: https://my-travel-api-prod.railway.app
```

## ✅ Step 2: Update Frontend .env.production

Edit file `.env.production` di root:
```
REACT_APP_API_URL=https://PASTE_YOUR_RAILWAY_URL_HERE
CI=false
```

Contoh:
```
REACT_APP_API_URL=https://my-travel-api-prod.railway.app
CI=false
```

## ✅ Step 3: Push Changes

```bash
git add .env.production
git commit -m "Add production API URL"
git push origin main
```

## ✅ Step 4: Frontend Deploy ke Railway

```
1. Di Railway Dashboard → "Add Service"
2. GitHub Repo → select repo lagi
3. Environment Variables:
   - REACT_APP_API_URL = [URL dari Step 1]
   - CI = false
4. Build & Deploy otomatis
5. Tunggu ✅ di dashboard
6. Klik service → copy public domain
```

## 🎯 Final URLs

- **Frontend**: https://frontend-xxxxx.railway.app
- **Backend**: https://backend-xxxxx.railway.app
- **Admin Login**: https://frontend-xxxxx.railway.app/admin/login

---

## 🔧 Testing

1. Buka frontend URL
2. Test fitur:
   - ✅ Lihat destinations (load dari API)
   - ✅ Booking
   - ✅ Admin login (admin/admin123)
   - ✅ Dashboard analytics

## 💡 Jika Ada Error

**"Cannot reach API"**
- Pastikan REACT_APP_API_URL benar di .env.production
- Cek Railway logs backend
- Backend harus deploy duluan

**"Build failed"**
- Set CI=false di environment
- Check build logs di Railway dashboard

---

## 📊 Biaya

- **Free tier**: $5/bulan (biasanya cukup)
- **Melampaui**: pay-as-you-go (~$0.1/GB/hour)

---

**Dokumen lengkap**: Lihat [DEPLOYMENT_RAILWAY.md](DEPLOYMENT_RAILWAY.md)
