import React from 'react';
import { ShoppingCart, User, Moon, Sun, Layers } from 'lucide-react';
import { User as UserType } from '../types'; // Renaming to avoid conflict

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cart: any[];
  isAuthenticated: boolean;
  user: UserType | null;
  setShowAuthModal: (show: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  currentPage,
  setCurrentPage,
  cart,
  isAuthenticated,
  user,
  setShowAuthModal
}) => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className={`${darkMode ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/80 border-gray-200'} backdrop-blur-2xl border rounded-3xl shadow-2xl shadow-black/10`}>
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl"></div>
                <div className="absolute inset-0.5 bg-slate-950 rounded-xl flex items-center justify-center">
                  <Layers className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight">EduStream</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-1">
              {['home', 'courses', 'dashboard'].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                    currentPage === page
                      ? darkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-900'
                      : darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button onClick={() => setCurrentPage('cart')} className={`relative p-2.5 rounded-xl transition-all ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}>
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center font-bold text-xs">
                  {user?.avatar}
                </div>
                <span className="hidden md:block">{user?.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
