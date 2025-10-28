import React from 'react';
import { Layers } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`border-t ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} mt-32`}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl"></div>
                <div className="absolute inset-0.5 bg-slate-950 rounded-xl flex items-center justify-center">
                  <Layers className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <span className="text-2xl font-black">EduStream</span>
            </div>
            <p className={`text-base mb-6 ${darkMode ? 'text-slate-400' : 'text-gray-600'} max-w-md`}>
              India's leading online learning platform. Master new skills, advance your career, and achieve your goals with expert-led courses.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: '📱', name: 'App Store' },
                { icon: '🤖', name: 'Play Store' }
              ].map((store) => (
                <button key={store.name} className={`px-4 py-2 rounded-xl border-2 ${darkMode ? 'border-slate-800 hover:border-slate-700' : 'border-gray-200 hover:border-gray-300'} transition-all flex items-center gap-2`}>
                  <span className="text-xl">{store.icon}</span>
                  <span className="text-xs font-bold">{store.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-base mb-5">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Press', 'Blog', 'Affiliate'].map((item, idx) => (
                <li key={idx}>
                  <button className={`text-sm ${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-base mb-5">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Contact Us', 'FAQs', 'Terms', 'Privacy'].map((item, idx) => (
                <li key={idx}>
                  <button className={`text-sm ${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'} pt-8 flex flex-col md:flex-row items-center justify-between gap-4`}>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            © 2025 EduStream. All rights reserved. Made with ❤️ in India
          </p>
          <div className="flex items-center gap-4">
            {['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
              <button key={social} className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center transition-all`}>
                <span className="text-xs font-bold">{social[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
