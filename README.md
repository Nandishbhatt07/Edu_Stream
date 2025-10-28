## EduStream – Technical Report & Architecture Plan

### 🎯 Project Overview

EduStream is a modern online learning platform designed with a **decoupled, service-oriented architecture**. The goal is to provide a highly performant, scalable, and secure user experience that rivals top-tier e-learning sites.

This project consists of two main parts:

1.  **A Frontend Prototype (Completed):** A visually rich frontend built with **React, TypeScript, and Tailwind CSS**. This prototype (which we just built and deployed) is fully frontend-only, manages state locally, and serves as the User Interface (UI) and User Experience (UX) foundation.
2.  **Full-Stack Target Architecture (The Plan):** The prototype is designed to connect to a robust backend API built with **Laravel** (for business logic and security) and **MongoDB** (for flexible data storage).


-----

### ✅ Features Implemented (Frontend Prototype)

1.  **Modular Page Routing:** A complete Single Page Application (SPA) flow using `useState` as a simple router to navigate between:

      * Home Page
      * Courses Page (with search)
      * Course Detail Page
      * Shopping Cart
      * User Dashboard

2.  **Skillshare-Inspired UI:** A modern, responsive course gallery built with Tailwind CSS, using images and clear hover/focus states, as requested in the reference image.

3.  **Component-Based Library:** A fully modularized frontend with reusable components, including:

      * `Navbar`
      * `Footer`
      * `CourseCard` (with image, price, and stats)
      * `AuthModal` (with real social media icons)
      * `PaymentModal` (multi-step)

4.  **Simulated State Management:** All application state (cart, auth status, current user) is centrally managed within the main `App.tsx` component using React's `useState` and `useContext` (implied).

5.  **Mock Authentication & Payments:** Functional modal flows for Login, Signup, and Checkout that simulate the user journey and demonstrate readiness for backend integration.

-----

### 🏗️ Architecture

#### Tech Stack (Full Platform)

  * **Frontend Framework:** **React 18 (Vite + TypeScript)**
      * *Why?* Component-based architecture for a highly modular and maintainable UI. TypeScript ensures type safety, which is critical for a large-scale application.
  * **Styling:** **Tailwind CSS**
      * *Why?* A utility-first framework for rapid, consistent, and responsive UI development directly in the markup.
  * **Backend API:** **Laravel (PHP)**
      * *Why?* A mature, high-performance framework with exceptional built-in support for secure API routing, authentication (JWT/Sanctum), and task queues.
  * **Database:** **MongoDB**
      * *Why?* A NoSQL, document-based database providing the flexibility needed for course content, user profiles, and complex, nested progress-tracking data that doesn't fit a rigid SQL schema.
  * **Icons:** **Lucide React**
      * *Why?* A lightweight, tree-shakable icon library that keeps the bundle size small.

#### Project Structure (Frontend Prototype)

This is the modular structure we implemented:

```
src/
  ├── App.tsx             # Main component, state, and page router
  ├── index.tsx           # React entry point
  ├── index.css           # Global styles & Tailwind directives
  ├── components/
  │   ├── CourseCard.tsx
  │   ├── Navbar.tsx
  │   ├── Footer.tsx
  │   ├── NotificationToast.tsx
  │   ├── icons/
  │   │   └── SocialIcons.tsx # Google, Github, Apple SVGs
  │   └── modals/
  │       ├── AuthModal.tsx
  │       └── PaymentModal.tsx
  ├── pages/
  │   ├── HomePage.tsx
  │   ├── CoursesPage.tsx
  │   ├── CourseDetailPage.tsx
  │   ├── DashboardPage.tsx
  │   └── CartPage.tsx
  ├── data/
  │   └── courses.ts        # Mock course data with image URLs
  └── types/
      └── index.ts          # Central TypeScript interfaces
```

#### Data Models (TypeScript)

```typescript
// src/types/index.ts

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
  gradient: string; // Used for icon fallback
  icon: LucideIcon;
  imageUrl: string; // For the Skillshare-style card
  enrolled: boolean;
  progress: number;
  modules: number;
  bestseller: boolean;
  language: string;
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
```

-----


### 챌 Key Challenges & Solutions (Full-Stack Plan)

This section addresses the key questions from the original project brief.

#### 🔐 How will you ensure smooth synchronization between frontend and backend states (e.g., cart, authentication)?

State sync will be managed by establishing the **backend as the single source of truth**. The React frontend will use *optimistic updates* for a smooth UX.

1.  **Authentication:**

      * **Login:** React sends credentials to the Laravel API.
      * **Token:** Laravel validates the user and returns a **JSON Web Token (JWT)**.
      * **Storage & Global State:** The JWT is stored in `localStorage`, and a global React Context (or Zustand store) is updated (e.g., `setIsAuthenticated(true)`, `setUser(data)`).
      * **Sync:** Every subsequent API request from React includes this JWT in the `Authorization` header. Laravel validates it to confirm the user's identity for every protected action.

2.  **Cart Synchronization:**

      * **Action:** A user clicks "Add to Cart".
      * **Optimistic UI:** React **immediately** adds the course to its local `cart` state. This makes the UI feel instantaneous.
      * **Async Request:** In the background, an API call is made to the `/api/cart/add` endpoint in Laravel.
      * **Source of Truth:** Laravel adds this item to the user's cart in the MongoDB database.
      * **Rollback:** If the API call fails, the frontend "rolls back" the change and shows an error toast. On any page reload, the cart is always re-fetched from the API.

#### 🛡️ What security measures will you take for user data and payments?

Our strategy is to **never handle sensitive data directly** on our application servers.

  * **User Data:**

      * **Passwords:** All user passwords will be hashed on the backend using **`bcrypt`** (built-in to Laravel). We will never store plain-text passwords.
      * **Transport:** All communication between React and Laravel will be encrypted using **HTTPS (SSL)**.
      * **API:** All API endpoints (e.g., `/api/dashboard`) will be protected by our JWT auth middleware, rejecting any request without a valid token.

  * **Payments (PCI Compliance):**

      * We will **not** process or store any credit card information.
      * We will integrate a trusted, PCI-compliant payment gateway like **Stripe** or **Razorpay**.
      * **Flow:** The user will enter their card details into a secure `iframe` controlled *by the gateway*, not by our app. The gateway returns a one-time-use **payment ID** to our React app. We send this ID to our Laravel backend, which securely completes the charge via a server-to-server API call.

#### 🏃 How will you maintain performance while handling media content and background tasks?

  * **Media Content (Images & Video):**

      * **Image Optimization:** All course images will be served in modern formats like **`.webp`**, compressed, and responsively sized.
      * **Lazy Loading:** Images on the `CoursesPage` will be lazy-loaded so they only download as the user scrolls them into view.
      * **Content Delivery Network (CDN):** All static assets (images, video, and the built JS/CSS files) will be served from a global CDN (like Vercel's Edge Network or AWS S3 + CloudFront).

  * **Background Tasks (Backend):**

      * We will use **Laravel's Queue System**. Long-running tasks like sending a welcome email, processing a video, or generating a PDF certificate will be dispatched as a "job" to a queue (like Redis). The API will respond instantly, and a separate worker process will handle the task in the background, preventing API timeouts.

#### Modular How will you design for scalability and maintainability with reusable components and modular architecture?

The frontend prototype was *explicitly* refactored to achieve this.

  * **Modular Architecture (Frontend):** Our codebase is now fully modular.

      * **`components/`**: Contains "dumb," reusable UI pieces (e.g., `CourseCard`).
      * **`pages/`**: Contains "smart" components that handle data and logic for a specific view.
      * **`types/`**: A single source of truth for our data structures.
        This separation of concerns makes the code easy to navigate, debug, and test.

  * **Reusable Components:** By creating `CourseCard`, we can now change the design of every course card on the site by editing only one file. This is the core of a maintainable design.

  * **Scalable State Management:** The current `useState` in `App.tsx` is perfect for this prototype. As the app grows, the next step is to introduce a dedicated global state manager like **Zustand** (as mentioned in your brief) or **React Context** to manage global state like `isAuthenticated` and `user`, preventing "prop drilling."

-----

### 🛠️ Codebase & Setup

  * **Repository:** `https://github.com/Nandishbhatt07/Edu_Stream.git`
  

#### Local Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Nandishbhatt07/Edu_Stream.git
    cd temp
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm start
    ```
    This will open the app on `http://localhost:3000`.
