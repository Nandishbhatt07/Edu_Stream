import React from 'react';
import { User, X, ArrowRight } from 'lucide-react';
import { GoogleIcon, GithubIcon, FacebookIcon, AppleIcon } from '../icons/SocialIcons';

// Define the props it needs from App.tsx
interface AuthModalProps {
  darkMode: boolean;
  authMode: 'login' | 'signup';
  formData: { name: string; email: string; password: string };
  isProcessing: boolean;
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
  setFormData: (data: any) => void;
  handleAuth: (e: React.FormEvent) => void;
  handleSocialAuth: (provider: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  darkMode,
  authMode,
  formData,
  isProcessing,
  setShowAuthModal,
  setAuthMode,
  setFormData,
  handleAuth,
  handleSocialAuth
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`max-w-md w-full rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border p-10 relative shadow-2xl`}>
        <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-2">
            {authMode === 'login' ? 'Welcome Back!' : 'Join EduStream'}
          </h2>
          <p className="text-slate-400">
            {authMode === 'login' ? 'Sign in to continue learning' : 'Create your account to get started'}
          </p>
        </div>

        {/* Social Auth Buttons with new icons */}
        <div className="space-y-3 mb-6">
          <button onClick={() => handleSocialAuth('Google')} className={`w-full flex items-center justify-center gap-3 px-5 py-4 rounded-xl font-semibold ${darkMode ? 'bg-slate-800 hover:bg-slate-750 border-slate-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2 transition-all group`}>
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
          
          <button onClick={() => handleSocialAuth('Github')} className={`w-full flex items-center justify-center gap-3 px-5 py-4 rounded-xl font-semibold ${darkMode ? 'bg-slate-800 hover:bg-slate-750 border-slate-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2 transition-all`}>
            <GithubIcon />
            <span>Continue with Github</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleSocialAuth('Facebook')} className={`flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-semibold ${darkMode ? 'bg-slate-800 hover:bg-slate-750 border-slate-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2 transition-all`}>
              <FacebookIcon />
              <span>Facebook</span>
            </button>
            <button onClick={() => handleSocialAuth('Apple')} className={`flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-semibold ${darkMode ? 'bg-slate-800 hover:bg-slate-750 border-slate-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2 transition-all`}>
              <AppleIcon />
              <span>Apple</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className={`flex-1 h-px ${darkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
          <span className="text-sm text-slate-500 font-semibold">OR</span>
          <div className={`flex-1 h-px ${darkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
                placeholder="Rahul Sharma"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
              placeholder="rahul@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full px-4 py-3.5 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-2 outline-none focus:border-blue-500 transition-colors`}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
          >
            {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
