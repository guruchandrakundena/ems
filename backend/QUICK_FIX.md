# Quick Fix: Install ODBC Driver 18

## Problem
The old "SQL Server" driver cannot connect to Azure SQL Server. You need ODBC Driver 18.

## Solution (Choose ONE)

### Option 1: Direct Download (Easiest - 5 minutes)

1. Download from Microsoft:
   **https://go.microsoft.com/fwlink/?linkid=2249004**

2. Run the downloaded `msodbcsql.msi` file

3. Click through the installer (defaults are fine)

4. Close and reopen your terminal

5. Verify installation:
   ```powershell
   Get-OdbcDriver | Where-Object {$_.Name -like '*18*'}
   ```

6. Run the database initialization:
   ```bash
   cd backend
   python init_db.py
   ```

### Option 2: Using PowerShell (if you have winget)

```powershell
winget install Microsoft.ODBCDriver.18
```

Then reopen terminal and run `python init_db.py`

## Why This is Needed

- **Old driver**: "SQL Server" (from Windows 2000 era)
  - ❌ Cannot connect to Azure SQL
  - ❌ No encryption support
  - ❌ No modern security features

- **New driver**: "ODBC Driver 18 for SQL Server"
  - ✅ Azure SQL support
  - ✅ Encryption support
  - ✅ Modern authentication
  - ✅ Better performance

## After Installation

The system will automatically detect and use ODBC Driver 18. You'll see:

```
Using ODBC driver: ODBC Driver 18 for SQL Server
✓ Tables created successfully!
✓ Admin user created!
```

## Alternative: Use Local Database (For Testing)

If you can't install ODBC Driver 18 right now, you can use SQLite for local testing:

1. Install dependencies:
   ```bash
   pip install aiosqlite
   ```

2. Update `.env`:
   ```
   # Comment out Azure SQL
   # DB_SERVER=ems-server.database.windows.net
   # ...

   # Use SQLite instead
   DATABASE_URL=sqlite:///./ems.db
   ```

But for production with Azure SQL, ODBC Driver 18 is required.
