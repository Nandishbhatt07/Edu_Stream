import React from 'react';
import { Course } from '../types';
import { Heart, Star, Users, Clock, Trophy } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  darkMode: boolean;
  wishlist: Course[];
  toggleWishlist: (course: Course) => void;
  addToCart: (course: Course) => void;
  onCourseClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  darkMode,
  wishlist,
  toggleWishlist,
  addToCart,
  onCourseClick
}) => {
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);
  const isWishlisted = !!wishlist.find(item => item.id === course.id);

  return (
    <div className={`group rounded-2xl overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border hover:shadow-2xl hover:shadow-purple-500/10 transition-all hover:scale-[1.02]`}>
      {/* IMAGE HEADER - This is the key change */}
      <div className="relative h-44 w-full overflow-hidden cursor-pointer" onClick={() => onCourseClick(course)}>
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {course.bestseller && (
            <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              BESTSELLER
            </span>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); toggleWishlist(course); }} 
            className="w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/60 transition-all"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
            {course.level}
          </span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
            {course.language}
          </span>
        </div>
        
        <h3 
          className="text-lg font-black mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors cursor-pointer"
          onClick={() => onCourseClick(course)}
        >
          {course.title}
        </h3>
        <p className={`text-sm mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{course.instructor}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Users className="w-4 h-4" />
            <span className="text-xs">{(course.students / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{course.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black">₹{course.price.toLocaleString()}</span>
            <span className={`text-sm line-through ${darkMode ? 'text-slate-600' : 'text-gray-400'}`}>₹{course.originalPrice.toLocaleString()}</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(course); }} 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
