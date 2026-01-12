# Frontend-Backend Integration Guide

This guide explains how to connect your Next.js frontend to the FastAPI backend.

## Quick Start

### 1. Start the Backend Server

```bash
cd backend

# Install dependencies (first time only)
pip install -r requirements.txt

# Initialize database (first time only)
python init_db.py

# Start the server
python run.py
```

The backend will be available at: **http://localhost:8000**

### 2. Start the Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only - if not already done)
pnpm install

# Start the development server
pnpm dev
```

The frontend will be available at: **http://localhost:3000**

## API Client Usage

The API client is located at `lib/api-client.ts` and provides methods for all backend endpoints.

### Authentication

```typescript
import { authApi } from "@/lib/api-client"

// Login
try {
  const response = await authApi.login("admin@company.com", "admin123")
  // Token is automatically stored
  console.log("Logged in successfully")
} catch (error) {
  console.error("Login failed:", error.message)
}

// Logout
authApi.logout()
```

### Employee Management

```typescript
import { employeeApi } from "@/lib/api-client"

// Get all employees
const employees = await employeeApi.getAll()

// Get employee by ID
const employee = await employeeApi.getById(1)

// Create employee
const newEmployee = await employeeApi.create({
  name: "John Doe",
  email: "john@company.com",
  phone: "+1 234-567-8900",
  role: "Developer",
  department: "Engineering",
  type: "Full-Time",
  location: "Onshore",
  status: "Active",
  skills: "React,Node.js,TypeScript",
  join_date: "2024-01-15",
  manager: "Jane Smith"
})

// Update employee
await employeeApi.update(1, {
  status: "On Bench"
})

// Delete employee
await employeeApi.delete(1)
```

### Other APIs

Similar patterns for:
- `clientApi` - Client management
- `projectApi` - Project management
- `onboardingApi` - Onboarding management
- `userApi` - User management

## Updating Pages to Use API

### Example: Updating Employees Page

Here's how to update the `frontend/app/employees/page.tsx` to fetch data from the API:

```typescript
"use client"

import { useState, useEffect } from "react"
import { employeeApi } from "@/lib/api-client"
import { useRouter } from "next/navigation"

export default function EmployeesPage() {
  const router = useRouter()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const data = await employeeApi.getAll()

      // Transform API data to match frontend format
      const transformedData = data.map(emp => ({
        ...emp,
        skills: emp.skills ? emp.skills.split(',') : [],
        joinDate: emp.join_date
      }))

      setEmployees(transformedData)
    } catch (err: any) {
      setError(err.message)
      // If unauthorized, redirect to login
      if (err.message.includes("401") || err.message.includes("credentials")) {
        router.push("/login")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEmployee = async (id: number) => {
    try {
      await employeeApi.delete(id)
      // Refresh the list
      await fetchEmployees()
    } catch (err: any) {
      alert("Failed to delete employee: " + err.message)
    }
  }

  const handleCreateEmployee = async (employeeData: any) => {
    try {
      await employeeApi.create({
        ...employeeData,
        skills: employeeData.skills.join(','), // Convert array to comma-separated
        join_date: employeeData.joinDate
      })
      await fetchEmployees()
    } catch (err: any) {
      alert("Failed to create employee: " + err.message)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // ... rest of your component UI
}
```

### Key Changes Needed:

1. **Import the API client**:
   ```typescript
   import { employeeApi } from "@/lib/api-client"
   ```

2. **Add state for loading and errors**:
   ```typescript
   const [employees, setEmployees] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState("")
   ```

3. **Fetch data in useEffect**:
   ```typescript
   useEffect(() => {
     fetchEmployees()
   }, [])
   ```

4. **Transform data if needed**:
   - API uses `join_date` but frontend uses `joinDate`
   - API stores skills as comma-separated string, frontend uses array

5. **Update CRUD operations** to call API methods instead of updating local state

## Data Transformation

### API → Frontend

```typescript
// API format
{
  id: 1,
  name: "John Smith",
  email: "john@company.com",
  skills: "React,Node.js,AWS",  // String
  join_date: "2022-03-15"        // Snake case
}

// Frontend format (your current mock data)
{
  id: 1,
  name: "John Smith",
  email: "john@company.com",
  skills: ["React", "Node.js", "AWS"],  // Array
  joinDate: "2022-03-15"                 // Camel case
}

// Transformation
const frontendData = apiData.map(item => ({
  ...item,
  skills: item.skills ? item.skills.split(',') : [],
  joinDate: item.join_date
}))
```

### Frontend → API

```typescript
// Frontend data
{
  name: "John Smith",
  skills: ["React", "Node.js"],
  joinDate: "2022-03-15"
}

// Transform for API
{
  name: "John Smith",
  skills: "React,Node.js",  // Join array to string
  join_date: "2022-03-15"   // Convert to snake_case
}
```

## Error Handling

The API client throws errors with descriptive messages. Handle them appropriately:

```typescript
try {
  await employeeApi.create(data)
} catch (error: any) {
  if (error.message.includes("401") || error.message.includes("credentials")) {
    // Redirect to login
    router.push("/login")
  } else if (error.message.includes("Email already registered")) {
    // Show duplicate email error
    setError("This email is already in use")
  } else {
    // Generic error
    setError(error.message)
  }
}
```

## Authentication Flow

1. **Login Page** (`app/login/page.tsx`) - ✅ Already integrated!
   - Uses `authApi.login()` to authenticate
   - Stores token automatically

2. **Protected Routes**:
   - Token is automatically included in all API requests
   - If API returns 401 Unauthorized, redirect to login

3. **Logout**:
   ```typescript
   import { authApi } from "@/lib/api-client"

   const handleLogout = () => {
     authApi.logout()
     router.push("/login")
   }
   ```

## Testing the Integration

### 1. Test Backend API

Visit http://localhost:8000/docs to see the interactive API documentation.

### 2. Test Login

- Start both servers
- Navigate to http://localhost:3000/login
- Use credentials: `admin@company.com` / `admin123`
- You should be redirected to the dashboard

### 3. Test Employee List

After implementing the changes above:
- Navigate to http://localhost:3000/employees
- You should see the sample employees from the database

## Common Issues

### CORS Error

If you see CORS errors in the browser console:
- Make sure the backend is running on port 8000
- Check that `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
- Backend CORS is already configured for `localhost:3000`

### Database Connection Error

```
pyodbc.Error: ... [Microsoft][ODBC Driver 17 for SQL Server]...
```

**Solutions**:
1. Verify ODBC Driver 17 is installed
2. Check Azure SQL Server firewall allows your IP
3. Verify credentials in `backend/.env`

### Authentication Error

```
Could not validate credentials
```

**Solutions**:
1. Make sure you logged in first
2. Check token in browser: `localStorage.getItem("authToken")`
3. Token expires after 30 minutes - login again

### Module Not Found

```
Cannot find module '@/lib/api-client'
```

**Solution**: The file is at `frontend/lib/api-client.ts`. Make sure TypeScript paths are configured in `frontend/tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Next Steps

1. ✅ Backend is ready with all APIs
2. ✅ Login page is integrated
3. 🔄 Update remaining pages:
   - `frontend/app/employees/page.tsx` - Employee list
   - `frontend/app/clients/page.tsx` - Client list
   - `frontend/app/projects/page.tsx` - Project list
   - `frontend/app/onboarding/new/page.tsx` - Onboarding form
   - `frontend/app/onboarding/status/page.tsx` - Onboarding status

4. Add loading states and error handling
5. Add toast notifications for success/error messages
6. Implement real-time updates if needed

## Sample API Responses

### GET /api/employees
```json
[
  {
    "id": 1,
    "name": "John Smith",
    "email": "john.smith@company.com",
    "phone": "+1 234-567-8901",
    "role": "Senior Developer",
    "department": "Engineering",
    "type": "Full-Time",
    "location": "Onshore",
    "status": "Active",
    "skills": "React,Node.js,AWS",
    "join_date": "2022-03-15",
    "manager": "Jane Doe",
    "created_at": "2024-01-12T10:00:00",
    "updated_at": null
  }
]
```

### POST /api/auth/login
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## Default Credentials

After running `python init_db.py`, you can login with:

```
Email: admin@company.com
Password: admin123
```

⚠️ **Important**: Change this password in production!
