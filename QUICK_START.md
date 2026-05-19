# 🚀 QUICK START - TravelEase

## ⚡ Cara Tercepat Menjalankan Aplikasi

### Metode 1: Menggunakan Batch File (RECOMMENDED untuk Windows)
```
Double-click file: START_SERVERS.bat
```
Done! Both servers akan start otomatis di terminal baru.

---

### Metode 2: Manual (Command Line)

#### Terminal 1 - Backend:
```bash
cd server
npm install
npm start
```

#### Terminal 2 - Frontend:
```bash
npm install
npm start
```

---

## 🔐 Admin Login

**Akses Admin Panel:**
```
URL: http://localhost:3000/admin/login
Username: admin
Password: admin123
```

---

## 📍 Endpoints Utama

| Page | URL |
|------|-----|
| Home | http://localhost:3000/ |
| Destinations | http://localhost:3000/destinasi |
| Packages | http://localhost:3000/paket |
| Admin Login | http://localhost:3000/admin/login |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| Manage Bookings | http://localhost:3000/admin/bookings |
| Manage Destinations | http://localhost:3000/admin/destinations |

---

## ✨ Features Overview

### 👥 User (Public)
- ✅ Browse 20 destinasi travel
- ✅ Lihat harga dan rating
- ✅ Pesan destinasi (dengan form tanggal & jumlah)
- ✅ Lihat paket spesial

### 🔧 Admin
- ✅ Dashboard dengan statistik real-time
- ✅ Manage bookings (ubah status, hapus)
- ✅ Manage destinasi (tambah, edit, hapus)
- ✅ Filter bookings by status
- ✅ Lihat analytics (revenue, bookings count, etc)

---

## 🔗 API Endpoints

### Auth
- `POST http://localhost:5000/api/auth/login`

### Bookings
- `GET http://localhost:5000/api/bookings` (admin)
- `POST http://localhost:5000/api/bookings` (public)
- `PATCH http://localhost:5000/api/bookings/:id` (admin)
- `DELETE http://localhost:5000/api/bookings/:id` (admin)

### Destinations
- `GET http://localhost:5000/api/destinations` (public)
- `POST http://localhost:5000/api/destinations` (admin)
- `PATCH http://localhost:5000/api/destinations/:id` (admin)
- `DELETE http://localhost:5000/api/destinations/:id` (admin)

### Analytics
- `GET http://localhost:5000/api/admin/analytics` (admin)

---

## 📁 Data Storage

Backend menggunakan JSON files untuk storage:
```
server/data/
├── bookings.json (pemesanan)
├── destinations.json (destinasi)
└── admins.json (admin credentials)
```

---

## 🎯 Test Scenarios

### Scenario 1: Pesan Destinasi
1. Kunjungi http://localhost:3000/destinasi
2. Klik "Pesan" pada salah satu destinasi
3. Isi form:
   - Nama: John Doe
   - Jumlah: 2 orang
   - Tanggal: 2026-06-15
4. Klik "Konfirmasi"
5. Success! Cek booking ID

### Scenario 2: Admin Manage Bookings
1. Login ke http://localhost:3000/admin/login
2. Masuk ke dashboard
3. Klik "Kelola Pemesanan"
4. Ubah status pemesanan
5. Filter berdasarkan status
6. Hapus pemesanan

### Scenario 3: Admin Manage Destinasi
1. Login ke http://localhost:3000/admin/login
2. Klik "Kelola Destinasi"
3. Tambah destinasi baru
4. Edit atau hapus destinasi

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Backend not starting | Pastikan port 5000 tidak digunakan. Ubah di `server/server.js` |
| Frontend not connecting | Pastikan backend sudah jalan sebelum frontend |
| Admin login gagal | Cek credentials: admin/admin123 |
| CORS Error | Pastikan backend sudah running |
| Module not found | Run `npm install` di folder yang error |

---

## 📊 Project Architecture

```
Frontend (React)
├── Pages: Home, Destinations, Packages, Admin
├── Components: Navbar, DestinationCard, BookingModal, AdminDashboard
└── API Calls: Fetch to http://localhost:5000/api

Backend (Node.js/Express)
├── Routes: /api/auth, /api/bookings, /api/destinations, /api/admin
├── Data: JSON files (bookings.json, destinations.json, admins.json)
└── Middleware: CORS, BodyParser, Auth
```

---

## 💡 Tips

1. **Development**: Buka 2 terminal, satu untuk backend, satu untuk frontend
2. **Debugging**: Buka DevTools (F12) untuk melihat network requests
3. **Testing API**: Gunakan Postman atau Thunder Client
4. **Database**: Data disimpan di JSON, akan hilang saat server restart
5. **Admin Token**: Token disimpan di localStorage browser

---

## 🚀 Deployment (Future)

Untuk deploy ke production:
1. Frontend: Deploy ke Vercel/Netlify
2. Backend: Deploy ke Heroku/Railway
3. Database: Upgrade dari JSON ke MongoDB/PostgreSQL
4. Authentication: Implement proper JWT

---

## 📞 Troubleshooting

### Tidak bisa buka page Admin?
- Cek apakah sudah login
- Clear browser cache (Ctrl+Shift+Delete)
- Restart browser

### Backend error "listen EADDRINUSE"?
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Bookings tidak tersimpan?
- Cek file `server/data/bookings.json`
- Pastikan folder `server/data` exists
- Cek permission folder

---

**Status:** ✅ Ready to Use

**Terakhir Update:** May 19, 2026

**Made with ❤️ by Kelompok 5**
