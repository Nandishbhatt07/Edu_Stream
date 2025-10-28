import React from 'react';
import { Course } from '../types';
import { ShoppingCart, Trash2, Shield, Lock, Star } from 'lucide-react';

interface CartPageProps {
  cart: Course[];
  darkMode: boolean;
  removeFromCart: (courseId: number) => void;
  isAuthenticated: boolean;
  setShowAuthModal: (show: boolean) => void;
  setShowPaymentModal: (show: boolean) => void;
  setCurrentPage: (page: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({
  cart,
  darkMode,
  removeFromCart,
  isAuthenticated,
  setShowAuthModal,
  setShowPaymentModal,
  setCurrentPage
}) => {
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartSave = cart.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);

  return (
    <div className="pt-24 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-black mb-10 flex items-center gap-4 tracking-tight">
          <ShoppingCart className="w-10 h-10 text-blue-500" />
          Shopping Cart ({cart.length} items)
        </h1>

        {cart.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {cart.map(course => {
                const Icon = course.icon;
                const discount = Math.round((1 - course.price / course.originalPrice) * 100);
                return (
                  <div key={course.id} className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border hover:shadow-xl transition-all`}>
                    <div className="flex items-center gap-5">
                      {/* Using the image here for consistency */}
                      <img src={course.imageUrl} alt={course.title} className="w-28 h-28 rounded-xl object-cover flex-shrink-0" />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-black mb-2 truncate">{course.title}</h3>
                        <p className={`text-sm mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>By {course.instructor}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">{course.rating}</span>
                          </div>
                          <span className={darkMode ? 'text-slate-500' : 'text-gray-400'}>{course.duration}</span>
                          <span className={darkMode ? 'text-slate-500' : 'text-gray-400'}>{course.modules} modules</span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-4">
                        <div>
                          <div className="text-3xl font-black mb-1">₹{course.price.toLocaleString()}</div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm line-through ${darkMode ? 'text-slate-600' : 'text-gray-400'}`}>₹{course.originalPrice.toLocaleString()}</span>
                            <span className="text-xs font-black text-green-500">{discount}% OFF</span>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(course.id)} className="text-red-500 hover:text-red-600 p-2 hover:bg-red-500/10 rounded-lg transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border h-fit sticky top-24 shadow-xl`}>
              <h3 className="text-2xl font-black mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Subtotal</span>
                  <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-slate-400' : 'text-gray-600'}>You Save</span>
                  <span className="font-bold text-green-500">₹{cartSave.toLocaleString()}</span>
                </div>
                <div className={`h-px ${darkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-4xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>
              <button onClick={() => {
                if (!isAuthenticated) {
                  setShowAuthModal(true);
                } else {
                  setShowPaymentModal(true);
                }
              }} className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Proceed to Checkout
              </button>
              <p className={`text-xs text-center mt-4 ${darkMode ? 'text-slate-500' : 'text-gray-400'} flex items-center justify-center gap-1`}>
                <Lock className="w-3 h-3" />
                Secure payment with 256-bit encryption
              </p>
            </div>
          </div>
        ) : (
          <div className={`rounded-2xl p-20 text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
              <ShoppingCart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-3">Your cart is empty</h2>
            <p className="text-slate-400 text-lg mb-8">Add courses to get started with learning</p>
            <button onClick={() => setCurrentPage('courses')} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
