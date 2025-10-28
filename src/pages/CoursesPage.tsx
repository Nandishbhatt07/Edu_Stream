import React, { useState } from 'react';
import { Course } from '../types';
import CourseCard from '../components/CourseCard';
import { Search } from 'lucide-react';

interface CoursesPageProps {
  courses: Course[];
  darkMode: boolean;
  wishlist: Course[];
  toggleWishlist: (course: Course) => void;
  addToCart: (course: Course) => void;
  setSelectedCourse: (course: Course) => void;
  setCurrentPage: (page: string) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  darkMode,
  wishlist,
  toggleWishlist,
  addToCart,
  setSelectedCourse,
  setCurrentPage
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(courses.map(c => c.category))];

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('courseDetail');
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-6 tracking-tight">All Courses</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className={`flex-1 flex items-center gap-3 px-5 py-3.5 rounded-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
              <Search className="w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`px-5 py-3.5 rounded-2xl font-semibold text-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border outline-none cursor-pointer`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {filteredCourses.map(course => (
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
    </div>
  );
};

export default CoursesPage;
