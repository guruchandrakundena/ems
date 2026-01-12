# HR Management System - Complete Setup Guide

A full-stack HR Management System with **Next.js 16 frontend** and **FastAPI backend** connected to **Azure SQL Server**.

## 🎯 What's Been Built

### ✅ Backend (FastAPI + Azure SQL Server)
- Complete REST API with all CRUD operations
- JWT authentication with secure password hashing
- Database models for:
  - Users (authentication)
  - Employees
  - Clients
  - Projects
  - Onboarding records
- Automatic API documentation (Swagger UI)
- CORS configured for frontend integration

### ✅ Frontend (Next.js 16 + React 19)
- Modern UI with Tailwind CSS and Radix UI components
- API client library for easy backend integration
- Login page integrated with backend authentication
- Responsive design with dark mode support
- Pages for: Employees, Clients, Projects, Onboarding, Reports, Settings

## 📁 Project Structure

```
ems/
├── frontend/                   # Next.js Frontend Application
│   ├── app/                   # Next.js App Router
│   │   ├── login/            # Login page (✅ API integrated)
│   │   ├── employees/        # Employee management
│   │   ├── clients/          # Client management
│   │   ├── projects/         # Project management
│   │   ├── onboarding/       # Onboarding workflows (separate from work-management)
│   │   ├── work-management/  # Projects & Clients tabs
│   │   ├── reports/          # Reports and analytics
│   │   └── settings/         # Settings
│   ├── components/           # React components
│   ├── lib/
│   │   └── api-client.ts    # API client library (✅ Ready to use)
│   ├── public/              # Static assets
│   ├── styles/              # Stylesheets
│   ├── .env.local           # Frontend environment variables
│   ├── package.json         # Dependencies
│   └── README.md            # Frontend documentation
│
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── api/
│   │   │   └── endpoints/     # API route handlers
│   │   ├── core/              # Config, security, dependencies
│   │   ├── db/                # Database connection
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   └── main.py            # FastAPI app
│   ├── .env                   # Database credentials (configured)
│   ├── requirements.txt       # Python dependencies
│   ├── run.py                 # Server startup script
│   ├── init_db.py            # Database initialization
│   └── README.md             # Backend documentation
│
├── INTEGRATION_GUIDE.md      # Step-by-step integration guide
├── PROJECT_SETUP.md          # This file
└── README.md                 # Main documentation
```

## 🚀 Quick Start

### Prerequisites

1. **Python 3.8+** installed
2. **Node.js 18+** and **pnpm** installed
3. **ODBC Driver 17 for SQL Server** installed
   - Download: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server

### Step 1: Start the Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database (creates tables and sample data)
python init_db.py

# Start the backend server
python run.py
```

✅ Backend will be running at: **http://localhost:8000**
- API Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Step 2: Start the Frontend

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
pnpm install

# Start the development server
pnpm dev
```

✅ Frontend will be running at: **http://localhost:3000**

### Step 3: Test the Connection

1. Navigate to http://localhost:3000/login
2. Login with default credentials:
   - **Email**: `admin@company.com`
   - **Password**: `admin123`
3. You should be redirected to the dashboard!

## 🔑 Default Credentials

After running `python init_db.py`, you can login with:

```
Email: admin@company.com
Password: admin123
```

⚠️ **Important**: Change this password after first login!

## 📊 Database Configuration

Your Azure SQL Server is already configured:

```
Server: ems-server.database.windows.net
Database: Ems_db
Username: Dfzems
Password: Datafactz@99
Port: 1433
```

Credentials are stored in:
- Backend: `backend/.env`
- Frontend: `.env.local` (for API URL)

## 🔌 API Endpoints

All endpoints require authentication (except login/register).

### Authentication
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login and get JWT token
```

### Employees
```
GET    /api/employees      - Get all employees
GET    /api/employees/{id} - Get employee by ID
POST   /api/employees      - Create employee
PUT    /api/employees/{id} - Update employee
DELETE /api/employees/{id} - Delete employee
```

### Clients, Projects, Onboarding, Users
Similar CRUD operations available for all entities.

See full API documentation at: http://localhost:8000/docs

## 💻 Using the API Client

The frontend includes a ready-to-use API client at `lib/api-client.ts`.

### Example: Fetching Employees

```typescript
import { employeeApi } from "@/lib/api-client"

// In your component
const [employees, setEmployees] = useState([])

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await employeeApi.getAll()
      setEmployees(data)
    } catch (error) {
      console.error("Failed to fetch employees:", error)
    }
  }
  fetchData()
}, [])
```

### Example: Creating an Employee

```typescript
import { employeeApi } from "@/lib/api-client"

const handleCreate = async (employeeData) => {
  try {
    await employeeApi.create({
      name: "John Doe",
      email: "john@company.com",
      phone: "+1 234-567-8900",
      role: "Developer",
      department: "Engineering",
      type: "Full-Time",
      location: "Onshore",
      status: "Active",
      skills: "React,Node.js",
      join_date: "2024-01-15",
      manager: "Jane Smith"
    })
    console.log("Employee created successfully!")
  } catch (error) {
    console.error("Failed to create employee:", error)
  }
}
```

See `INTEGRATION_GUIDE.md` for detailed examples.

## 📝 Sample Data

After running `init_db.py`, the database includes:

- **1 Admin User**: admin@company.com
- **3 Sample Employees**: John Smith, Sarah Johnson, Mike Chen
- **2 Sample Clients**: Acme Corporation, FinanceFirst
- **2 Sample Projects**: E-Commerce Platform, Mobile Banking App

## 🔄 Next Steps

### 1. Update Frontend Pages to Use API

The login page is already integrated. Update other pages:

- ✅ `app/login/page.tsx` - Done!
- 🔄 `app/employees/page.tsx` - Replace mock data with `employeeApi.getAll()`
- 🔄 `app/clients/page.tsx` - Replace mock data with `clientApi.getAll()`
- 🔄 `app/projects/page.tsx` - Replace mock data with `projectApi.getAll()`
- 🔄 `app/onboarding/new/page.tsx` - Use `onboardingApi.create()`
- 🔄 `app/onboarding/status/page.tsx` - Use `onboardingApi.getAll()`

See `INTEGRATION_GUIDE.md` for step-by-step instructions with code examples.

### 2. Add Features

- Toast notifications for success/error messages
- Loading states and skeletons
- Form validation
- Search and filtering
- Pagination
- File upload for employee documents
- Report generation

### 3. Security Enhancements

- Change default admin password
- Generate new SECRET_KEY for production
- Set up proper user roles and permissions
- Add rate limiting
- Enable HTTPS in production

## 🛠 Troubleshooting

### Backend Won't Start

**Error**: ODBC Driver not found
```
Solution: Install ODBC Driver 17 for SQL Server
https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
```

**Error**: Database connection failed
```
Solution:
1. Check Azure SQL Server firewall allows your IP
2. Verify credentials in backend/.env
3. Test connection using Azure Data Studio or SSMS
```

### Frontend API Calls Failing

**Error**: CORS error
```
Solution:
1. Make sure backend is running on port 8000
2. Check .env.local has: NEXT_PUBLIC_API_URL=http://localhost:8000/api
3. Backend CORS is already configured for localhost:3000
```

**Error**: 401 Unauthorized
```
Solution:
1. Make sure you're logged in
2. Check localStorage has authToken: localStorage.getItem("authToken")
3. Token expires after 30 minutes - login again
```

**Error**: Module not found '@/lib/api-client'
```
Solution:
File is at lib/api-client.ts. Check tsconfig.json has path aliases:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 📚 Documentation

- **Backend API**: http://localhost:8000/docs (when running)
- **Backend README**: `backend/README.md`
- **Integration Guide**: `INTEGRATION_GUIDE.md`
- **This Guide**: `PROJECT_SETUP.md`

## 🎨 Tech Stack

### Backend
- **Framework**: FastAPI 0.109.0
- **Database**: Azure SQL Server (via SQLAlchemy 2.0.25)
- **Authentication**: JWT (python-jose)
- **Password Hashing**: bcrypt (passlib)
- **Server**: Uvicorn

### Frontend
- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the API documentation at http://localhost:8000/docs
3. Check backend logs for error messages
4. Check browser console for frontend errors

## 🎉 What's Working

✅ Complete backend API with all CRUD operations
✅ Database connected to Azure SQL Server
✅ JWT authentication implemented
✅ API client library created
✅ Login page integrated with backend
✅ Sample data in database
✅ Automatic API documentation
✅ CORS configured
✅ Environment variables set up

## 📋 What's Next

The foundation is complete! Now you can:

1. Update remaining frontend pages to fetch from API (see INTEGRATION_GUIDE.md)
2. Add loading states and error handling
3. Implement create/edit/delete functionality in the UI
4. Add toast notifications
5. Customize the UI and add more features

---

**Happy Coding! 🚀**

If you need help integrating specific pages, refer to `INTEGRATION_GUIDE.md` for detailed examples.
