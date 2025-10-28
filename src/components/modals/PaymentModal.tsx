import React, { useState } from 'react';
import { X, Shield, Lock, ArrowRight, CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { Course } from '../../types';

interface PaymentModalProps {
  darkMode: boolean;
  cart: Course[];
  isProcessing: boolean;
  setShowPaymentModal: (show: boolean) => void;
  handlePayment: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  darkMode,
  cart,
  isProcessing,
  setShowPaymentModal,
  handlePayment
}) => {
  // This modal has its own internal state
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({ 
    cardNumber: '', 
    expiry: '', 
    cvv: '', 
    name: '', 
    upiId: '' 
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This calls the handlePayment function passed down from App.tsx
    handlePayment();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`max-w-2xl w-full rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border p-10 relative shadow-2xl my-8`}>
        <button onClick={() => { setShowPaymentModal(false); setPaymentStep(1); }} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-2">Secure Checkout</h2>
          <p className="text-slate-400 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            256-bit SSL encrypted payment
          </p>
        </div>

        {paymentStep === 1 ? (
          <div>
            <div className="space-y-4 mb-8">
              {cart.map(course => (
                <div key={course.id} className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} flex items-center justify-between`}>
                  <span className="font-bold">{course.title}</span>
                  <span className="text-xl font-black">₹{course.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} mb-8`}>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Total Amount</span>
                <span className="text-4xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button onClick={() => setPaymentStep(2)} className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3">
              <span>Continue to Payment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div>
            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl font-semibold border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-500/10'
                      : darkMode ? 'border-slate-700 hover:border-slate-600' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm">Card</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl font-semibold border-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-blue-500 bg-blue-500/10'
                      : darkMode ? 'border-slate-700 hover:border-slate-600' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Smartphone className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm">UPI</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-xl font-semibold border-2 transition-all ${
                    paymentMethod === 'wallet'
                      ? 'border-blue-500 bg-blue-500/10'
                      : darkMode ? 'border-slate-700 hover:border-slate-600' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <DollarSign className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm">Wallet</div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {paymentMethod === 'card' ? (
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-bold mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={paymentData.name}
                      onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                      className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                      placeholder="Rahul Sharma"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Card Number</label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()})}
                      className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                        className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">CVV</label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                        className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : paymentMethod === 'upi' ? (
                <div className={`p-8 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} text-center mb-8`}>
                  <Smartphone className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                  <p className="font-bold text-lg mb-4">Pay with UPI</p>
                  <input
                    type="text"
                    value={paymentData.upiId}
                    onChange={(e) => setPaymentData({...paymentData, upiId: e.target.value})}
                    className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors mb-4`}
                    placeholder="yourname@upi"
                    required
                  />
                </div>
              ) : (
                <div className={`p-8 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} text-center mb-8`}>
                  <DollarSign className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                  <p className="font-bold text-lg mb-4">Pay with Wallet</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Paytm', icon: '💳' },
                      { name: 'PhonePe', icon: '📱' },
                      { name: 'Amazon Pay', icon: '🛒' },
                      { name: 'Mobikwik', icon: '💰' }
                    ].map((wallet) => (
                      <button
                        key={wallet.name}
                        type="button"
                        className={`p-4 rounded-xl border-2 ${darkMode ? 'border-slate-700 hover:border-blue-500 bg-slate-900' : 'border-gray-300 hover:border-blue-500 bg-white'} transition-all`}
                      >
                        <div className="text-3xl mb-2">{wallet.icon}</div>
                        <div className="text-sm font-bold">{wallet.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Pay ₹{cartTotal.toLocaleString()}</span>
                  </>
                )}
              </button>
              <p className={`text-xs text-center mt-4 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                🔒 Your payment information is encrypted and secure
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
