# ⚡ Athletex — Intelligent Sports Career & Athlete Development Platform

> **"Your personalized path from aspiring athlete to competitive athlete."**

**Athletex** is a full-stack sports tech and athlete career guidance platform designed for student athletes, academy prospects, and coaches. It helps athletes evaluate their baseline skill levels across multiple sports, follow structured developmental roadmaps, log biomechanical training telemetry, track bi-weekly performance cycles, discover competition trials, and archive competitive achievements.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      ATHLETEX FRONTEND                      │
│        React 18 • Vite • Tailwind CSS • Lucide Icons        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ REST API (JSON / Bearer JWT)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   NODE.JS + EXPRESS BACKEND                 │
│      JWT Auth • Bcryptjs • Zod • Modular Controllers        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ Prisma ORM
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 POSTGRESQL RELATIONAL DATABASE              │
│       Normalized Schema • Composite Uniqueness Keys         │
│         (USER + SPORT + DIFFICULTY LEVEL DEPENDENCY)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Features

1. **Multi-Sport & Skill Level Progression Engine**:
   - Dynamic telemetry, performance pillars, and historical trajectory curves change seamlessly according to **User + Sport + Difficulty Level**.
   - Supports 8 major athletic disciplines: Football, Cricket, Basketball, Athletics, Volleyball, Badminton, Tennis, and Multi-Sport.
2. **Bi-Weekly Assessment Cycles**:
   - Strict 2-week performance cadence (Cycle 1 to Cycle 4+ and projected points).
   - Core 4 evaluation pillars: *Technical Skill*, *Physical Fitness*, *Sport IQ*, and *Training Consistency*.
3. **Interactive Performance Trajectory**:
   - Zero-dependency SVG telemetry charts with glow indicators, historical curves, and projected milestones.
4. **Secure JWT Authentication & Athlete Passport**:
   - Password hashing with `bcryptjs`, signed JWT access tokens, and protected endpoints.
5. **Competition Hub & Discovery**:
   - Geospatial distance calculation for trials and tournaments, one-click ticket registration, and results archive.

---

## 📁 Repository Structure

```
THE-SIXTH-SENSE/
├── backend/                       # Node.js + Express Backend
│   ├── prisma/
│   │   ├── schema.prisma          # PostgreSQL Prisma ORM Schema
│   │   └── seed.js                # Database Seeder (Sports, Levels, Matrix)
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # Prisma client & connection manager
│   │   │   └── jwt.js             # JWT signer & token verifier
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── sportController.js
│   │   │   ├── athleteController.js
│   │   │   ├── progressController.js
│   │   │   ├── assessmentController.js
│   │   │   └── dashboardController.js
│   │   ├── middleware/
│   │   │   ├── auth.js            # JWT Bearer authentication
│   │   │   ├── errorHandler.js    # Centralized error handler
│   │   │   └── validate.js        # Zod validation middleware
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── sportRoutes.js
│   │   │   ├── athleteRoutes.js
│   │   │   ├── progressRoutes.js
│   │   │   ├── assessmentRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   ├── services/
│   │   │   └── dbService.js       # Dynamic telemetry & database operations
│   │   ├── utils/
│   │   │   └── response.js        # Standardized API responses
│   │   └── server.js              # Express server bootstrap
│   ├── .env                       # Backend environment variables
│   ├── .env.example
│   └── package.json
│
├── src/                           # React + Vite Frontend
│   ├── components/
│   │   ├── layout/                # Navbar, Sidebar, MobileNav
│   │   ├── progress/              # PerformanceTrajectoryChart (SVG)
│   │   └── ui/                    # Reusable UI component library
│   ├── context/
│   │   └── AthleteContext.jsx     # Master state management & API sync
│   ├── data/
│   │   ├── mockData.js            # Mock seeds & sports catalog
│   │   └── progressData.js        # Dynamic progress resolution
│   ├── modules/                   # Teammate extension points
│   │   ├── progress/
│   │   ├── assessment/
│   │   ├── roadmap/
│   │   ├── learning/
│   │   ├── training/
│   │   ├── events/
│   │   └── results/
│   ├── pages/                     # 12 Core application routes
│   ├── services/                  # Frontend REST API Service Layer
│   │   ├── apiClient.js
│   │   ├── authService.js
│   │   ├── athleteService.js
│   │   ├── progressService.js
│   │   ├── assessmentService.js
│   │   └── dashboardService.js
│   └── utils/
├── index.html
├── package.json
└── README.md
```

---

## 🗄️ Database Schema & Relational Models

The database models strictly uphold the **`USER + SPORT + DIFFICULTY LEVEL`** compound uniqueness constraint.

### Core Tables

1. **`users`**:
   - `id` (UUID Primary Key), `name`, `email` (Unique), `password_hash`, `avatar`, `role`, `created_at`, `updated_at`.
2. **`sports`**:
   - `id` (PK, e.g. `'football'`), `name`, `slug` (Unique), `icon`, `color`, `description`, `popular_positions`.
3. **`difficulty_levels`**:
   - `id` (PK: `'Beginner'`, `'Intermediate'`, `'Advanced'`), `name`, `label`, `tagline`, `description`, `rank_order`.
4. **`user_sport_profiles`**:
   - `id` (UUID PK), `user_id` (FK), `sport_id` (FK), `difficulty_level_id` (FK).
   - `position`, `height`, `weight`, `age`, `gender`, `location`, `personal_best`, `training_hours`, `goal`, `readiness`, `bio`, `sports_background`, `strengths`, `focus_areas`.
   - **Constraint**: `@@unique([userId, sportId, difficultyLevelId])`.
5. **`assessment_cycles`**:
   - `id` (PK), `cycle_number`, `title`, `start_date`, `end_date`, `duration_weeks` (2), `status`.
6. **`user_pillar_progress`**:
   - `id` (PK), `user_id` (FK), `sport_id` (FK), `difficulty_level_id` (FK).
   - `pillar_type` (`TECHNICAL_SKILL`, `PHYSICAL_FITNESS`, `SPORT_IQ`, `TRAINING_CONSISTENCY`), `value`, `delta`, `target_value`.
   - **Constraint**: `@@unique([userId, sportId, difficultyLevelId, pillarType])`.
7. **`performance_trajectory_records`**:
   - `id` (PK), `user_id` (FK), `sport_id` (FK), `difficulty_level_id` (FK).
   - `cycle_order`, `label`, `recorded_date`, `score`, `is_current`, `is_projected`.
   - **Constraint**: `@@unique([userId, sportId, difficultyLevelId, cycleOrder])`.
8. **`assessments`**:
   - `id` (PK), `slug` (Unique), `title`, `category`, `description`, `estimated_time`, `badge_category`, `items`.
9. **`user_assessment_results`**:
   - `id` (PK), `user_id` (FK), `sport_id` (FK), `difficulty_level_id` (FK), `assessment_id` (FK), `score`, `status`, `completed_at`.

---

## 🔌 REST API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register new athlete | No |
| `POST` | `/api/auth/login` | Login athlete & retrieve JWT | No |
| `GET` | `/api/auth/me` | Fetch authenticated athlete profile | Yes (Bearer) |
| `POST` | `/api/auth/change-password` | Change password | Yes (Bearer) |
| `POST` | `/api/auth/logout` | Invalidate athlete session | No |

### ⚽ Sports & Difficulty (`/api`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/sports` | List all available sports | No |
| `GET` | `/api/sports/:id` | Get sport details | No |
| `GET` | `/api/difficulties` | List difficulty levels | No |

### 🏃 Athlete Profile (`/api/athlete`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/athlete/profile` | Get active profile (`?sport=X&level=Y`) | Yes (Bearer) |
| `PUT` | `/api/athlete/profile` | Update profile attributes | Yes (Bearer) |
| `POST` | `/api/athlete/switch-sport` | Switch active sport and level | Yes (Bearer) |

### 📈 Progress & Telemetry (`/api/progress`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/progress/telemetry` | Dynamic metrics & 4 pillars (`?sport=X&level=Y`) | Optional |
| `GET` | `/api/progress/trajectory` | Historical & projected time series | Optional |
| `POST` | `/api/progress/snapshot` | Record performance snapshot | Yes (Bearer) |

### 📋 Assessments (`/api/assessments`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/assessments` | Get assessment catalog | No |
| `GET` | `/api/assessments/history` | Get assessment attempts (`?sport=X&level=Y`) | Optional |
| `POST` | `/api/assessments/:slug/submit` | Submit assessment score | Yes (Bearer) |

### 📊 Dashboard (`/api/dashboard`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/dashboard` | Aggregated athlete telemetry | Optional |

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/athletex_db?schema=public"
JWT_SECRET="athletex_jwt_ultra_secure_secret_key_2026"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

---

## 🛠️ Installation & Setup Guide

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **PostgreSQL** (v14 or higher, optional for development in-memory sync mode)

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Push schema to PostgreSQL (if DB is running)
npm run prisma:push

# Seed database with initial sports, levels, demo athlete & telemetry matrix
npm run prisma:seed

# Start backend development server
npm run dev
```

The backend server will run at: `http://localhost:5000`

### 3. Frontend Setup
```bash
# Navigate to workspace root
cd ..

# Install frontend dependencies
npm install

# Start Vite dev server
npm run dev
```

The frontend application will run at: `http://localhost:5173`

---

## 🧪 Demo Credentials

- **Email**: `alex.athlete@athletex.ai`
- **Password**: `password123`
- **Demo Mode**: Click **"Explore Platform Demo"** or **"Demo Athlete Quick Login"** on the Login page for instant one-click access.

---

## 📄 License
College Project Prototype — © 2026 **Athletex**. All rights reserved.
