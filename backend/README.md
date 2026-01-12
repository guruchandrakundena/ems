# HR Management System - Backend API

FastAPI backend for the HR Management System with Azure SQL Server database.

## Features

- 🔐 JWT Authentication
- 👥 Employee Management (CRUD)
- 🏢 Client Management (CRUD)
- 📊 Project Management (CRUD)
- 🎯 Onboarding Management (CRUD)
- 👤 User Management with role-based access
- 📝 Automatic API documentation (Swagger & ReDoc)
- 🔒 Secure password hashing
- 🌐 CORS enabled for frontend integration

## Tech Stack

- **Framework**: FastAPI 0.109.0
- **Database**: Azure SQL Server
- **ORM**: SQLAlchemy 2.0.25
- **Authentication**: JWT (python-jose)
- **Password Hashing**: bcrypt (passlib)
- **Server**: Uvicorn

## Prerequisites

- Python 3.8+
- ODBC Driver 17 for SQL Server
- Azure SQL Server database

### Installing ODBC Driver (Windows)

Download and install from: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server

## Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment** (recommended):
   ```bash
   python -m venv venv

   # Activate on Windows
   venv\Scripts\activate

   # Activate on Mac/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   - The `.env` file is already created with your Azure SQL credentials
   - Update `SECRET_KEY` for production use:
     ```bash
     # Generate a secure secret key
     openssl rand -hex 32
     ```

## Database Setup

Initialize the database and create sample data:

```bash
python init_db.py
```

This will:
- Create all database tables
- Add a default admin user (`admin@company.com` / `admin123`)
- Add sample employees, clients, and projects

## Running the Server

Start the development server:

```bash
python run.py
```

Or using uvicorn directly:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API Base**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get access token

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/{id}` - Get client by ID
- `POST /api/clients` - Create new client
- `PUT /api/clients/{id}` - Update client
- `DELETE /api/clients/{id}` - Delete client

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Onboarding
- `GET /api/onboarding` - Get all onboarding records
- `GET /api/onboarding/{id}` - Get onboarding record by ID
- `POST /api/onboarding` - Create new onboarding record
- `PUT /api/onboarding/{id}` - Update onboarding record
- `DELETE /api/onboarding/{id}` - Delete onboarding record

### Users
- `GET /api/users/me` - Get current user info
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user (admin only)

## Authentication Flow

1. **Register** or use default admin credentials
2. **Login** to get an access token:
   ```bash
   curl -X POST "http://localhost:8000/api/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@company.com", "password": "admin123"}'
   ```
3. **Use the token** in subsequent requests:
   ```bash
   curl -X GET "http://localhost:8000/api/employees" \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
   ```

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   ├── auth.py          # Authentication endpoints
│   │   │   ├── employees.py     # Employee CRUD
│   │   │   ├── clients.py       # Client CRUD
│   │   │   ├── projects.py      # Project CRUD
│   │   │   ├── onboarding.py    # Onboarding CRUD
│   │   │   └── users.py         # User management
│   │   └── __init__.py
│   ├── core/
│   │   ├── config.py            # Configuration
│   │   ├── security.py          # JWT & password hashing
│   │   └── deps.py              # Dependencies
│   ├── db/
│   │   └── database.py          # Database connection
│   ├── models/
│   │   ├── user.py              # User model
│   │   ├── employee.py          # Employee model
│   │   ├── client.py            # Client model
│   │   ├── project.py           # Project model
│   │   └── onboarding.py        # Onboarding model
│   ├── schemas/
│   │   ├── user.py              # User schemas
│   │   ├── employee.py          # Employee schemas
│   │   ├── client.py            # Client schemas
│   │   ├── project.py           # Project schemas
│   │   └── onboarding.py        # Onboarding schemas
│   └── main.py                  # FastAPI app
├── .env                         # Environment variables
├── requirements.txt             # Python dependencies
├── run.py                       # Server startup script
├── init_db.py                   # Database initialization
└── README.md                    # This file
```

## Default Admin Credentials

```
Email: admin@company.com
Password: admin123
```

⚠️ **Important**: Change the default admin password in production!

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_SERVER` | Azure SQL Server hostname | ems-server.database.windows.net |
| `DB_NAME` | Database name | Ems_db |
| `DB_USER` | Database username | Dfzems |
| `DB_PASSWORD` | Database password | Datafactz@99 |
| `DB_PORT` | Database port | 1433 |
| `SECRET_KEY` | JWT secret key | (change in production) |
| `ALGORITHM` | JWT algorithm | HS256 |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration | 30 |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black app/
```

### Linting
```bash
flake8 app/
```

## Production Deployment

1. Update `.env` with production values
2. Set a strong `SECRET_KEY`
3. Disable `reload=True` in `run.py`
4. Use a production WSGI server (gunicorn)
5. Set up HTTPS/SSL
6. Configure proper CORS origins

## Troubleshooting

### ODBC Driver Error
If you get "ODBC Driver not found":
- Install ODBC Driver 17 for SQL Server
- Update the driver name in `config.py` if using a different version

### Database Connection Error
- Verify Azure SQL Server firewall rules allow your IP
- Check credentials in `.env` file
- Ensure the database exists

### Import Errors
- Make sure you're in the virtual environment
- Verify all dependencies are installed: `pip install -r requirements.txt`

## Support

For issues or questions, please contact the development team.
