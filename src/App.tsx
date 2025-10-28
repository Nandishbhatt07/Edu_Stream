import React, { useState } from 'react';
import { Course, User } from './types'; // Will be the next error if types/index.ts is missing
import { courses as initialCourses } from './data/courses'; // Will be the next error if data/courses.ts is missing

// Import Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/modals/AuthModal';
import PaymentModal from './components/modals/PaymentModal';
import NotificationToast from './components/NotificationToast';

const EduStream = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Course[]>([]);
  const [wishlist, setWishlist] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Your course data, now held in state
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  
  // All your functions remain here
  const showToast = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const addToCart = (course: Course) => {
    if (!cart.find(item => item.id === course.id)) {
      setCart([...cart, course]);
      showToast('Course added to cart!');
    }
  };

  const removeFromCart = (courseId: number) => {
    setCart(cart.filter(item => item.id !== courseId));
    showToast('Removed from cart');
  };

  const toggleWishlist = (course: Course) => {
    const exists = wishlist.find(item => item.id === course.id);
    setWishlist(exists ? wishlist.filter(item => item.id !== course.id) : [...wishlist, course]);
    showToast(exists ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      avatar: (formData.name || formData.email).substring(0, 2).toUpperCase(),
      joinDate: 'Oct 2024',
      coursesCompleted: 5,
      hoursLearned: 87,
      certificates: 3
    };
    setUser(newUser);
    
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setIsProcessing(false);
    setFormData({ name: '', email: '', password: '' });
    showToast('Welcome to EduStream!');
  };

  const handleSocialAuth = async (provider: string) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: provider.substring(0, 2).toUpperCase(),
      joinDate: 'Oct 2024',
      coursesCompleted: 5,
      hoursLearned: 87,
      certificates: 3
    };
    setUser(newUser);
    
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setIsProcessing(false);
    showToast(`Signed in with ${provider}!`);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update 'enrolled' status in the main courses state
    setCourses(prevCourses => 
      prevCourses.map(c => 
        cart.find(item => item.id === c.id) 
        ? { ...c, enrolled: true, progress: 5, lastAccessed: new Date().toISOString() } 
        : c
      )
    );
    
    setCart([]);
    setShowPaymentModal(false);
    setIsProcessing(false);
    showToast('Payment successful! Start learning now.');
    setCurrentPage('dashboard');
  };

  // This function renders the correct page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage 
          courses={courses}
          darkMode={darkMode}
          wishlist={wishlist}
          setCurrentPage={setCurrentPage}
          setSelectedCourse={setSelectedCourse}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />;
      case 'courses':
        return <CoursesPage 
          courses={courses}
          darkMode={darkMode}
          wishlist={wishlist}
          setCurrentPage={setCurrentPage}
          setSelectedCourse={setSelectedCourse}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />;
      case 'courseDetail':
        return <CourseDetailPage
          selectedCourse={selectedCourse}
          darkMode={darkMode}
          setCurrentPage={setCurrentPage}
          isAuthenticated={isAuthenticated}
          setShowAuthModal={setShowAuthModal}
          addToCart={addToCart}
          setShowPaymentModal={setShowPaymentModal}
        />;
      case 'dashboard':
        return <DashboardPage
          user={user}
          isAuthenticated={isAuthenticated}
          setShowAuthModal={setShowAuthModal}
          enrolledCourses={courses.filter(c => c.enrolled)}
          setCurrentPage={setCurrentPage}
          setSelectedCourse={setSelectedCourse}
          darkMode={darkMode}
        />;
      case 'cart':
        return <CartPage
          cart={cart}
          darkMode={darkMode}
          removeFromCart={removeFromCart}
          isAuthenticated={isAuthenticated}
          setShowAuthModal={setShowAuthModal}
          setShowPaymentModal={setShowPaymentModal}
          setCurrentPage={setCurrentPage}
        />;
      default:
        // Fallback to HomePage, ensure props are passed correctly
        return <HomePage 
          courses={courses}
          darkMode={darkMode}
          wishlist={wishlist}
          setCurrentPage={setCurrentPage}
          setSelectedCourse={setSelectedCourse}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />;
    }
  };

  return (
    <div className={`${darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors`} style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        isAuthenticated={isAuthenticated}
        user={user}
        setShowAuthModal={setShowAuthModal}
      />

      {renderPage()}

      <Footer darkMode={darkMode} />

      {/* Modals and Toasts */}
      {showAuthModal && (
        <AuthModal
          darkMode={darkMode}
          authMode={authMode}
          formData={formData}
          isProcessing={isProcessing}
          setShowAuthModal={setShowAuthModal}
          setAuthMode={setAuthMode}
          setFormData={setFormData}
          handleAuth={handleAuth}
          handleSocialAuth={handleSocialAuth}
        />
      )}
      
      {showPaymentModal && (
        <PaymentModal
          darkMode={darkMode}
          cart={cart}
          isProcessing={isProcessing}
          setShowPaymentModal={setShowPaymentModal}
          handlePayment={handlePayment}
        />
      )}

      {showNotification && (
        <NotificationToast
          darkMode={darkMode}
          message={notificationMessage}
        />
      )}
    </div>
  );
};

export default EduStream; // Renamed to match the component name
