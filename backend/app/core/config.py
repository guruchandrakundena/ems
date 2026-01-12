from pydantic_settings import BaseSettings
from typing import List
import pyodbc
from urllib.parse import quote_plus


class Settings(BaseSettings):
    # Database
    DB_SERVER: str
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str
    DB_PORT: int = 1433

    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS
    FRONTEND_URL: str = "http://localhost:3000"

    def _get_available_driver(self) -> str:
        """Detect the best available ODBC driver for SQL Server."""
        drivers = [d for d in pyodbc.drivers() if 'SQL Server' in d]

        # Priority order: newer drivers first
        preferred_drivers = [
            'ODBC Driver 18 for SQL Server',
            'ODBC Driver 17 for SQL Server',
            'ODBC Driver 13 for SQL Server',
            'SQL Server'
        ]

        for preferred in preferred_drivers:
            if preferred in drivers:
                print(f"Using ODBC driver: {preferred}")
                return preferred.replace(' ', '+')

        # If no SQL Server driver found
        if drivers:
            driver = drivers[0]
            print(f"Using ODBC driver: {driver}")
            return driver.replace(' ', '+')

        raise Exception("No SQL Server ODBC driver found. Please install ODBC Driver 18 for SQL Server.")

    @property
    def DATABASE_URL(self) -> str:
        driver = self._get_available_driver()

        # URL-encode username and password to handle special characters like @
        encoded_user = quote_plus(self.DB_USER)
        encoded_password = quote_plus(self.DB_PASSWORD)

        # Build connection string with Azure SQL specific parameters
        return (
            f"mssql+pyodbc://{encoded_user}:{encoded_password}@"
            f"{self.DB_SERVER}:{self.DB_PORT}/{self.DB_NAME}"
            f"?driver={driver}&TrustServerCertificate=yes&Encrypt=yes"
        )

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
