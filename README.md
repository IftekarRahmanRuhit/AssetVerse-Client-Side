# AssetVerse

## Description of the Project

**AssetVerse** is a modern solution for businesses to simplify and streamline their asset and employee management. Designed for both HR Managers and Employees, the platform offers a seamless experience for tracking company assets, handling requests, and managing teams. With secure authentication, responsive design, and intuitive navigation, AssetVerse empowers businesses to stay organized and efficient. Whether it’s monitoring returnable items, managing team members, or visualizing data through analytics, AssetVerse provides everything needed for hassle-free asset management in one platform.

---

## Live Demo
[Visit AssetVerse Live Website](https://assetverse-3b487.web.app/)

---
## Server Side Repository
[AssetVerse server side repository](https://github.com/IftekarRahmanRuhit/AssetVerse-Server-Side)

---

## HR Credentials
- **Email:** hr@gmail.com  
- **Password:** Hr123456  

---

## Key Features
- **Dynamic Role-Based Navbar**: Personalized navigation for Employees and HR Managers.  
- **User Authentication**: Secure login and registration system using Firebase Authentication and JWT.  
- **Asset Management**: Add, update, and delete assets with detailed tracking for HR Managers.  
- **Employee Management**: HR Managers can add, remove, and manage employees within their team.  
- **Search and Filter**: Advanced server-side search and filter functionalities for assets and requests.  
- **Real-Time Notifications**: Sweet alerts and toasts for all CRUD operations and authentication.  
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.  
- **Payment Integration**: Subscription-based model for HR Managers to increase team member limits.  
- **Data Visualization**: Charts showcasing asset usage and availability for insightful analytics.  
- **Secure API Requests**: Implemented JWT and Axios interceptors for secure data fetching.  

---

## Technologies Used
### Frontend:
- **React.js**: For dynamic and interactive user interfaces.  
- **React Router**: For seamless navigation.  
- **Tailwind CSS**: Utility-first CSS framework for efficient styling.  
- **DaisyUI**: Pre-built components for responsive and attractive designs.  
- **React Hot Toast**: For real-time toast notifications.  
- **TanStack Query**: For efficient data fetching and caching.  
- **React Icons**: For enhanced UI aesthetics.  
- **React Helmet**: For dynamic document titles and metadata.  
- **React-PDF**: For generating printable asset details.  

### Backend:
- **Node.js**: Scalable backend development.  
- **Express.js**: API and routing framework.  
- **MongoDB**: Database to store user, asset, and request data.  
- **JWT (JSON Web Token)**: For secure authentication and route protection.  
- **Dotenv**: For secure environment variable management.  

### Authentication:
- **Firebase Authentication**: Email/password and Google login support.  

### Payment Integration:
- **Stripe API**: For secure payment processing.  

---

## Key Functionalities
### Pages:
- **Home Page**:
  - Banner with "Join as Employee" and "Join as HR Manager" options.
  - Static About and Packages sections.  
- **Join as Employee**: Registration form with Google social login.  
- **Join as HR Manager**: Registration with payment integration.  
- **Login Page**: Email/password and Google login options.  
- **Profile Page**: Update user profile information.  

### Features:
- **Search and Filter**:
  - Assets: Search by name, filter by type or availability.  
  - Requests: Filter by status and type, with real-time updates.  
- **CRUD Operations**:
  - HR Managers: Manage assets and employees with options to add, update, or delete.  
  - Employees: Request assets, cancel requests, and return returnable assets.  
- **Pagination**: Efficient pagination for all lists with server-side implementation.  
- **Real-Time Analytics**: Visualized insights with pie charts and graphs.  

---

## Dependencies
```json
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/material": "^6.4.0",
    "@mui/styled-engine-sc": "^6.4.0",
    "@mui/toolpad-core": "^0.1.51",
    "@react-pdf/renderer": "^4.1.6",
    "@stripe/react-stripe-js": "^3.1.1",
    "@stripe/stripe-js": "^5.5.0",
    "@tanstack/react-query": "^5.64.1",
    "animate.css": "^4.1.1",
    "axios": "^1.7.9",
    "date-fns": "^4.1.0",
    "firebase": "^11.1.0",
    "localforage": "^1.10.0",
    "lucide-react": "^0.473.0",
    "match-sorter": "^8.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-dropzone": "^14.3.5",
    "react-helmet-async": "^2.0.5",
    "react-hot-toast": "^2.5.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.1",
    "recharts": "^2.15.0",
    "sort-by": "^1.2.0",
    "stripe": "^17.5.0",
    "styled-components": "^6.1.14",
    "sweetalert2": "^11.15.10"
  }
}
```
## Installation Guide

Follow these steps to set up the project locally:

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/your-repository.git

```
### 2. Navigate into the project folder
```sh
cd your-repository
```
### 3. Install Dependencies
```sh
npm install
```
### 4. Set Up Environment Variables
```sh
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_Payment_Gateway_PK=your_stripe_public_key
```
### 5. Run the Application
```sh
npm run dev
```
