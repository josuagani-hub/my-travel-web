# TravelEase - Setup Guide

## 🚀 Deskripsi Proyek
TravelEase adalah aplikasi web travel booking yang modern dengan fitur:
- **Frontend**: React dengan Tailwind CSS
- **Backend**: Node.js Express
- **Admin Dashboard**: Kelola destinasi, pemesanan, dan analytics
- **Frontend Functionality**: Booking terintegrasi dengan backend

---

## 📋 Requirements
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Browser modern

---

## 🔧 Installation

### 1. Install Dependencies Frontend
```bash
cd c:\xampp2\htdocs\REACT\my-travel-web
npm install
```

### 2. Install Dependencies Backend
```bash
cd server
npm install
```

---

## ▶️ Cara Menjalankan

### Terminal 1: Start Backend Server
```bash
cd c:\xampp2\htdocs\REACT\my-travel-web\server
npm start
```
Backend akan berjalan di `http://localhost:5000`

### Terminal 2: Start Frontend React
```bash
cd c:\xampp2\htdocs\REACT\my-travel-web
npm start
```
Frontend akan berjalan di `http://localhost:3000`

---

## 🔐 Admin Login Credentials

### Default Admin
- **Username**: `admin`
- **Password**: `admin123`
- **URL**: `http://localhost:3000/admin/login`

---

## 📊 Features

### Public Features (Semua Pengguna)
✅ Lihat 20 destinasi travel
✅ Lihat detail harga dan rating
✅ Pesan destinasi dengan form pemesanan
✅ Lihat paket spesial dengan diskon

### Admin Features (Setelah Login)
✅ Dashboard dengan analytics
✅ Lihat total pemesanan dan pendapatan
✅ Kelola pemesanan (ubah status: pending/confirmed/cancelled)
✅ Tambah/edit/hapus destinasi
✅ Filter pemesanan berdasarkan status
✅ Lihat pemesanan terbaru

---

## 🗂️ Project Structure

```
my-travel-web/
├── public/
│   └── index.html
├── src/
│   ├── App.js (Main App dengan routes)
│   ├── AdminDashboard.js (Admin components)
│   ├── App.css
│   ├── index.js
│   ├── tailwind.config.js
│   └── index.css
├── server/
│   ├── server.js (Express server)
│   ├── data/ (Data storage JSON files)
│   │   ├── bookings.json
│   │   ├── destinations.json
│   │   └── admins.json
│   └── package.json
├── package.json
└── README_SETUP.md
```

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Login admin

### Bookings
- `GET /api/bookings` - Lihat semua pemesanan (admin only)
- `POST /api/bookings` - Buat pemesanan baru
- `GET /api/bookings/:id` - Lihat detail pemesanan
- `PATCH /api/bookings/:id` - Update status pemesanan (admin only)
- `DELETE /api/bookings/:id` - Hapus pemesanan (admin only)

### Destinations
- `GET /api/destinations` - Lihat semua destinasi
- `POST /api/destinations` - Tambah destinasi (admin only)
- `PATCH /api/destinations/:id` - Update destinasi (admin only)
- `DELETE /api/destinations/:id` - Hapus destinasi (admin only)

### Analytics
- `GET /api/admin/analytics` - Lihat analytics dashboard (admin only)

---

## 🎨 UI Components

### Frontend Pages
1. **Home** (`/`) - Hero section dengan statistik
2. **Destinations** (`/destinasi`) - List 20 destinasi dengan card
3. **Packages** (`/paket`) - Paket spesial dengan diskon

### Admin Pages
1. **Login** (`/admin/login`) - Form login admin
2. **Dashboard** (`/admin/dashboard`) - Overview analytics
3. **Bookings Management** (`/admin/bookings`) - Manage semua pemesanan
4. **Destinations Management** (`/admin/destinations`) - Manage destinasi

---

## 🔗 Integrasi Frontend-Backend

### Booking Flow
1. User klik "Pesan" pada destinasi
2. Modal form muncul
3. User isi nama, jumlah orang, tanggal
4. Submit form → POST ke `/api/bookings`
5. Backend menyimpan ke `bookings.json`
6. Success message dengan booking ID

### Admin Dashboard Flow
1. Admin login dengan credentials
2. Redirect ke dashboard dengan analytics
3. Lihat total bookings, revenue, status breakdown
4. Kelola bookings dan destinasi
5. Data real-time dari JSON files

---

## 🐛 Troubleshooting

### Backend tidak jalan?
```
Error: Cannot find module 'express'
Solusi: cd server && npm install
```

### Port 5000 sudah digunakan?
```
Ubah PORT di server.js:
const PORT = process.env.PORT || 5001;
```

### CORS Error?
```
Pastikan backend sudah berjalan terlebih dahulu
Cek di: http://localhost:5000
```

### Frontend tidak bisa connect ke backend?
```
Pastikan API_URL di App.js benar:
const API_URL = 'http://localhost:5000/api';
```

---

## 📦 Dependencies

### Frontend
- react: ^19.2.6
- react-router-dom: ^7.15.1
- lucide-react: ^1.16.0
- tailwindcss: ^4.3.0

### Backend
- express: ^4.18.2
- cors: ^2.8.5
- body-parser: ^1.20.2
- jsonwebtoken: ^9.1.2 (untuk auth)
- uuid: ^9.0.0

---

## 🎓 Next Steps (Optional Improvements)

1. **Database Real**: Gunakan MongoDB/PostgreSQL
2. **Authentication**: Implement JWT properly
3. **Payment Gateway**: Integrasikan Midtrans/Stripe
4. **Email**: Send booking confirmation via email
5. **Image Upload**: Upload gambar destinasi
6. **Deployment**: Deploy ke Heroku/Vercel

---

## 👥 Team
**Kelompok 5** - TravelEase Development Team

---

## 📄 License
MIT License

---

## 📞 Support
Untuk pertanyaan atau issues, silakan hubungi admin@travelease.com

