# Project Structure Overview

## 📂 New Folder Organization

The project has been reorganized for better clarity and maintainability:

```
ems/
├── frontend/          # All Next.js frontend code
├── backend/           # All FastAPI backend code
└── docs/             # Documentation files
```

## 🎯 Frontend Structure

**Location**: `frontend/`

All Next.js application code is now contained in the `frontend` folder:

```
frontend/
├── app/              # Next.js App Router pages
│   ├── admin/       # Admin pages
│   ├── clients/     # Client management
│   ├── employees/   # Employee management
│   ├── login/       # Authentication
│   ├── onboarding/  # ⭐ SEPARATE Onboarding section
│   ├── projects/    # Project tracking
│   ├── reports/     # Reports
│   ├── settings/    # Settings
│   └── work-management/ # Projects & Clients tabs only
├── components/      # React components
├── lib/            # Utilities & API client
├── public/         # Static assets
├── styles/         # Stylesheets
└── package.json    # Dependencies
```

### Working with Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🔧 Backend Structure

**Location**: `backend/`

All FastAPI backend code:

```
backend/
├── app/
│   ├── api/endpoints/   # API routes
│   ├── core/            # Config & security
│   ├── models/          # Database models
│   └── schemas/         # Validation schemas
├── .env                 # Database credentials
├── run.py               # Start server
└── init_db.py          # Initialize database
```

### Working with Backend

```bash
# Navigate to backend
cd backend

# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Start server
python run.py
```

## ⭐ Important: Work Management vs Onboarding

### Work Management (`/work-management`)

**Location**: `frontend/app/work-management/page.tsx`

**Contains**:
- ✅ Projects Tab - Project tracking, status, teams
- ✅ Clients Tab - Client management, contacts

**Navigation**: Sidebar → "Work Management" (icon: FolderKanban)

**Purpose**: Manage projects and client relationships

---

### Onboarding (`/onboarding`)

**Location**: `frontend/app/onboarding/`

**Contains**:
- ✅ `/onboarding/status` - View all onboarding records
- ✅ `/onboarding/new` - Create new onboarding record

**Navigation**: Sidebar → "Onboarding" (icon: UserPlus)

**Purpose**: New employee onboarding workflows

---

### Key Differences

| Feature | Work Management | Onboarding |
|---------|----------------|------------|
| **Focus** | Projects & Clients | New Employee Onboarding |
| **URL** | `/work-management` | `/onboarding/*` |
| **Sidebar Item** | "Work Management" | "Onboarding" (separate) |
| **Icon** | FolderKanban (📁) | UserPlus (👤+) |
| **Contains** | Projects & Clients tabs | Status & New pages |
| **Related to** | Project delivery | HR processes |

**These are completely separate features!**

## 📝 Sidebar Navigation

The application sidebar (`frontend/components/sidebar.tsx`) clearly separates all features:

```typescript
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Employees", href: "/employees" },
  { icon: FolderKanban, label: "Work Management", href: "/work-management" },  // Projects & Clients
  { icon: UserPlus, label: "Onboarding", href: "/onboarding/status" },        // SEPARATE
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Shield, label: "User Management", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
]
```

Each menu item is distinct and independent.

## 🚀 Development Workflow

### Terminal 1 - Backend
```bash
cd backend
venv\Scripts\activate
python run.py
# Backend runs on http://localhost:8000
```

### Terminal 2 - Frontend
```bash
cd frontend
pnpm dev
# Frontend runs on http://localhost:3000
```

## 📚 Documentation Structure

- `README.md` - Main project overview
- `PROJECT_SETUP.md` - Complete setup guide
- `INTEGRATION_GUIDE.md` - Frontend-Backend integration
- `STRUCTURE_OVERVIEW.md` - This file
- `frontend/README.md` - Frontend specific docs
- `backend/README.md` - Backend specific docs

## 🔍 Quick Reference

### Finding Files

| What | Location |
|------|----------|
| API client | `frontend/lib/api-client.ts` |
| Login page | `frontend/app/login/page.tsx` |
| Employees page | `frontend/app/employees/page.tsx` |
| Work Management | `frontend/app/work-management/page.tsx` |
| Onboarding Status | `frontend/app/onboarding/status/page.tsx` |
| Onboarding New | `frontend/app/onboarding/new/page.tsx` |
| Sidebar | `frontend/components/sidebar.tsx` |
| Employee API | `backend/app/api/endpoints/employees.py` |
| Database config | `backend/.env` |

### Running Commands

| Command | Location | Purpose |
|---------|----------|---------|
| `pnpm dev` | `frontend/` | Start frontend |
| `python run.py` | `backend/` | Start backend |
| `python init_db.py` | `backend/` | Initialize database |
| `pnpm build` | `frontend/` | Build frontend |

## ✅ What Changed

### Before
```
ems/
├── app/          # Frontend pages
├── components/   # Frontend components
├── lib/          # Frontend utils
├── backend/      # Backend code
└── ...
```

### After
```
ems/
├── frontend/     # ALL frontend code (app, components, lib, etc.)
├── backend/      # ALL backend code
└── docs/         # Documentation
```

## 🎯 Benefits

1. **Clear Separation**: Frontend and backend are completely isolated
2. **Independent Development**: Each can be worked on separately
3. **Better Organization**: Related files are grouped together
4. **Easier Navigation**: Know exactly where to find things
5. **Simplified Deployment**: Deploy frontend and backend independently

## 📞 Need Help?

- Frontend issues → Check `frontend/README.md`
- Backend issues → Check `backend/README.md`
- Integration → Check `INTEGRATION_GUIDE.md`
- Setup → Check `PROJECT_SETUP.md`

---

**Last Updated**: 2026-01-12

This structure provides clear boundaries between frontend and backend, making development, testing, and deployment more straightforward.
