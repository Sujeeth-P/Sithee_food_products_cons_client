
# 🌾 Sithee Food Products - Premium Quality Traditional Taste

A modern e-commerce web application for traditional South Indian food products built with React.js frontend and Node.js backend.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Admin Dashboard](#admin-dashboard)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

Sithee Food Products is a full-stack e-commerce platform specializing in premium South Indian food products including flours, spices, and traditional ingredients. The platform features a modern customer interface and a comprehensive admin dashboard for business management.

## ✨ Features

### 🛒 Customer Features
- **Product Catalog**: Browse premium South Indian food products
- **Shopping Cart**: Add/remove products with quantity management
- **Product Search & Filter**: Find products by category and search terms
- **Responsive Design**: Mobile-friendly interface
- **User Authentication**: Login/register functionality
- **Contact Forms**: Get in touch with inquiries

### 🔧 Admin Features
- **Admin Dashboard**: Comprehensive overview with statistics
- **Product Management**: CRUD operations for products
- **Order Management**: Track and manage customer orders
- **Inquiry Management**: Handle customer inquiries
- **User Management**: Manage customer accounts
- **Analytics**: Business insights and reporting

## 🛠 Tech Stack

### Frontend
- **React.js** - User interface framework
- **React Router** - Navigation and routing
- **CSS3** - Styling with modern animations
- **Bootstrap Icons** - Professional icon set
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

## 📁 Project Structure

```
Sithee food masala(cons)/
│
├── projvite/
│   ├── sithee-cons/                    # Frontend React Application
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   └── favicon.ico
│   │   │
│   │   ├── src/
│   │   │   ├── components/             # Reusable Components
│   │   │   │   ├── pages/              # Page Components
│   │   │   │   │   ├── Header.jsx
│   │   │   │   │   ├── Footer.jsx
│   │   │   │   │   ├── Home.jsx
│   │   │   │   │   ├── Products.jsx
│   │   │   │   │   ├── Cart.jsx
│   │   │   │   │   ├── Contact.jsx
│   │   │   │   │   ├── Quality.jsx
│   │   │   │   │   ├── Wholesale.jsx
│   │   │   │   │   ├── Recipes.jsx
│   │   │   │   │   └── AdminLogin.jsx
│   │   │   │   │   └── AdminDashboard.jsx
│   │   │   │   │
│   │   │   │   ├── css/                # Component Styles
│   │   │   │   │   ├── Header.css
│   │   │   │   │   ├── Footer.css
│   │   │   │   │   ├── Home.css
│   │   │   │   │   ├── Products.css
│   │   │   │   │   ├── Cart.css
│   │   │   │   │   ├── Contact.css
│   │   │   │   │   ├── Quality.css
│   │   │   │   │   ├── Wholesale.css
│   │   │   │   │   ├── Recipes.css
│   │   │   │   │   └── AdminDashboard.css
│   │   │   │   │
│   │   │   │   ├── AdminLayout.jsx     # Admin Layout Component
│   │   │   │   ├── AdminProducts.jsx   # Admin Product Management
│   │   │   │   ├── AdminOrders.jsx     # Admin Order Management
│   │   │   │   ├── AdminInquiries.jsx  # Admin Inquiry Management
│   │   │   │   ├── AdminWelcome.jsx    # Admin Dashboard Home
│   │   │   │   ├── ProtectedRoute.jsx  # Route Protection
│   │   │   │   └── AdminRoute.jsx      # Admin Route Protection
│   │   │   │
│   │   │   ├── context/                # React Context
│   │   │   │   ├── CartContext.jsx     # Shopping Cart State
│   │   │   │   └── AuthContext.jsx     # Authentication State
│   │   │   │
│   │   │   ├── data/                   # Static Data
│   │   │   │   └── productsData.js     # Product Categories & Data
│   │   │   │
│   │   │   ├── pages/                  # Additional Pages
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   └── ProfilePage.jsx
│   │   │   │
│   │   │   ├── App.jsx                 # Main App Component
│   │   │   ├── App.css                 # Global Styles
│   │   │   └── main.jsx                # App Entry Point
│   │   │
│   │   ├── package.json                # Frontend Dependencies
│   │   └── vite.config.js              # Vite Configuration
│   │
│   └── backend/                        # Backend API Server
│       ├── config/
│       │   └── db.js                   # Database Configuration
│       │
│       ├── controllers/                # Route Controllers
│       │   ├── adminController.js      # Admin Operations
│       │   ├── authController.js       # Authentication
│       │   ├── productController.js    # Product Operations
│       │   └── userController.js       # User Operations
│       │
│       ├── middleware/                 # Custom Middleware
│       │   ├── auth.js                 # Authentication Middleware
│       │   └── admin.js                # Admin Authorization
│       │
│       ├── models/                     # Database Models
│       │   ├── User.js                 # User Schema
│       │   ├── Product.js              # Product Schema
│       │   ├── Order.js                # Order Schema
│       │   └── Inquiry.js              # Inquiry Schema
│       │
│       ├── routes/                     # API Routes
│       │   ├── adminRoutes.js          # Admin API Endpoints
│       │   ├── authRoutes.js           # Authentication Routes
│       │   ├── productRoutes.js        # Product Routes
│       │   └── userRoutes.js           # User Routes
│       │
│       ├── uploads/                    # File Upload Directory
│       │   └── products/               # Product Images
│       │
│       ├── .env                        # Environment Variables
│       ├── package.json                # Backend Dependencies
│       └── server.js                   # Server Entry Point
│
└── README.md                           # Project Documentation
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Sithee food masala(cons)/projvite"
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../sithee-cons

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📱 Usage

### Customer Interface
1. **Browse Products**: Visit `http://localhost:5173/` to browse products
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in the header
4. **Place Order**: Proceed through the checkout process
5. **Contact**: Use the contact form for inquiries

### Admin Interface
1. **Admin Login**: Navigate to `http://localhost:5173/admin/login`
2. **Dashboard**: View business statistics and quick actions
3. **Manage Products**: Add, edit, or delete products
4. **View Orders**: Track and manage customer orders
5. **Handle Inquiries**: Respond to customer inquiries

## 🔧 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    # Register new user
POST /api/auth/login       # User login
POST /api/auth/logout      # User logout
GET  /api/auth/profile     # Get user profile
```

### Product Endpoints
```
GET    /api/products       # Get all products
GET    /api/products/:id   # Get single product
POST   /api/products       # Create product (Admin)
PUT    /api/products/:id   # Update product (Admin)
DELETE /api/products/:id   # Delete product (Admin)
```

### Admin Endpoints
```
POST /api/admin/login      # Admin login
GET  /api/admin/stats      # Dashboard statistics
GET  /api/admin/orders     # Get all orders
PUT  /api/admin/orders/:id # Update order status
GET  /api/admin/inquiries  # Get all inquiries
```

## 🛡 Admin Dashboard

### Access Credentials
- **URL**: `http://localhost:5173/admin/login`
- **Default Admin**: Create admin user through registration with role: 'admin'

### Features
- **📊 Dashboard Overview**: Real-time statistics and metrics
- **📦 Product Management**: Complete CRUD operations
- **📋 Order Tracking**: Monitor and update order status
- **📩 Inquiry Management**: Handle customer communications
- **👥 User Management**: View and manage customer accounts

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sithee-foods
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
ADMIN_EMAIL=admin@sitheefoods.com
ADMIN_PASSWORD=admin123
```

## 🎨 Key Features Implementation

### 🛒 Shopping Cart
- **Persistent Storage**: Uses localStorage for cart persistence
- **Dynamic Updates**: Real-time cart count and total calculation
- **Quantity Management**: Increase/decrease item quantities

### 🔍 Product Search & Filter
- **Category Filtering**: Filter by product categories
- **Search Functionality**: Real-time product search
- **Responsive Grid**: Adaptive product layout

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Adaptive Layout**: Responsive grid and navigation
- **Touch-Friendly**: Mobile-optimized interactions

### 🔐 Authentication System
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Customer and admin role separation
- **Protected Routes**: Secured admin and user areas

## 🚧 Development Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
npm run dev          # Start with nodemon
npm start            # Start production server
npm run seed         # Seed database with sample data
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and inquiries:
- **Email**: support@sitheefoods.com
- **Phone**: +91 XXXXX XXXXX
- **Website**: [www.sitheefoods.com](http://www.sitheefoods.com)

## 🏆 Acknowledgments

- React.js community for excellent documentation
- Bootstrap for responsive design components
- MongoDB for flexible database solutions
- All contributors and testers

---

**Built with ❤️ for traditional South Indian food lovers**
