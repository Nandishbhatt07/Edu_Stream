import React, { useState } from 'react';
import { Course, User } from '../types';
import { Lock, Bell, Settings, Flame, Trophy, BookOpen, Clock, CheckCheck, Target, Activity, GraduationCap, Code, Brain, Rocket } from 'lucide-react';

interface DashboardPageProps {
  user: User | null;
  isAuthenticated: boolean;
  setShowAuthModal: (show: boolean) => void;
  enrolledCourses: Course[];
  setCurrentPage: (page: string) => void;
  setSelectedCourse: (course: Course) => void;
  darkMode: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  isAuthenticated,
  setShowAuthModal,
  enrolledCourses,
  setCurrentPage,
  setSelectedCourse,
  darkMode
}) => {
  // This page has its own state for widgets
  const [currentStreak] = useState(12);
  const [activeTab, setActiveTab] = useState('ongoing');
  
  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete Web Dev Bootcamp', progress: 75, target: 100, current: 75, icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Master 3 Programming Languages', progress: 66, target: 3, current: 2, icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Build 5 Real Projects', progress: 40, target: 5, current: 2, icon: Rocket, color: 'from-orange-500 to-red-500' }
  ]);

  const [weeklyActivity, setWeeklyActivity] = useState([
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 2.8 },
    { day: 'Wed', hours: 4.2 },
    { day: 'Thu', hours: 3.0 },
    { day: 'Fri', hours: 4.5 },
    { day: 'Sat', hours: 5.2 },
    { day: 'Sun', hours: 3.8 }
  ]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/30">
            <Lock className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-3">Sign In Required</h2>
          <p className="text-slate-400 mb-8 text-lg">Please sign in to access your personalized dashboard</p>
          <button onClick={() => setShowAuthModal(true)} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">Hey {user.name}! 👋</h1>
            <p className="text-lg text-slate-400">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center gap-3">
            <button className={`p-3 rounded-xl ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-gray-200 hover:bg-gray-50'} border transition-all`}>
              <Bell className="w-5 h-5" />
            </button>
            <button className={`p-3 rounded-xl ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-gray-200 hover:bg-gray-50'} border transition-all`}>
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Streak & Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600"></div>
            <div className="relative z-10 p-8 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Flame className="w-10 h-10 text-white drop-shadow-2xl" />
                </div>
                <div>
                  <div className="text-5xl font-black text-white mb-1">{currentStreak} Days</div>
                  <div className="text-white/90 text-lg font-bold">Learning Streak 🔥</div>
                  <div className="text-white/70 text-sm mt-1">Keep it up! You're doing amazing</div>
                </div>
              </div>
              <button className="bg-white/20 backdrop-blur-md text-white px-5 py-3 rounded-xl font-bold hover:bg-white/30 transition-all hidden md:block">
                View Progress
              </button>
            </div>
          </div>
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-black">{user.certificates}</div>
                <div className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Certificates</div>
              </div>
            </div>
            <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Earned this month</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: BookOpen, label: "Active Courses", value: enrolledCourses.length, gradient: "from-blue-500 to-cyan-500" },
            { icon: Clock, label: "Learning Hours", value: `${user.hoursLearned}h`, gradient: "from-purple-500 to-pink-500" },
            { icon: CheckCheck, label: "Completed", value: user.coursesCompleted, gradient: "from-green-500 to-teal-500" },
            { icon: Target, label: "Goal Progress", value: "75%", gradient: "from-orange-500 to-red-500" }
          ].map((stat, idx) => (
            <div key={idx} className={`relative p-6 rounded-2xl overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border hover:scale-105 transition-transform group`}>
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl`}></div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 relative z-10`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-3xl font-black mb-1 relative z-10">{stat.value}</div>
              <div className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-600'} relative z-10`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <Target className="w-7 h-7 text-blue-500" />
                  Your Goals
                </h2>
                <button className="text-blue-500 font-bold text-sm hover:text-blue-400 transition-colors">Edit</button>
              </div>
              <div className="space-y-5">
                {goals.map(goal => {
                  const GoalIcon = goal.icon;
                  return (
                    <div key={goal.id} className={`p-5 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${goal.color} rounded-lg flex items-center justify-center`}>
                            <GoalIcon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-bold">{goal.title}</span>
                        </div>
                        <span className="text-sm font-black text-blue-500">{goal.current}/{goal.target}</span>
                      </div>
                      <div className={`h-2.5 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} overflow-hidden`}>
                        <div className={`h-2.5 bg-gradient-to-r ${goal.color} rounded-full transition-all`} style={{ width: `${goal.progress}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-500" />
              This Week
            </h2>
            <div className="space-y-3">
              {weeklyActivity.map((day, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{day.day}</span>
                  <div className="flex items-center gap-2 flex-1 mx-4">
                    <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-gray-200'} overflow-hidden`}>
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${(day.hours / 6) * 100}%` }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-black">{day.hours}h</span>
                </div>
              ))}
            </div>
            <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total this week</span>
                <span className="text-2xl font-black text-blue-500">{weeklyActivity.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <GraduationCap className="w-7 h-7 text-blue-500" />
              My Courses
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveTab('ongoing')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'ongoing' ? 'bg-blue-500 text-white' : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-600'}`}>
                Ongoing
              </button>
              <button onClick={() => setActiveTab('completed')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'completed' ? 'bg-blue-500 text-white' : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-600'}`}>
                Completed
              </button>
            </div>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {enrolledCourses.map(course => {
                const Icon = course.icon;
                return (
                  <div 
                    key={course.id} 
                    className={`p-5 rounded-xl ${darkMode ? 'bg-slate-800 hover:bg-slate-750' : 'bg-gray-50 hover:bg-gray-100'} flex items-center gap-5 cursor-pointer hover:scale-[1.02] transition-all group`} 
                    onClick={() => { setSelectedCourse(course); setCurrentPage('courseDetail'); }}
                  >
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-base mb-1 truncate group-hover:text-blue-500 transition-colors">{course.title}</h3>
                      <p className={`text-xs mb-3 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Last active: 2h ago</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className={darkMode ? 'text-slate-400' : 'text-gray-600'}>Progress</span>
                          <span className="font-black text-blue-500">{course.progress}%</span>
                        </div>
                        <div className={`h-1.5 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} overflow-hidden`}>
                          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">No enrolled courses yet</h3>
              <p className="text-slate-400 mb-6">Start your learning journey today!</p>
              <button onClick={() => setCurrentPage('courses')} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
