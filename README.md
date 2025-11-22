# 📦 StockMaster - Inventory Management System

<div align="center">

![StockMaster Logo](https://img.shields.io/badge/StockMaster-IMS-blue?style=for-the-badge&logo=box&logoColor=white)

**A Modern, Full-Featured Inventory Management System**

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

[Features](#-features) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Demo](#-demo)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [Module Documentation](#-module-documentation)
- [Theme & Design](#-theme--design)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**StockMaster** is a modern, modular Inventory Management System (IMS) designed to digitize and streamline all stock-related operations within a business. Built for hackathons and production use, it replaces manual registers, Excel sheets, and scattered tracking methods with a centralized, real-time, easy-to-use application.

### 🎪 Hackathon Project
This project was built for a hackathon with a focus on:
- ✅ **Perfection & Excellence** in code quality
- ✅ **Modular Architecture** for team collaboration
- ✅ **Professional UI/UX** with dark modern theme
- ✅ **Production-Ready** structure and patterns

### 👥 Target Users
- **Inventory Managers** – Manage incoming & outgoing stock
- **Warehouse Staff** – Perform transfers, picking, shelving, and counting
- **Business Owners** – Monitor operations and generate insights

---

## ✨ Features

### 🔐 Authentication System
- **Login/Signup** with comprehensive validation
  - Username: 6-12 characters
  - Password: Min 8 chars, uppercase, lowercase, special character
- **OTP-based Password Reset** (3-step wizard)
  - Step 1: Enter username & email
  - Step 2: Verify 6-digit OTP with resend functionality
  - Step 3: Set new password with strength indicator
- **Client-side validation** with real-time error feedback
- **Smooth animations** and professional error handling

### 📊 Dashboard & Navigation
- **Dark Modern UI Theme** (Professional, minimal, business-focused)
- **Responsive Navigation Bar** with:
  - Dashboard, Operations, Inventory, Move History
  - Settings dropdown (Warehouses, Locations)
  - User profile icon
  - Active state highlighting
- **Smooth dropdown animations** with click-outside detection

### 🎨 UI/UX Excellence
- **Dark Theme** with gray-900 background, gray-800 cards
- **Smooth Animations**:
  - Page transitions with fade-in
  - Button hover effects with scale
  - Dropdown slide animations
  - Form field focus rings
- **Interactive Elements**:
  - Hover states on all clickable items
  - Active states for current page
  - Loading states (ready for backend)
  - Empty states with helpful messages
- **Form Validation**:
  - Inline error messages
  - Field-level validation
  - Password strength indicator
  - OTP input with auto-focus
- **Responsive Design** for all screen sizes

---

<br>

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5+](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3+](https://tailwindcss.com/)
- **Icons**: SVG (Inline, no external dependencies)
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router with dynamic routes

### Backend (Ready for Integration)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (structure ready)
- **API**: Next.js Server Actions / API Routes (ready)

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Editor**: VS Code (recommended)
- **Linting**: ESLint (Next.js default)

---

## 📁 Project Structure
```
StockMaster/
├── prisma/
│ └── schema.prisma
│
├── public/
│
├── src/
│ ├── app/
│ │ ├── (auth)/
│ │ │ ├── login/page.tsx
│ │ │ ├── signup/page.tsx
│ │ │ └── reset-password/page.tsx
│ │ │
│ │ ├── dashboard/page.tsx
│ │ │
│ │ ├── operations/
│ │ │ └── receipts/
│ │ │ ├── page.tsx
│ │ │ ├── new/page.tsx
│ │ │ └── [id]/page.tsx
│ │ │
│ │ ├── inventory/products/page.tsx
│ │ │
│ │ ├── settings/
│ │ │ ├── page.tsx
│ │ │ ├── warehouse/page.tsx
│ │ │ └── location/page.tsx
│ │ │
│ │ ├── layout.tsx
│ │ └── page.tsx
│ │
│ ├── components/
│ │ ├── dashboard/DashBoardLayout.tsx
│ │ ├── ui/
│ │ └── tables/
│ │
│ ├── lib/
│ │ ├── auth.ts
│ │ ├── db.ts
│ │ └── utils.ts
│ │
│ ├── services/
│ │ ├── stock-ledger.ts
│ │ ├── inventory.ts
│ │ └── alerts.ts
│ │
│ └── types/index.ts
│
├── .env.example
├── .gitignore
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🚀 Getting Started

### **Prerequisites**

| Requirement | Version |
|------------|---------|
| Node.js | 18+ |
| PostgreSQL | Required |
| Git | Optional |

---

### **Installation**

```bash
git clone https://github.com/yourusername/stockmaster.git
cd stockmaster
npm install

Copy environment file:
cp .env.example .env.local

Generate and sync database:
npx prisma generate
npx prisma db push


(Optional, if you have seed script)

npx prisma db seed

Start development server:
npm run dev


➡ Open: http://localhost:3000
```

# 🔧 Environment Variables
```
DATABASE_URL="postgresql://username:password@localhost:5432/stockmaster"
NEXTAUTH_SECRET="your-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```
<br>

# ✨ Core Features
|Module|	Included Functionality|
|---------|-------------|
|Authentication |	Login, signup, reset password, validation |
|Dashboard |	KPIs, real-time stats, card-based layout |
|Operations |	Create/manage receipts, status tracking |
|Inventory |	Product catalog (extendable) |
|Settings |	Warehouse, locations, linking system |
|UI Framework |	Fully reusable dark-theme components |

---

## 🎨 UI Theme

This application uses a Dark Modern Dashboard Theme with:

- Deep navy/charcoal backgrounds

- Soft gray/white typography

- Accent colors (yellow, blue, red) for status and metrics

- Rounded card layouts

- Dashboard-first spacing and visual hierarchy

---

## 🧪 Manual Testing Checklist

- [ ] Login & session validation

- [ ]  Page navigation

- [ ] Receipt creation workflow

- [ ]  Search & filters



--- 


## 🚢 Deployment
**Recommended: Vercel**

1. Connect GitHub repo

2. Add environment variables

3. Deploy

Other supported: Docker, Netlify, Railway.

--- 

## 🤝 Contributing

- Fork the repository

- Create a feature branch

- Commit your changes

- Submit a Pull Request

---

<br>


# 👤 Author

Built with ☕ and late-night debugging energy.