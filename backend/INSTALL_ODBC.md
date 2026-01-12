# Installing ODBC Driver for SQL Server

## Quick Install (Windows)

### Option 1: Download and Install ODBC Driver 18 (Recommended)

1. Download ODBC Driver 18 from Microsoft:
   https://go.microsoft.com/fwlink/?linkid=2249004

2. Run the installer
3. Follow the installation wizard
4. Restart your terminal after installation

### Option 2: Using winget (if available)

```powershell
winget install Microsoft.ODBCDriver.18
```

### Option 3: Using Chocolatey (if available)

```powershell
choco install sqlserver-odbcdriver
```

## Verification

After installation, verify the driver is installed:

```powershell
Get-OdbcDriver | Where-Object {$_.Name -like '*SQL Server*'}
```

You should see "ODBC Driver 18 for SQL Server" in the list.

## Alternative: Use the Basic Driver (Testing Only)

If you can't install ODBC Driver 18 right now, I've updated the configuration to work with the basic "SQL Server" driver, but it requires additional connection parameters for Azure SQL.

## Next Steps

After installing ODBC Driver 18:
1. The configuration will automatically detect and use it
2. Run: `python init_db.py`
3. Then start the server: `python run.py`
