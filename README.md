# AssetVerse

## Description of the Project

**AssetVerse** is a modern solution for businesses to simplify and streamline their asset and employee management. Designed for both HR Managers and Employees, the platform offers a seamless experience for tracking company assets, handling requests, and managing teams. With secure authentication, responsive design, and intuitive navigation, AssetVerse empowers businesses to stay organized and efficient. Whether it’s monitoring returnable items, managing team members, or visualizing data through analytics, AssetVerse provides everything needed for hassle-free asset management in one platform.

---

## Live Demo
[Visit AssetVerse Live Website](https://assetverse-3b487.web.app/)

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

