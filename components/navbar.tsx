import { Phone, Star, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo - UPDATED */}
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-200">
              <span className="transform -rotate-6">⚡</span>
            </div>
            
            {/* Brand Name */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold leading-none tracking-tight">
                <span className="text-blue-600">Ultrafy</span>
                <span className="text-gray-800">Networks</span>
              </h1>
              <p className="text-[8px] md:text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-0.5">
                Fibre to the Home
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700 hidden sm:inline">
              0700 541 561
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            500+ Happy Customers
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Fibre to the Home
            <br />
            <span className="text-blue-600">Lightning Fast</span> Speeds
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Experience the power of true fibre internet with speeds up to{' '}
            <span className="font-bold text-blue-600">30 Mbps</span>. Stream, game, 
            and work without interruption.
          </p>

          {/* CTA Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 mb-8">
            View Packages →
          </button>

          {/* Contact */}
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Phone className="w-5 h-5 text-blue-600" />
            <span className="text-xl font-semibold">0700 541 561</span>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-gray-800 ml-2">4.9/5</span>
            <span className="text-gray-400 text-sm">(500+ reviews)</span>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">FAST</div>
              <div className="text-xs text-gray-500">Speed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">RELIABLE</div>
              <div className="text-xs text-gray-500">Connection</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">EFFICIENT</div>
              <div className="text-xs text-gray-500">Service</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <span>© 2026 UltrafyNetworks. All rights reserved.</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Powered by Fibre
          </span>
        </div>
      </footer>
    </div>
  );
}
