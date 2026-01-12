# HR Management System

A full-stack **Employee Management System** with Next.js 16 frontend and FastAPI backend connected to Azure SQL Server.

## 🎯 Overview

Enterprise-grade HR Management System for managing employees, clients, projects, and onboarding workflows. Features a modern React frontend with a powerful Python backend API.

## 📁 Project Structure

```
ems/
├── frontend/                # Next.js 16 Frontend Application
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utilities & API client
│   ├── public/             # Static assets
│   └── styles/             # Stylesheets
│
├── backend/                # FastAPI Backend API
│   ├── app/
│   │   ├── api/endpoints/  # API routes
│   │   ├── core/           # Config & security
│   │   ├── models/         # Database models
│   │   └── schemas/        # Pydantic schemas
│   ├── .env                # Database credentials
│   ├── run.py              # Server startup
│   └── init_db.py          # Database initialization
│
├── INTEGRATION_GUIDE.md    # Frontend-Backend integration guide
├── PROJECT_SETUP.md        # Complete setup instructions
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Start the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Initialize database (creates tables + sample data)
python init_db.py

# Start server
python run.py
```

**Backend**: http://localhost:8000
**API Docs**: http://localhost:8000/docs

### 2. Start the Frontend

```bash
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

**Frontend**: http://localhost:3000

### 3. Login

- URL: http://localhost:3000/login
- Email: `admin@company.com`
- Password: `admin123`

## 📊 Features

### Frontend (Next.js 16)
- 🎨 Modern UI with Tailwind CSS & Radix UI
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🔐 JWT authentication integrated
- ⚡ Fast page loads with App Router
- 📋 Form validation with Zod
- 🎭 Smooth animations

### Backend (FastAPI)
- 🔒 JWT authentication & password hashing
- 📦 Full CRUD operations for all entities
- 🗃️ Azure SQL Server integration
- 📝 Automatic API documentation (Swagger UI)
- ✅ Request/response validation with Pydantic
- 🌐 CORS enabled for frontend

### Pages & Features

**Work Management** (`/work-management`)
- Projects management (status, teams, allocation)
- Client relationships
- Project-client tracking

**Onboarding** (`/onboarding`) - **Separate Section**
- New employee onboarding workflows
- Status tracking
- Task management

**Employees** (`/employees`)
- Employee directory
- Skills tracking
- Department management

**Clients** (`/clients`)
- Client information
- Contact management
- Project assignments

**Projects** (`/projects`)
- Project tracking
- Team assignments
- Timeline management

**Reports** (`/reports`)
- Analytics and insights

**Admin** (`/admin/users`)
- User management
- Role-based access

## 🗃️ Database

**Azure SQL Server**
- Server: ems-server.database.windows.net
- Database: Ems_db
- Configured and ready to use

**Tables:**
- `users` - Authentication
- `employees` - Employee records
- `clients` - Client information
- `projects` - Project tracking
- `onboarding` - Onboarding workflows

## 🔌 API Endpoints

All endpoints at: `http://localhost:8000/api`

### Authentication
```
POST /auth/register   - Register new user
POST /auth/login      - Login (get JWT token)
```

### Employees
```
GET    /employees      - List all employees
GET    /employees/{id} - Get employee
POST   /employees      - Create employee
PUT    /employees/{id} - Update employee
DELETE /employees/{id} - Delete employee
```

Similar endpoints for: `clients`, `projects`, `onboarding`, `users`

Full API docs: http://localhost:8000/docs

## 🔐 Authentication

1. Login via `/login` page
2. JWT token stored automatically
3. Token included in all API requests
4. Token expires after 30 minutes

## 📚 Documentation

- **[PROJECT_SETUP.md](PROJECT_SETUP.md)** - Complete setup guide
- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Frontend-Backend integration
- **[frontend/README.md](frontend/README.md)** - Frontend documentation
- **[backend/README.md](backend/README.md)** - Backend API documentation

## 🛠 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Radix UI Components
- React Hook Form + Zod

### Backend
- FastAPI 0.109
- SQLAlchemy 2.0
- Azure SQL Server
- PyODBC
- Python-Jose (JWT)
- Passlib (bcrypt)

## 📝 Important Notes

### Work Management vs Onboarding

**Work Management** (`/work-management`):
- Contains: **Projects** and **Clients** tabs only
- Purpose: Project tracking and client management

**Onboarding** (`/onboarding`):
- **Completely separate** menu item and pages
- Purpose: New employee onboarding workflows
- Pages: `/onboarding/status` and `/onboarding/new`

These are two distinct features and should not be confused!

## 🎯 Integration Status

- ✅ Backend API fully implemented
- ✅ Database connected to Azure SQL Server
- ✅ Login page integrated with backend
- ✅ API client library created
- 🔄 Other pages ready for integration

See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for step-by-step instructions.

## 🔄 Development Workflow

```bash
# Terminal 1 - Backend
cd backend
venv\Scripts\activate
python run.py

# Terminal 2 - Frontend
cd frontend
pnpm dev
```

## 🐛 Troubleshooting

### Database Connection Issues
- Check Azure SQL Server firewall rules
- Verify credentials in `backend/.env`
- Ensure ODBC Driver 17 is installed

### Frontend API Errors
- Confirm backend is running on port 8000
- Check `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
- Verify you're logged in (check localStorage for authToken)

### Module Not Found Errors
- Frontend: Run `cd frontend && pnpm install`
- Backend: Run `cd backend && pip install -r requirements.txt`

## 📞 Default Credentials

```
Email: admin@company.com
Password: admin123
```

⚠️ **Change this in production!**

## 🤝 Contributing

1. Frontend changes: Work in `frontend/` directory
2. Backend changes: Work in `backend/` directory
3. Update relevant documentation

## 📄 License

Proprietary - DataFactz EMS System

---

**Quick Links:**
- 🚀 [Setup Guide](PROJECT_SETUP.md)
- 🔌 [Integration Guide](INTEGRATION_GUIDE.md)
- 💻 [Frontend Docs](frontend/README.md)
- 🔧 [Backend Docs](backend/README.md)
- 📊 [API Docs](http://localhost:8000/docs) (when server is running)
