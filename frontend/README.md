# HR Management System - Frontend

Modern Next.js 16 frontend for the HR Management System with React 19, TypeScript, and Tailwind CSS.

## 📁 Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── admin/               # Admin pages
│   │   └── users/          # User management
│   ├── clients/            # Client management pages
│   ├── employees/          # Employee management pages
│   ├── login/              # Authentication page
│   ├── onboarding/         # Onboarding pages (separate from work-management)
│   │   ├── new/           # Create onboarding record
│   │   └── status/        # Onboarding status list
│   ├── projects/           # Project pages
│   ├── reports/            # Reports and analytics
│   ├── settings/           # Settings page
│   ├── work-management/    # Projects & Clients tabs (NOT onboarding)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard
│   └── globals.css         # Global styles
│
├── components/              # React components
│   ├── ui/                 # Radix UI components (shadcn/ui)
│   ├── app-shell.tsx       # Main application shell
│   ├── sidebar.tsx         # Navigation sidebar
│   └── top-nav.tsx         # Top navigation bar
│
├── lib/                     # Utilities and libraries
│   ├── api-client.ts       # API client for backend
│   └── utils.ts            # Helper functions
│
├── public/                  # Static assets
│   └── icons/              # App icons
│
├── styles/                  # Additional styles
│
├── .env.local              # Environment variables
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at **http://localhost:3000**

### Build for Production

```bash
pnpm build
pnpm start
```

## 🔌 API Integration

The frontend connects to the FastAPI backend using the API client at `lib/api-client.ts`.

### Configuration

Set the backend URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Usage Example

```typescript
import { employeeApi } from "@/lib/api-client"

// Get all employees
const employees = await employeeApi.getAll()

// Create employee
await employeeApi.create({
  name: "John Doe",
  email: "john@company.com",
  role: "Developer",
  department: "Engineering",
  type: "Full-Time",
  location: "Onshore",
  status: "Active",
  skills: "React,TypeScript",
  join_date: "2024-01-15"
})
```

See `../INTEGRATION_GUIDE.md` for detailed integration instructions.

## 📄 Pages Overview

### Work Management (`/work-management`)
**Contains**: Projects and Clients management (tabs)
- View and manage projects
- Track project status, team size, and allocation
- Manage client relationships

**Note**: This page does NOT include onboarding. Onboarding is completely separate.

### Onboarding (`/onboarding`)
**Separate section** for new employee onboarding:
- `/onboarding/status` - View all onboarding records
- `/onboarding/new` - Create new onboarding record

### Employees (`/employees`)
- Employee directory
- Add/edit/delete employees
- View employee details and skills

### Clients (`/clients`)
- Client management
- View client projects and contacts

### Projects (`/projects`)
- Project tracking
- Team assignments

### Reports (`/reports`)
- Analytics and reporting

### Admin (`/admin/users`)
- User management (admin only)

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Theme**: next-themes (dark mode support)

## 🔐 Authentication

Login functionality is integrated with the backend:

1. Navigate to `/login`
2. Enter credentials (default: `admin@company.com` / `admin123`)
3. JWT token is stored automatically
4. Token is included in all API requests

## 📦 Available Scripts

```bash
# Development
pnpm dev          # Start dev server

# Building
pnpm build        # Build for production
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint
```

## 🎯 Key Features

- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Dark mode support
- ✅ Type-safe with TypeScript
- ✅ Form validation with Zod
- ✅ Animated components
- ✅ Accessible UI components (Radix UI)
- ✅ API integration with backend
- ✅ JWT authentication
- ✅ Protected routes

## 📝 Navigation Structure

The sidebar includes:

1. **Dashboard** - Overview and statistics
2. **Employees** - Employee management
3. **Work Management** - Projects & Clients (tabs)
4. **Onboarding** - Onboarding workflows (separate menu item)
5. **Reports** - Analytics
6. **User Management** - Admin users
7. **Settings** - Application settings

## 🔄 Integration Status

- ✅ Login page - Connected to backend
- 🔄 Employees - Ready for integration
- 🔄 Clients - Ready for integration
- 🔄 Projects - Ready for integration
- 🔄 Onboarding - Ready for integration
- 🔄 Admin Users - Ready for integration

See `../INTEGRATION_GUIDE.md` for step-by-step integration instructions.

## 🛠 Customization

### Adding a New Page

1. Create a new folder in `app/` directory
2. Add `page.tsx` for the page component
3. Optional: Add `loading.tsx` for loading state
4. Add navigation link in `components/sidebar.tsx`

### Styling

- Global styles: `app/globals.css`
- Component styles: Use Tailwind CSS classes
- Custom components: `components/ui/`

## 📚 Documentation

- **Integration Guide**: `../INTEGRATION_GUIDE.md`
- **Project Setup**: `../PROJECT_SETUP.md`
- **Backend API**: `../backend/README.md`

## 🐛 Troubleshooting

### Module not found '@/...'

Make sure TypeScript paths are configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### API calls failing

1. Check backend is running: http://localhost:8000
2. Verify `.env.local` has correct API URL
3. Check JWT token: `localStorage.getItem("authToken")`
4. Token expires after 30 minutes - login again

### Build errors

```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

## 📞 Support

For issues or questions, refer to the main project documentation in the parent directory.

---

**Part of the HR Management System** | [Backend](../backend) | [Integration Guide](../INTEGRATION_GUIDE.md)
