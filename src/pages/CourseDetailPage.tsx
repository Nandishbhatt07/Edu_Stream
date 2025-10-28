import React from 'react';
import { Course } from '../types';
import { ChevronLeft, Trophy, Star, Users, CheckCircle, Play, Zap, Clock, BookOpen, BarChart3, Award, Wifi } from 'lucide-react';

interface CourseDetailPageProps {
  selectedCourse: Course | null;
  darkMode: boolean;
  setCurrentPage: (page: string) => void;
  isAuthenticated: boolean;
  setShowAuthModal: (show: boolean) => void;
  addToCart: (course: Course) => void;
  setShowPaymentModal: (show: boolean) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  selectedCourse,
  darkMode,
  setCurrentPage,
  isAuthenticated,
  setShowAuthModal,
  addToCart,
  setShowPaymentModal
}) => {
  // If no course is selected, don't render anything (or render a "not found" message)
  if (!selectedCourse) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Course not found.</h1>
        <button onClick={() => setCurrentPage('courses')} className="ml-4 text-blue-500">
          Back to courses
        </button>
      </div>
    );
  }
  
  // Create the icon element dynamically
  const Icon = selectedCourse.icon;

  return (
    <div className="pt-24 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button onClick={() => setCurrentPage('courses')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors font-semibold">
          <ChevronLeft className="w-5 h-5" />
          Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border shadow-xl`}>
              <div className={`h-80 bg-gradient-to-br ${selectedCourse.gradient} p-12 flex items-center justify-center relative overflow-hidden`}>
                {/* Use the dynamically created icon component */}
                <Icon className="w-40 h-40 text-white/90 drop-shadow-2xl" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className={`px-4 py-2 rounded-xl text-sm font-bold ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedCourse.level}
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-bold ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedCourse.category}
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-bold ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedCourse.language}
                  </span>
                  {selectedCourse.bestseller && (
                    <span className="px-4 py-2 rounded-xl text-sm font-bold bg-yellow-400 text-black flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      BESTSELLER
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-black mb-4 tracking-tight">{selectedCourse.title}</h1>
                <p className="text-lg text-slate-400 mb-6">Taught by {selectedCourse.instructor}</p>
                
                <div className="flex items-center gap-8 mb-8 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{selectedCourse.rating}</span>
                    <span className="text-slate-400">({selectedCourse.reviews.toLocaleString()} ratings)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-slate-400" />
                    <span className="font-bold">{selectedCourse.students.toLocaleString()}</span>
                    <span className="text-slate-400">students</span>
                  </div>
                </div>

                <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    What you'll learn
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Master the fundamentals and advanced concepts',
                      'Build 10+ real-world projects from scratch',
                      'Learn industry best practices and standards',
                      'Get hands-on experience with latest tools',
                      'Prepare for job interviews and certifications',
                      'Lifetime access to all course materials'
                    ].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border sticky top-24 shadow-xl`}>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-5xl font-black">₹{selectedCourse.price.toLocaleString()}</span>
                  <div className="text-left">
                    <div className={`text-lg line-through ${darkMode ? 'text-slate-600' : 'text-gray-400'}`}>₹{selectedCourse.originalPrice.toLocaleString()}</div>
                    <div className="text-sm font-black text-green-500">{Math.round((1 - selectedCourse.price / selectedCourse.originalPrice) * 100)}% OFF</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">Limited time offer • Lifetime access</p>
              </div>

              {selectedCourse.enrolled ? (
                <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-2xl font-bold shadow-2xl mb-4 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Continue Learning
                </button>
              ) : (
                <div className="space-y-4 mb-8">
                  <button onClick={() => {
                    if (!isAuthenticated) {
                      setShowAuthModal(true);
                    } else {
                      addToCart(selectedCourse);
                      setShowPaymentModal(true);
                    }
                  }} className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Buy Now
                  </button>
                  <button onClick={() => addToCart(selectedCourse)} className={`w-full py-5 rounded-2xl font-bold border-2 ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-300 hover:bg-gray-50'} transition-all`}>
                    Add to Cart
                  </button>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Total Duration
                  </span>
                  <span className="font-bold">{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Modules
                  </span>
                  <span className="font-bold">{selectedCourse.modules}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Skill Level
                  </span>
                  <span className="font-bold">{selectedCourse.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Certificate
                  </span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    Access
                  </span>
                  <span className="font-bold">Lifetime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
