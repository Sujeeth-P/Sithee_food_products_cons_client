
<<<<<<< HEAD
=======
A modern e-commerce web application for traditional South Indian food products built with React.js frontend and Node.js backend.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

Sithee Food Products is a full-stack e-commerce platform specializing in premium South Indian food products including flours, spices, and traditional ingredients. The platform features a modern customer interface for shopping and order management.

## ✨ Features

### 🛒 Customer Features
- **Product Catalog**: Browse premium South Indian food products
- **Shopping Cart**: Add/remove products with quantity management
- **Product Search & Filter**: Find products by category and search terms
- **Responsive Design**: Mobile-friendly interface
- **User Authentication**: Login/register functionality
- **Contact Forms**: Get in touch with inquiries

## 🛠 Tech Stack

### Frontend
- **React.js** - User interface framework
- **React Router** - Navigation and routing
- **CSS3** - Styling with modern animations
- **Bootstrap Icons** - Professional icon set
- **Context API** - State management

## 📁 Project Structure

```
sithee-cons/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── pages/         # Page Components (Home, Products, Cart, etc.)
│   │   ├── css/           # Component Styles
│   ├── context/           # React Context (Cart, Auth)
│   ├── services/          # API Service Helpers
│   ├── assets/            # Static Assets
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Sithee food masala(cons)/projvite/sithee-cons"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

## 📱 Usage

### Customer Interface
1. **Browse Products**: Visit `http://localhost:5173/` to browse products
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in the header
4. **Place Order**: Proceed through the checkout process
5. **Contact**: Use the contact form for inquiries

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

# Sithee Food Products - Consumer App

## Overview
The Sithee Consumer App is a React-based frontend for customers to browse, order, and manage Sithee Food Masala products. It features a modern UI, shopping cart, authentication, and order tracking.

## Features
- Product catalog with categories
- Add to cart and checkout
- User authentication (login/signup)
- Order history and tracking
- Contact and support
- Responsive design

## Tech Stack
- React.js (Vite)
- Context API (state management)
- Axios (API requests)
- CSS Modules

## Getting Started
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Access the app at `http://localhost:5174/`

---
>>>>>>> 395609b (Updated readme file)
