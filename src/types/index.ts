import { LucideIcon } from 'lucide-react';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  students: number;
  price: number;
  originalPrice: number;
  duration: string;
  level: string;
  category: string;
  gradient: string;
  icon: LucideIcon;
  imageUrl: string; // ✨ ADDED: For the Skillshare-style card
  enrolled: boolean;
  progress: number;
  modules: number;
  bestseller: boolean;
  language: string;
  lastUpdated?: string;
  lastAccessed?: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  coursesCompleted: number;
  hoursLearned: number;
  certificates: number;
}
