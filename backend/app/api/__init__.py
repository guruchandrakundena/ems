from fastapi import APIRouter
from app.api.endpoints import auth, employees, clients, projects, onboarding, users

api_router = APIRouter(prefix="/api")

# Include all endpoint routers
api_router.include_router(auth.router)
api_router.include_router(employees.router)
api_router.include_router(clients.router)
api_router.include_router(projects.router)
api_router.include_router(onboarding.router)
api_router.include_router(users.router)
