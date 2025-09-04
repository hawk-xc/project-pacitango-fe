'use client';

import { useState } from 'react';
import { Home, Search, Heart, User, MapPin, MessageCircle, Briefcase, Zap, Calendar, Coffee, Camera, Plus, Wind, Sun } from 'lucide-react';

export default function HeroBoard() {
  const [activeTab, setActiveTab] = useState('home');

  const services = [
    { id: 'explore', name: 'GoExplore', icon: MapPin, color: 'bg-red-100 text-red-600' },
    { id: 'service', name: 'GoService', icon: MessageCircle, color: 'bg-blue-100 text-blue-600' },
    { id: 'business', name: 'GoBusiness', icon: Briefcase, color: 'bg-orange-100 text-orange-600' },
    { id: 'connect', name: 'GoConnect', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'calendar', name: 'GoCalendar', icon: Calendar, color: 'bg-purple-100 text-purple-600' },
    { id: 'coffee', name: 'GoCoffee', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
    { id: 'camera', name: 'GoCamera', icon: Camera, color: 'bg-gray-100 text-gray-600' },
    { id: 'more', name: 'Menu Lainnya', icon: Plus, color: 'bg-indigo-100 text-indigo-600' },
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Tips Produktivitas untuk Remote Worker',
      subtitle: 'Meningkatkan efisiensi kerja dari rumah',
      image: 'https://images.pexels.com/photos/4050208/pexels-photo-4050208.jpeg?auto=compress&cs=tinysrgb&w=300',
      source: 'ProductivityHub',
      date: 'Jun 12, 2024',
      tag: 'Produktivitas',
    },
    {
      id: 2,
      title: 'Teknologi AI Terbaru untuk Bisnis',
      subtitle: 'Revolusi digital di era modern',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=300',
      source: 'TechDaily',
      date: 'Jun 11, 2024',
      tag: 'Teknologi',
    },
  ];

  const bottomNavItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'search', label: 'Cari', icon: Search },
    { id: 'favorites', label: 'Favorit', icon: Heart },
    { id: 'events', label: 'Event', icon: Calendar },
    { id: 'profile', label: 'Akun', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container - Mobile First */}
      <div className="max-w-sm mx-auto bg-white min-h-screen relative pb-24">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 py-2 text-sm bg-white">
          <span className="font-medium">09:30 PM</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-6 h-3 bg-green-500 rounded-sm"></div>
          </div>
        </div>

        {/* Weather Hero Card */}
        <div className="mx-4 mt-4 mb-6">
          <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-4 right-6">
              <Sun className="w-12 h-12 text-yellow-300 opacity-80" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h1 className="text-4xl font-bold">27°</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm opacity-90">12km/h</span>
                    <Wind className="w-4 h-4 opacity-90" />
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-1">Hero Board</h2>
              <p className="text-sm opacity-90">Your Personal Dashboard</p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-4 gap-4">
            {services.map((service) => (
              <button key={service.id} className="flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
                <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center mb-2`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">{service.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* News Section */}
        <div className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Berita Terkini</h3>
            <button className="text-blue-500 text-sm font-medium">Baca Semua</button>
          </div>

          <div className="space-y-4">
            {newsItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">{item.tag}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.subtitle}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{item.source}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-4 mt-8 mb-8">
          <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
            Jelajahi Lebih Banyak
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
          <div className="bg-white mx-4 mb-4 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-around items-center py-3">
              {bottomNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200 ${activeTab === item.id ? 'bg-blue-500 text-white scale-110' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
                >
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : ''}`} />
                  <span className={`text-xs font-medium ${activeTab === item.id ? 'text-white' : ''}`}>{item.label}</span>
                </button>
              ))}
            </div>
            {/* Home Indicator */}
            <div className="flex justify-center pb-2">
              <div className="w-32 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
