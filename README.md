# AssetVerse 🏢

<div align="center">

![AssetVerse Logo](https://img.shields.io/badge/AssetVerse-Platform-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase)

**A comprehensive asset management platform for modern businesses**

[Live Demo](https://assetverse-3b487.web.app/) • [Server Repository](https://github.com/IftekarRahmanRuhit/AssetVerse-Server-Side) • [Report Bug](https://github.com/IftekarRahmanRuhit/AssetVerse-Client-Side/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [✨ Features](#-features)
- [🚀 Live Demo](#-live-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [📱 Screenshots](#-screenshots)
- [🏗️ Architecture](#️-architecture)
- [👥 User Roles](#-user-roles)
- [🔐 Authentication](#-authentication)
- [💳 Payment Integration](#-payment-integration)
- [📊 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## Overview

**AssetVerse** is a modern, full-stack asset management platform designed to streamline business operations through comprehensive asset tracking, employee management, and request handling. Built with React.js and Node.js, it provides a seamless experience for both HR managers and employees to manage company assets efficiently.

### 🎯 Key Benefits

- **Centralized Asset Management**: Track all company assets in one unified platform
- **Role-Based Access Control**: Different interfaces for HR managers and employees
- **Real-Time Tracking**: Monitor asset status, requests, and availability instantly
- **Automated Workflows**: Streamlined request approval and asset assignment processes
- **Analytics & Reporting**: Data-driven insights for better decision making
- **Mobile Responsive**: Access from any device with optimized UI/UX

---

## ✨ Features

### 🔐 Authentication & Security
- **Multi-Provider Authentication**: Firebase Auth with email/password and Google OAuth
- **JWT Token Management**: Secure API communication with token-based authentication
- **Role-Based Authorization**: HR and Employee-specific access controls
- **Protected Routes**: Secure navigation with route guards

### 📊 Dashboard & Analytics
- **Interactive Charts**: Visual data representation using Recharts
- **Real-Time Statistics**: Asset usage, request status, and team metrics
- **Customizable Widgets**: Personalized dashboard components
- **Export Capabilities**: PDF generation for asset reports

### 🏢 HR Management Features
- **Asset Lifecycle Management**: Add, edit, delete, and track asset status
- **Employee Management**: Add employees, assign roles, and manage teams
- **Request Processing**: Approve, reject, and manage asset requests
- **Team Analytics**: Monitor team performance and asset utilization
- **Subscription Management**: Handle payment plans and team limits

### 👤 Employee Features
- **Asset Requests**: Submit and track asset requests
- **Personal Asset Inventory**: View assigned assets and their status
- **Team Collaboration**: View team members and shared resources
- **Return Management**: Handle returnable assets efficiently
- **Request History**: Track all past requests and their status

### 🔍 Search & Filter
- **Advanced Search**: Server-side search across assets and requests
- **Multi-Filter Options**: Filter by type, status, date, and availability
- **Pagination**: Efficient data loading with server-side pagination
- **Sort Functionality**: Sort by various criteria for better organization

### 💳 Payment Integration
- **Stripe Payment Gateway**: Secure payment processing
- **Subscription Plans**: Flexible pricing tiers for different team sizes
- **Payment History**: Track all transactions and billing information
- **Automatic Billing**: Recurring payment management

---

## 🚀 Live Demo

**Experience AssetVerse in action:**

🌐 **Live Website**: [https://assetverse-3b487.web.app/](https://assetverse-3b487.web.app/)

### Demo Credentials

**HR Manager Account:**
- Email: `hr@gmail.com`
- Password: `Hr123456`

**Employee Account:**
- Create a new account through the registration process

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | 18.3.1 | UI Framework |
| **React Router** | 7.1.1 | Client-side routing |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS |
| **DaisyUI** | 4.12.23 | Component library |
| **TanStack Query** | 5.64.1 | Data fetching & caching |
| **React Hot Toast** | 2.5.1 | Notifications |
| **Recharts** | 2.15.0 | Data visualization |
| **React PDF** | 4.1.6 | PDF generation |
| **React Helmet** | 2.0.5 | Document head management |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express.js** | Latest | Web framework |
| **MongoDB** | Latest | Database |
| **JWT** | Latest | Authentication |
| **Mongoose** | Latest | ODM for MongoDB |

### Authentication & Payments
| Service | Purpose |
|---------|---------|
| **Firebase Auth** | User authentication |
| **Stripe** | Payment processing |
| **JWT** | API security |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Vite** | Build tool & dev server |
| **ESLint** | Code linting |
| **PostCSS** | CSS processing |
| **Autoprefixer** | CSS vendor prefixes |

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB database
- Firebase project
- Stripe account

### Step 1: Clone the Repository
```bash
git clone https://github.com/IftekarRahmanRuhit/AssetVerse-Client-Side.git
cd AssetVerse-Client-Side
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

# Image Upload
VITE_IMGBB_API_KEY=your_imgbb_api_key

# Payment Gateway
VITE_Payment_Gateway_PK=your_stripe_public_key

# API Base URL
VITE_API_URL=your_backend_api_url
```

### Step 4: Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 5: Build for Production
```bash
npm run build
```

---

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication (Email/Password & Google)
3. Copy configuration to environment variables

### Stripe Setup
1. Create a Stripe account
2. Get API keys from dashboard
3. Configure webhook endpoints

### MongoDB Setup
1. Create MongoDB Atlas cluster
2. Set up database connection
3. Configure environment variables

---

## 📱 Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/9538E2/FFFFFF?text=Dashboard+Overview)

### Asset Management
![Asset Management](https://via.placeholder.com/800x400/47A248/FFFFFF?text=Asset+Management)

### Request Processing
![Request Processing](https://via.placeholder.com/800x400/FFCA28/000000?text=Request+Processing)

---

## 🏗️ Architecture

```
AssetVerse/
├── src/
│   ├── Components/          # Reusable UI components
│   ├── Pages/              # Page components
│   │   ├── Authentication/ # Login/Register pages
│   │   ├── Dashboard/      # Main dashboard
│   │   ├── EmployeePages/  # Employee-specific pages
│   │   └── HrPages/        # HR-specific pages
│   ├── Hooks/              # Custom React hooks
│   ├── Provider/           # Context providers
│   ├── Routes/             # Routing configuration
│   ├── Firebase/           # Firebase configuration
│   └── Shared/             # Shared components
├── public/                 # Static assets
└── package.json           # Dependencies
```

---

## 👥 User Roles

### HR Manager
- **Asset Management**: Add, edit, delete company assets
- **Employee Management**: Add and manage team members
- **Request Processing**: Approve/reject asset requests
- **Analytics**: View team and asset analytics
- **Payment Management**: Handle subscription plans

### Employee
- **Asset Requests**: Submit requests for assets
- **Asset Tracking**: View assigned assets
- **Team View**: See team members and shared resources
- **Request History**: Track request status
- **Profile Management**: Update personal information

---

## 🔐 Authentication

### Authentication Flow
1. **Registration**: Users can register as HR or Employee
2. **Login**: Email/password or Google OAuth
3. **Role Verification**: System assigns appropriate permissions
4. **Token Management**: JWT tokens for API access
5. **Session Management**: Persistent login sessions

### Security Features
- Password hashing and validation
- JWT token expiration
- Protected route guards
- Role-based access control
- Secure API communication

---

## 💳 Payment Integration

### Stripe Integration
- **Secure Payments**: PCI-compliant payment processing
- **Subscription Plans**: Monthly/yearly billing cycles
- **Payment History**: Complete transaction records
- **Webhook Handling**: Real-time payment notifications

### Pricing Tiers
- **Basic Plan**: Up to 10 team members
- **Professional Plan**: Up to 50 team members
- **Enterprise Plan**: Unlimited team members

---

## 📊 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/verify
```

### Assets
```
GET    /api/assets
POST   /api/assets
PUT    /api/assets/:id
DELETE /api/assets/:id
GET    /api/assets/search
```

### Requests
```
GET    /api/requests
POST   /api/requests
PUT    /api/requests/:id
DELETE /api/requests/:id
```

### Users
```
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Email**: support@assetverse.com
- **Documentation**: [docs.assetverse.com](https://docs.assetverse.com)
- **Issues**: [GitHub Issues](https://github.com/IftekarRahmanRuhit/AssetVerse-Client-Side/issues)

---

<div align="center">

**Made with ❤️ by Iftekar Rahman Ruhit**

[![GitHub stars](https://img.shields.io/github/stars/IftekarRahmanRuhit/AssetVerse-Client-Side?style=social)](https://github.com/IftekarRahmanRuhit/AssetVerse-Client-Side/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/IftekarRahmanRuhit/AssetVerse-Client-Side?style=social)](https://github.com/IftekarRahmanRuhit/AssetVerse-Client-Side/network)
[![GitHub issues](https://img.shields.io/github/issues/IftekarRahmanRuhit/AssetVerse-Client-Side)](https://github.com/IftekarRahmanRuhit/AssetVerse-Client-Side/issues)

</div>
