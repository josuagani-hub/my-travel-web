# TravelEase API - Test Examples

## 🧪 Testing dengan cURL atau Postman

---

## Authentication

### Login Admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "message": "Login berhasil",
  "token": "admin_token_12345",
  "admin": {
    "id": "admin1",
    "username": "admin",
    "email": "admin@travelease.com"
  }
}
```

---

## Bookings Endpoints

### 1. Create Booking (Public)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "quantity": 2,
    "departureDate": "2026-06-15",
    "destination": "Pulau Bunaken",
    "price": "1.500.000"
  }'
```

### 2. Get All Bookings (Admin Only)
```bash
curl -X GET http://localhost:5000/api/bookings \
  -H "Authorization: Bearer admin_token_12345"
```

### 3. Get Booking by ID
```bash
curl -X GET http://localhost:5000/api/bookings/1234567890
```

### 4. Update Booking Status (Admin Only)
```bash
curl -X PATCH http://localhost:5000/api/bookings/1234567890 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_token_12345" \
  -d '{
    "status": "confirmed"
  }'
```

**Allowed statuses:**
- `pending`
- `confirmed`
- `cancelled`

### 5. Delete Booking (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/bookings/1234567890 \
  -H "Authorization: Bearer admin_token_12345"
```

---

## Destinations Endpoints

### 1. Get All Destinations (Public)
```bash
curl -X GET http://localhost:5000/api/destinations
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Pulau Bunaken",
    "location": "Manado",
    "price": "1.500.000",
    "rating": 4.9,
    "image": "https://..."
  },
  ...
]
```

### 2. Add Destination (Admin Only)
```bash
curl -X POST http://localhost:5000/api/destinations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_token_12345" \
  -d '{
    "name": "Destinasi Baru",
    "location": "Jakarta",
    "price": "800.000",
    "rating": 4.6,
    "image": "https://example.com/image.jpg"
  }'
```

### 3. Update Destination (Admin Only)
```bash
curl -X PATCH http://localhost:5000/api/destinations/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_token_12345" \
  -d '{
    "name": "Pulau Bunaken Updated",
    "price": "2.000.000",
    "rating": 5.0
  }'
```

### 4. Delete Destination (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/destinations/1 \
  -H "Authorization: Bearer admin_token_12345"
```

---

## Analytics Endpoints

### Get Dashboard Analytics (Admin Only)
```bash
curl -X GET http://localhost:5000/api/admin/analytics \
  -H "Authorization: Bearer admin_token_12345"
```

**Response:**
```json
{
  "totalBookings": 5,
  "totalRevenue": 7500000,
  "bookingsByStatus": {
    "pending": 2,
    "confirmed": 3,
    "cancelled": 0
  },
  "recentBookings": [
    {
      "id": "1621234567890",
      "name": "John Doe",
      "destination": "Pulau Bunaken",
      "departureDate": "2026-06-15",
      "quantity": 2,
      "price": "1.500.000",
      "status": "confirmed"
    },
    ...
  ]
}
```

---

## 📝 Postman Collection

### Import ke Postman
Buat folder "TravelEase" dan tambahkan requests berikut:

**Folder: Auth**
- POST /auth/login

**Folder: Bookings**
- POST /bookings (Create)
- GET /bookings (All - admin)
- GET /bookings/:id (Detail)
- PATCH /bookings/:id (Update status)
- DELETE /bookings/:id (Delete)

**Folder: Destinations**
- GET /destinations (All)
- POST /destinations (Create - admin)
- PATCH /destinations/:id (Update - admin)
- DELETE /destinations/:id (Delete - admin)

**Folder: Analytics**
- GET /admin/analytics (Admin)

---

## 🧪 Test Workflow

### 1. Admin Login
```
1. POST /auth/login
2. Copy token dari response
3. Gunakan di Authorization header untuk request admin
```

### 2. Create Booking
```
1. POST /bookings dengan data pemesanan
2. Catat booking ID
3. Verifikasi booking tersimpan
```

### 3. Verify Booking (Admin)
```
1. GET /bookings dengan auth header
2. Filter dan cari booking yang baru dibuat
3. Update status menjadi "confirmed"
```

### 4. View Analytics (Admin)
```
1. GET /admin/analytics
2. Lihat total revenue, booking count, status breakdown
3. Verifikasi booking yang baru dibuat included
```

---

## 📊 Sample Data

### Destinations (Default)
```json
[
  {"id": 1, "name": "Pulau Bunaken", "location": "Manado", "price": "1.500.000", "rating": 4.9},
  {"id": 2, "name": "Nusa Penida", "location": "Bali", "price": "2.200.000", "rating": 4.8},
  {"id": 3, "name": "Gunung Bromo", "location": "Jawa Timur", "price": "1.200.000", "rating": 4.7},
  {"id": 4, "name": "Raja Ampat", "location": "Papua Barat", "price": "5.500.000", "rating": 5.0},
  {"id": 5, "name": "Candi Borobudur", "location": "Magelang", "price": "750.000", "rating": 4.8},
  ...
]
```

---

## 🔒 Authentication

### Admin Token
```
Header: Authorization: Bearer admin_token_12345
```

⚠️ **Note:** Untuk production, gunakan JWT yang proper dengan secret key

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "message": "Data tidak lengkap"
}
```

### 401 Unauthorized
```json
{
  "message": "Token tidak ditemukan"
}
```

### 403 Forbidden
```json
{
  "message": "Token tidak valid"
}
```

### 404 Not Found
```json
{
  "message": "Pemesanan tidak ditemukan"
}
```

---

## 💡 Tips

1. **Postman Environment Variables:**
   ```
   base_url: http://localhost:5000/api
   token: admin_token_12345
   ```

2. **Test Pemesanan:**
   - Gunakan tanggal depan untuk departureDate
   - Format harga: "XXX.XXX" (dengan titik)

3. **Admin Operations:**
   - Selalu include Authorization header
   - Token: `admin_token_12345`

4. **Debugging:**
   - Buka Network tab di browser DevTools
   - Lihat request payload dan response
   - Check server logs di terminal backend

---

**API Base URL:** `http://localhost:5000/api`

**Status Codes:**
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
