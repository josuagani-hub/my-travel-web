import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BarChart3, Package, Calendar, Eye, Edit2, Trash2, Plus } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login gagal');
        return;
      }

      onLogin(data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Koneksi ke server gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">TravelEase</h1>
        <p className="text-gray-500 text-center mb-8 font-medium">Panel Admin</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Demo: username: <strong>admin</strong> | password: <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
};

export const AdminDashboard = ({ token, onLogout }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/analytics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Fetch analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Pemesanan</p>
                    <h3 className="text-3xl font-bold text-gray-800">{analytics?.totalBookings || 0}</h3>
                  </div>
                  <Calendar className="w-12 h-12 text-blue-500 opacity-50" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Pendapatan</p>
                    <h3 className="text-2xl font-bold text-gray-800">Rp {(analytics?.totalRevenue || 0).toLocaleString('id-ID')}</h3>
                  </div>
                  <BarChart3 className="w-12 h-12 text-green-500 opacity-50" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Pending</p>
                    <h3 className="text-3xl font-bold text-gray-800">{analytics?.bookingsByStatus?.pending || 0}</h3>
                  </div>
                  <Package className="w-12 h-12 text-yellow-500 opacity-50" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Confirmed</p>
                    <h3 className="text-3xl font-bold text-gray-800">{analytics?.bookingsByStatus?.confirmed || 0}</h3>
                  </div>
                  <Eye className="w-12 h-12 text-purple-500 opacity-50" />
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Pemesanan Terbaru</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-2">Nama</th>
                      <th className="text-left py-2">Destinasi</th>
                      <th className="text-left py-2">Tanggal</th>
                      <th className="text-left py-2">Jumlah</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics?.recentBookings?.map(booking => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">{booking.name}</td>
                        <td className="py-3">{booking.destination}</td>
                        <td className="py-3">{new Date(booking.departureDate).toLocaleDateString('id-ID')}</td>
                        <td className="py-3">{booking.quantity}</td>
                        <td className="py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <button
                onClick={() => navigate('/admin/bookings')}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border-t-4 border-blue-500"
              >
                <Calendar className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="font-bold">Kelola Pemesanan</h3>
                <p className="text-sm text-gray-500">Lihat dan kelola semua pemesanan</p>
              </button>

              <button
                onClick={() => navigate('/admin/destinations')}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border-t-4 border-purple-500"
              >
                <Package className="w-8 h-8 text-purple-500 mb-2" />
                <h3 className="font-bold">Kelola Destinasi</h3>
                <p className="text-sm text-gray-500">Tambah, edit, hapus destinasi</p>
              </button>

              <button
                onClick={() => navigate('/')}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border-t-4 border-green-500"
              >
                <Eye className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="font-bold">Lihat Website</h3>
                <p className="text-sm text-gray-500">Kembali ke halaman utama</p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const AdminBookings = ({ token }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchBookings();
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm('Hapus pemesanan ini?')) {
      try {
        const response = await fetch(`${API_URL}/bookings/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          fetchBookings();
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kelola Pemesanan</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">Semua</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 font-bold">Nama</th>
                  <th className="text-left px-6 py-4 font-bold">Destinasi</th>
                  <th className="text-left px-6 py-4 font-bold">Tanggal</th>
                  <th className="text-left px-6 py-4 font-bold">Jumlah</th>
                  <th className="text-left px-6 py-4 font-bold">Status</th>
                  <th className="text-left px-6 py-4 font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{booking.name}</td>
                    <td className="px-6 py-4">{booking.destination}</td>
                    <td className="px-6 py-4">{new Date(booking.departureDate).toLocaleDateString('id-ID')}</td>
                    <td className="px-6 py-4">{booking.quantity} orang</td>
                    <td className="px-6 py-4">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                        className={`px-3 py-1 rounded-lg text-sm font-bold ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminDestinations = ({ token }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', price: '', rating: 4.5, image: '' });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch(`${API_URL}/destinations`);
      const data = await response.json();
      setDestinations(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDestination = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/destinations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({ name: '', location: '', price: '', rating: 4.5, image: '' });
        setShowForm(false);
        fetchDestinations();
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const deleteDestination = async (id) => {
    if (window.confirm('Hapus destinasi ini?')) {
      try {
        const response = await fetch(`${API_URL}/destinations/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          fetchDestinations();
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kelola Destinasi</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} /> Tambah Destinasi
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <form onSubmit={handleAddDestination} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama Destinasi"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Lokasi"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Harga (cth: 1.500.000)"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Rating (0-5)"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                min="0"
                max="5"
                step="0.1"
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="url"
                placeholder="URL Gambar"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="px-4 py-2 border rounded-lg md:col-span-2"
              />
              <div className="md:col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map(dest => (
              <div key={dest.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {dest.image && <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{dest.name}</h3>
                  <p className="text-gray-500 text-sm">{dest.location}</p>
                  <p className="font-bold text-blue-600 my-2">Rp {dest.price}</p>
                  <p className="text-yellow-500">⭐ {dest.rating}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => deleteDestination(dest.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-bold text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
