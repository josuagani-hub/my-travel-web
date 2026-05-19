import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Star, Menu, X, Phone, Mail, Lock } from 'lucide-react';
import { AdminLogin, AdminDashboard, AdminBookings, AdminDestinations } from './AdminDashboard';

const API_URL = 'http://localhost:5000/api';

// 1. Komponen Navbar
const Navbar = ({ isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-full z-[100] bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl md:text-2xl font-bold text-blue-600">
            Travel<span className="text-orange-500">Ease</span>
          </Link>
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/destinasi" className="hover:text-blue-600 transition">Destinasi</Link>
            <Link to="/paket" className="hover:text-blue-600 transition">Paket</Link>
            <Link to="/admin/login" className="flex items-center gap-2 hover:text-blue-600 transition text-blue-600 font-bold">
              <Lock size={18} /> Admin
            </Link>
          </div>
          <div className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-lg">
          <Link to="/" className="block text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/destinasi" className="block text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Destinasi</Link>
          <Link to="/paket" className="block text-gray-700 font-medium" onClick={() => setIsOpen(false)}>Paket</Link>
          <Link to="/admin/login" className="block text-blue-600 font-bold" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
};

// 2. Komponen Modal Pemesanan dengan Tanggal
const BookingModal = ({ product, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = {
      name: e.target.name.value,
      quantity: e.target.quantity.value,
      departureDate: e.target.departureDate.value,
      destination: product.name,
      price: product.price
    };

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Pemesanan gagal');
        return;
      }

      alert(`✅ Pesanan berhasil! ID Pemesanan: ${data.booking.id}\n\nNama: ${formData.name}\nDestinasi: ${formData.destination}\nTanggal: ${formData.departureDate}\nJumlah: ${formData.quantity} orang\nHarga: ${formData.price}`);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError('Koneksi ke server gagal. Pastikan backend sedang berjalan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400"><X size={24} /></button>
        <h2 className="text-2xl font-bold mb-1">Pesan Tiket</h2>
        <p className="text-gray-500 mb-6 text-sm">Destinasi: <span className="text-blue-600 font-bold">{product.name}</span></p>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
        
        <form onSubmit={handleOrder} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">NAMA LENGKAP</label>
            <input required name="name" type="text" placeholder="Masukkan nama" className="w-full p-3 border rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">JUMLAH ORANG</label>
              <input required name="quantity" type="number" min="1" placeholder="0" className="w-full p-3 border rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">TANGGAL PERGI</label>
              <input required name="departureDate" type="date" className="w-full p-3 border rounded-xl" />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold mt-4 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : `Konfirmasi - Rp ${product.price}`}
          </button>
        </form>
      </div>
    </div>
  );
};

// 3. Komponen Card
const DestinationCard = ({ name, location, price, rating, image, onBook }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 transition hover:shadow-xl">
    <div className="relative">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-bold">{rating}</span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <p className="text-gray-500 text-sm mb-4">{location}</p>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-bold text-sm">Rp {price}</span>
        <button onClick={() => onBook({ name, price })} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition">Pesan</button>
      </div>
    </div>
  </div>
);

// 4. Komponen App Utama
export default function App() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  // Fetch destinations from API
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch(`${API_URL}/destinations`);
      const data = await response.json();
      setDestinations(data);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      // Fallback data jika server tidak tersedia
      setDestinations([
        { id: 1, name: "Pulau Bunaken", location: "Manado", price: "1.500.000", rating: 4.9, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800" },
        { id: 2, name: "Nusa Penida", location: "Bali", price: "2.200.000", rating: 4.8, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800" },
        { id: 3, name: "Gunung Bromo", location: "Jawa Timur", price: "1.200.000", rating: 4.7, image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800" },
        { id: 4, name: "Raja Ampat", location: "Papua Barat", price: "5.500.000", rating: 5.0, image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800" },
        { id: 5, name: "Candi Borobudur", location: "Magelang", price: "750.000", rating: 4.8, image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=800" },
        { id: 6, name: "Labuan Bajo", location: "NTT", price: "4.200.000", rating: 4.9, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
        { id: 7, name: "Tanah Lot", location: "Bali", price: "900.000", rating: 4.7, image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800" },
        { id: 8, name: "Danau Toba", location: "Sumatera Utara", price: "1.800.000", rating: 4.6, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
        { id: 9, name: "Wakatobi", location: "Sulawesi Tenggara", price: "3.500.000", rating: 4.8, image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800" },
        { id: 10, name: "Kawah Ijen", location: "Banyuwangi", price: "1.100.000", rating: 4.7, image: "https://images.unsplash.com/photo-1627664819818-e147d6221422?w=800" },
        { id: 11, name: "Pantai Ora", location: "Maluku", price: "2.800.000", rating: 4.9, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
        { id: 12, name: "Derawan", location: "Kalimantan Timur", price: "3.200.000", rating: 4.8, image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800" },
        { id: 13, name: "Tanjung Puting", location: "Kalimantan Tengah", price: "2.500.000", rating: 4.7, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
        { id: 14, name: "Toraja", location: "Sulawesi Selatan", price: "1.900.000", rating: 4.8, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
        { id: 15, name: "Gili Trawangan", location: "Lombok", price: "1.400.000", rating: 4.7, image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800" },
        { id: 16, name: "Belitung", location: "Bangka Belitung", price: "1.600.000", rating: 4.8, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
        { id: 17, name: "Gunung Rinjani", location: "Lombok", price: "2.300.000", rating: 4.9, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
        { id: 18, name: "Kepulauan Seribu", location: "Jakarta", price: "850.000", rating: 4.5, image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800" },
        { id: 19, name: "Bukit Tinggi", location: "Sumatera Barat", price: "1.200.000", rating: 4.7, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
        { id: 20, name: "Pulau Weh", location: "Aceh", price: "2.100.000", rating: 4.8, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" }
      ]);
    }
  };

  const triggerBooking = (product) => {
    setSelectedProduct(product);
    setShowBookingForm(true);
  };

  const handleAdminLogin = (token) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        {showBookingForm && selectedProduct && (
          <BookingModal 
            product={selectedProduct} 
            onClose={() => setShowBookingForm(false)}
            onSuccess={fetchDestinations}
          />
        )}

        <Routes>
          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
          <Route path="/admin/dashboard" element={
            adminToken ? <AdminDashboard token={adminToken} onLogout={handleAdminLogout} /> : <AdminLogin onLogin={handleAdminLogin} />
          } />
          <Route path="/admin/bookings" element={
            adminToken ? <AdminBookings token={adminToken} /> : <AdminLogin onLogin={handleAdminLogin} />
          } />
          <Route path="/admin/destinations" element={
            adminToken ? <AdminDestinations token={adminToken} /> : <AdminLogin onLogin={handleAdminLogin} />
          } />

          {/* PUBLIC ROUTES */}
          <Route path="/" element={
            <div className="min-h-screen">
              {/* Hero Section dengan Background Image */}
              <div className="relative h-[600px] flex items-center justify-center text-white">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  alt="Hero Background"
                />
                <div className="relative z-20 text-center px-4">
                  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
                    Explore <span className="text-orange-400">Indonesia</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-md font-light">
                    Temukan keajaiban alam dan budaya di 20 destinasi terbaik pilihan TravelEase.
                  </p>
                  <Link to="/destinasi" className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all transform hover:scale-105 inline-block">
                    Mulai Petualangan
                  </Link>
                </div>
              </div>

              {/* Statistik/Keunggulan Singkat */}
              <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100">
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">20+</h3>
                  <p className="text-gray-600 font-medium">Destinasi Pilihan</p>
                </div>
                <div className="p-8 rounded-3xl bg-orange-50 border border-orange-100">
                  <h3 className="text-4xl font-bold text-orange-500 mb-2">100%</h3>
                  <p className="text-gray-600 font-medium">Transaksi Aman</p>
                </div>
                <div className="p-8 rounded-3xl bg-green-50 border border-green-100">
                  <h3 className="text-4xl font-bold text-green-600 mb-2">24/7</h3>
                  <p className="text-gray-600 font-medium">Layanan Bantuan</p>
                </div>
              </div>
            </div>
          } />

          <Route path="/destinasi" element={
            <div className="pt-24 max-w-7xl mx-auto px-4 min-h-screen">
              <h1 className="text-3xl font-bold my-8">20 Destinasi Populer</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                {destinations.map(item => <DestinationCard key={item.id} {...item} onBook={triggerBooking} />)}
              </div>
            </div>
          } />

          <Route path="/paket" element={
            <div className="pt-24 max-w-7xl mx-auto px-4 min-h-screen">
              <h1 className="text-3xl font-bold my-8">Paket Spesial</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-3xl border-2 border-orange-200 hover:shadow-lg transition">
                  <h3 className="text-2xl font-bold text-orange-600 mb-4">Paket Group 5 Orang</h3>
                  <p className="text-gray-700 mb-4">Beli paket untuk 5 orang, dapatkan 1 orang GRATIS!</p>
                  <p className="text-3xl font-bold text-orange-600">-20% Diskon</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl border-2 border-blue-200 hover:shadow-lg transition">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">Honeymoon Package</h3>
                  <p className="text-gray-700 mb-4">Paket romantis untuk pengantin baru dengan fasilitas premium</p>
                  <p className="text-3xl font-bold text-blue-600">-15% Diskon</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl border-2 border-green-200 hover:shadow-lg transition">
                  <h3 className="text-2xl font-bold text-green-600 mb-4">Student Discount</h3>
                  <p className="text-gray-700 mb-4">Khusus mahasiswa/pelajar dengan kartu identitas berlaku</p>
                  <p className="text-3xl font-bold text-green-600">-25% Diskon</p>
                </div>
              </div>
            </div>
          } />
        </Routes>

        <footer className="bg-gray-50 border-t py-12 text-center mt-auto">
          <div className="flex justify-center space-x-6 text-gray-400 mb-4">
            <Phone /> <Mail />
          </div>
          <p className="text-xs text-gray-400">© 2026 TravelEase - Kelompok 5.</p>
        </footer>
      </div>
    </Router>
  );
}