import React from 'react';
import { CheckCircle } from 'lucide-react';

interface NotificationToastProps {
  darkMode: boolean;
  message: string;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ darkMode, message }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-in">
      <div className={`rounded-xl p-5 shadow-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} flex items-center gap-4 min-w-[320px]`}>
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold">Success!</h4>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
