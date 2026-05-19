const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data directories
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data files if they don't exist
const bookingsFile = path.join(dataDir, 'bookings.json');
const adminsFile = path.join(dataDir, 'admins.json');
const destinationsFile = path.join(dataDir, 'destinations.json');

if (!fs.existsSync(bookingsFile)) {
  fs.writeFileSync(bookingsFile, JSON.stringify([], null, 2));
}

if (!fs.existsSync(adminsFile)) {
  fs.writeFileSync(adminsFile, JSON.stringify([
    {
      id: "admin1",
      username: "admin",
      password: "admin123",
      email: "admin@travelease.com"
    }
  ], null, 2));
}

// Initialize destinations data
if (!fs.existsSync(destinationsFile)) {
  const destinations = [
    { id: 1, name: "Pulau Bunaken", location: "Manado", price: "1.500.000", rating: 4.9, image: "/fotobunaken.jpg" },
    { id: 2, name: "Nusa Penida", location: "Bali", price: "2.200.000", rating: 4.8, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800" },
    { id: 3, name: "Gunung Bromo", location: "Jawa Timur", price: "1.200.000", rating: 4.7, image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800" },
    { id: 4, name: "Raja Ampat", location: "Papua Barat", price: "5.500.000", rating: 5.0, image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800" },
    { id: 5, name: "Candi Borobudur", location: "Magelang", price: "750.000", rating: 4.8, image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=800" },
    { id: 6, name: "Labuan Bajo", location: "NTT", price: "4.200.000", rating: 4.9, image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800" },
    { id: 7, name: "Tanah Lot", location: "Bali", price: "900.000", rating: 4.7, image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800" },
    { id: 8, name: "Danau Toba", location: "Sumatera Utara", price: "1.800.000", rating: 4.6, image: "/danautoba.jpg" },
    { id: 9, name: "Wakatobi", location: "Sulawesi Tenggara", price: "3.500.000", rating: 4.8, image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800" },
    { id: 10, name: "Kawah Ijen", location: "Banyuwangi", price: "1.100.000", rating: 4.7, image: "https://images.unsplash.com/photo-1627664819818-e147d6221422?w=800" },
    { id: 11, name: "Pantai Ora", location: "Maluku", price: "2.800.000", rating: 4.9, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
    { id: 12, name: "Derawan", location: "Kalimantan Timur", price: "3.200.000", rating: 4.8, image: "/fotoderawan.jpg" },
    { id: 13, name: "Tanjung Puting", location: "Kalimantan Tengah", price: "2.500.000", rating: 4.7, image: "/tanjungputing.jpg" },
    { id: 14, name: "Toraja", location: "Sulawesi Selatan", price: "1.900.000", rating: 4.8, image: "/toraja.jpg" },
    { id: 15, name: "Gili Trawangan", location: "Lombok", price: "1.400.000", rating: 4.7, image: "/gilitrawangan.jpg" },
    { id: 16, name: "Belitung", location: "Bangka Belitung", price: "1.600.000", rating: 4.8, image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800" },
    { id: 17, name: "Gunung Rinjani", location: "Lombok", price: "2.300.000", rating: 4.9, image: "/gunungrinjani.jpg" },
    { id: 18, name: "Kepulauan Seribu", location: "Jakarta", price: "850.000", rating: 4.5, image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800" },
    { id: 19, name: "Bukit Tinggi", location: "Sumatera Barat", price: "1.200.000", rating: 4.7, image: "/bukittinggi.jpg" },
    { id: 20, name: "Pulau Weh", location: "Aceh", price: "2.100.000", rating: 4.8, image: "/pulauweh.jpg" }
  ];
  fs.writeFileSync(destinationsFile, JSON.stringify(destinations, null, 2));
}

// Helper functions
const readData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    return [];
  }
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Auth Middleware
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }
  
  // Simple token verification (in production, use JWT properly)
  if (token !== 'admin_token_12345') {
    return res.status(403).json({ message: 'Token tidak valid' });
  }
  
  next();
};

// ============ AUTH ROUTES ============
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const admins = readData(adminsFile);
  
  const admin = admins.find(a => a.username === username && a.password === password);
  
  if (!admin) {
    return res.status(401).json({ message: 'Username atau password salah' });
  }
  
  res.json({
    message: 'Login berhasil',
    token: 'admin_token_12345',
    admin: { id: admin.id, username: admin.username, email: admin.email }
  });
});

// ============ BOOKINGS ROUTES ============
app.get('/api/bookings', verifyAdmin, (req, res) => {
  const bookings = readData(bookingsFile);
  res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
  const { name, quantity, departureDate, destination, price } = req.body;
  
  if (!name || !quantity || !departureDate || !destination) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }
  
  const bookings = readData(bookingsFile);
  const newBooking = {
    id: Date.now().toString(),
    name,
    quantity: parseInt(quantity),
    departureDate,
    destination,
    price,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  writeData(bookingsFile, bookings);
  
  res.status(201).json({
    message: 'Pemesanan berhasil dibuat',
    booking: newBooking
  });
});

app.get('/api/bookings/:id', (req, res) => {
  const bookings = readData(bookingsFile);
  const booking = bookings.find(b => b.id === req.params.id);
  
  if (!booking) {
    return res.status(404).json({ message: 'Pemesanan tidak ditemukan' });
  }
  
  res.json(booking);
});

app.patch('/api/bookings/:id', verifyAdmin, (req, res) => {
  const { status } = req.body;
  const bookings = readData(bookingsFile);
  const booking = bookings.find(b => b.id === req.params.id);
  
  if (!booking) {
    return res.status(404).json({ message: 'Pemesanan tidak ditemukan' });
  }
  
  booking.status = status;
  writeData(bookingsFile, bookings);
  
  res.json({ message: 'Status pemesanan diperbarui', booking });
});

app.delete('/api/bookings/:id', verifyAdmin, (req, res) => {
  let bookings = readData(bookingsFile);
  const initialLength = bookings.length;
  bookings = bookings.filter(b => b.id !== req.params.id);
  
  if (bookings.length === initialLength) {
    return res.status(404).json({ message: 'Pemesanan tidak ditemukan' });
  }
  
  writeData(bookingsFile, bookings);
  res.json({ message: 'Pemesanan dihapus' });
});

// ============ DESTINATIONS ROUTES ============
app.get('/api/destinations', (req, res) => {
  const destinations = readData(destinationsFile);
  res.json(destinations);
});

app.post('/api/destinations', verifyAdmin, (req, res) => {
  const { name, location, price, rating, image } = req.body;
  
  if (!name || !location || !price) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }
  
  const destinations = readData(destinationsFile);
  const newDestination = {
    id: Math.max(...destinations.map(d => d.id), 0) + 1,
    name,
    location,
    price,
    rating: rating || 4.5,
    image: image || ''
  };
  
  destinations.push(newDestination);
  writeData(destinationsFile, destinations);
  
  res.status(201).json({
    message: 'Destinasi berhasil ditambahkan',
    destination: newDestination
  });
});

app.patch('/api/destinations/:id', verifyAdmin, (req, res) => {
  const { name, location, price, rating, image } = req.body;
  const destinations = readData(destinationsFile);
  const destination = destinations.find(d => d.id === parseInt(req.params.id));
  
  if (!destination) {
    return res.status(404).json({ message: 'Destinasi tidak ditemukan' });
  }
  
  if (name) destination.name = name;
  if (location) destination.location = location;
  if (price) destination.price = price;
  if (rating) destination.rating = rating;
  if (image) destination.image = image;
  
  writeData(destinationsFile, destinations);
  res.json({ message: 'Destinasi diperbarui', destination });
});

app.delete('/api/destinations/:id', verifyAdmin, (req, res) => {
  let destinations = readData(destinationsFile);
  const initialLength = destinations.length;
  destinations = destinations.filter(d => d.id !== parseInt(req.params.id));
  
  if (destinations.length === initialLength) {
    return res.status(404).json({ message: 'Destinasi tidak ditemukan' });
  }
  
  writeData(destinationsFile, destinations);
  res.json({ message: 'Destinasi dihapus' });
});

// ============ ANALYTICS ROUTES ============
app.get('/api/admin/analytics', verifyAdmin, (req, res) => {
  const bookings = readData(bookingsFile);
  
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => {
    const price = parseInt(b.price.replace(/\D/g, ''));
    return sum + (price * b.quantity);
  }, 0);
  
  const bookingsByStatus = {
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };
  
  res.json({
    totalBookings,
    totalRevenue,
    bookingsByStatus,
    recentBookings: bookings.slice(-5).reverse()
  });
});

// ============ ROOT ROUTE ============
app.get('/', (req, res) => {
  res.json({
    message: 'TravelEase API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login',
      bookings: '/api/bookings',
      destinations: '/api/destinations',
      analytics: '/api/admin/analytics'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📝 Test API: curl http://localhost:${PORT}`);
});
