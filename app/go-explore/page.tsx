'use client';

import { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  ChevronDown, 
  Filter, 
  Star, 
  Heart,
  Home,
  User,
  Calendar
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Stylish Wireless Headphones',
    price: 'Rp 899.000',
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 212
  },
  {
    id: 2,
    name: 'Minimalist Leather Wallet',
    price: 'Rp 450.000',
    image: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 430
  },
  {
    id: 3,
    name: 'Smart Fitness Tracker',
    price: 'Rp 1.250.000',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 560
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    price: 'Rp 650.000',
    image: 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 312
  },
  {
    id: 5,
    name: 'Organic Green Tea Set',
    price: 'Rp 350.000',
    image: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 189
  },
  {
    id: 6,
    name: 'Modern Ceramic Vase',
    price: 'Rp 550.000',
    image: 'https://images.pexels.com/photos/1085374/pexels-photo-1085374.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 98
  }
];

const categories = [
  'Elektronik', 'Fashion', 'Kesehatan', 'Rumah', 'Buku', 'Olahraga'
];

export default function GoExplorePage() {
  const [activeTab, setActiveTab] = useState('search');

  const bottomNavItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'search', label: 'Cari', icon: Search },
    { id: 'favorites', label: 'Favorit', icon: Heart },
    { id: 'events', label: 'Event', icon: Calendar },
    { id: 'profile', label: 'Akun', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-sm mx-auto bg-white min-h-screen relative pb-24">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">GoExplore</h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-500">
                <Search className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:text-blue-500 relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="relative">
              <input 
                type="text"
                placeholder="Cari produk atau layanan..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <button className="flex items-center space-x-2 text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                <span>Kategori</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mb-6">
            <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4">
              {categories.map(category => (
                <button key={category} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200 whitespace-nowrap">
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Rekomendasi Untukmu</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden group">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-gray-600 hover:text-red-500 backdrop-blur-sm">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
                    <p className="text-lg font-bold text-blue-600 mt-1">{product.price}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{product.rating}</span>
                      <span className="mx-1">|</span>
                      <span>Terjual {product.reviews}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
          <div className="bg-white mx-4 mb-4 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-around items-center py-3">
              {bottomNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-blue-500 text-white scale-110' 
                      : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : ''}`} />
                  <span className={`text-xs font-medium ${activeTab === item.id ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
