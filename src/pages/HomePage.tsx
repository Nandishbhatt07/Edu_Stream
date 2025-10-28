import React from 'react';
import { Course } from '../types';
import CourseCard from '../components/CourseCard';
import { ArrowRight, Sparkles, Play, Users, BookOpen, Award, Star, Infinity, Headphones, Smartphone, Rocket } from 'lucide-react';

interface HomePageProps {
  courses: Course[];
  darkMode: boolean;
  wishlist: Course[];
  setCurrentPage: (page: string) => void;
  setSelectedCourse: (course: Course) => void;
  toggleWishlist: (course: Course) => void;
  addToCart: (course: Course) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  courses,
  darkMode,
  wishlist,
  setCurrentPage,
  setSelectedCourse,
  toggleWishlist,
  addToCart
}) => {

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('courseDetail');
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute inset-0" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${darkMode ? '3b82f6' : '3b82f6'}' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-blue-500/20 px-5 py-2.5 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-400">Trusted by 2 Lakh+ Students Across India</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
              Learn Today,
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Lead Tomorrow
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Master in-demand skills with expert-led courses. Learn at your own pace, build real projects, and advance your career.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button onClick={() => setCurrentPage('courses')} className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all inline-flex items-center gap-3">
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className={`px-8 py-4 rounded-2xl font-bold border-2 ${darkMode ? 'border-slate-700 hover:bg-slate-800/50 text-white' : 'border-gray-300 hover:bg-gray-100 text-gray-900'} transition-all inline-flex items-center gap-2`}>
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Users, label: 'Active Learners', value: '2L+', color: 'from-blue-500 to-cyan-500' },
                { icon: BookOpen, label: 'Total Courses', value: '350+', color: 'from-purple-500 to-pink-500' },
                { icon: Award, label: 'Certificates Issued', value: '75K+', color: 'from-orange-500 to-red-500' },
                { icon: Star, label: 'Average Rating', value: '4.8', color: 'from-green-500 to-teal-500' }
              ].map((stat, idx) => (
                <div key={idx} className={`relative p-6 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border overflow-hidden group hover:scale-105 transition-transform`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl`}></div>
                  <stat.icon className={`w-7 h-7 mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

      {/* Featured Courses - NOW USING CourseCard */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black mb-2 tracking-tight">Top Rated Courses</h2>
            <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Start your learning journey with our bestsellers</p>
          </div>
          <button onClick={() => setCurrentPage('courses')} className="text-blue-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {courses.filter(c => c.bestseller).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              darkMode={darkMode}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              onCourseClick={handleCourseClick}
            />
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-3 tracking-tight">Why Choose EduStream?</h2>
          <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Everything you need to succeed in your learning journey</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Infinity, title: 'Lifetime Access', desc: 'Learn at your own pace with unlimited access to all courses', color: 'from-blue-500 to-cyan-500' },
            { icon: Award, title: 'Industry Certificates', desc: 'Get recognized certificates to showcase your skills', color: 'from-purple-500 to-pink-500' },
            { icon: Users, title: 'Expert Instructors', desc: 'Learn from industry professionals with years of experience', color: 'from-orange-500 to-red-500' },
            { icon: Headphones, title: '24/7 Support', desc: 'Get help whenever you need with our dedicated support team', color: 'from-green-500 to-teal-500' },
            { icon: Smartphone, title: 'Mobile Learning', desc: 'Study anywhere, anytime on your mobile or tablet', color: 'from-pink-500 to-rose-500' },
            { icon: Rocket, title: 'Career Growth', desc: 'Advance your career with in-demand skills and projects', color: 'from-indigo-500 to-purple-500' }
          ].map((feature, idx) => (
            <div key={idx} className={`relative p-6 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border overflow-hidden group hover:scale-105 transition-transform`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 blur-3xl`}></div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black mb-2">{feature.title}</h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
