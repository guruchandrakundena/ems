"""
Database initialization script.
Creates database tables and adds a default admin user and sample data.
"""
from app.db.database import engine, SessionLocal, Base
from app.models import User, Employee, Client, Project, Onboarding
from app.core.security import get_password_hash
from datetime import date


def init_db():
    """Initialize the database with tables and sample data."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("[OK] Tables created successfully!")

    db = SessionLocal()
    try:
        # Check if admin user already exists
        existing_admin = db.query(User).filter(User.email == "admin@company.com").first()
        if not existing_admin:
            print("\nCreating default admin user...")
            admin_user = User(
                email="admin@company.com",
                hashed_password=get_password_hash("admin123"),
                full_name="System Administrator",
                is_active=True,
                is_superuser=True,
            )
            db.add(admin_user)
            print("[OK] Admin user created!")
            print("  Email: admin@company.com")
            print("  Password: admin123")
        else:
            print("\n[OK] Admin user already exists")

        # Add sample employees
        if db.query(Employee).count() == 0:
            print("\nAdding sample employees...")
            sample_employees = [
                Employee(
                    name="John Smith",
                    email="john.smith@company.com",
                    phone="+1 234-567-8901",
                    role="Senior Developer",
                    department="Engineering",
                    type="Full-Time",
                    location="Onshore",
                    status="Active",
                    skills="React,Node.js,AWS",
                    join_date=date(2022, 3, 15),
                    manager="Jane Doe",
                ),
                Employee(
                    name="Sarah Johnson",
                    email="sarah.j@company.com",
                    phone="+1 234-567-8902",
                    role="Project Manager",
                    department="Management",
                    type="Full-Time",
                    location="Onshore",
                    status="Active",
                    skills="Agile,Scrum,JIRA",
                    join_date=date(2021, 6, 20),
                    manager="Mike Wilson",
                ),
                Employee(
                    name="Mike Chen",
                    email="mike.chen@company.com",
                    phone="+1 234-567-8903",
                    role="DevOps Engineer",
                    department="Engineering",
                    type="Contract",
                    location="Offshore",
                    status="Active",
                    skills="Docker,Kubernetes,CI/CD",
                    join_date=date(2023, 1, 10),
                    manager="Jane Doe",
                ),
            ]
            db.add_all(sample_employees)
            print(f"[OK] Added {len(sample_employees)} sample employees")

        # Add sample clients
        if db.query(Client).count() == 0:
            print("\nAdding sample clients...")
            sample_clients = [
                Client(
                    name="Acme Corporation",
                    email="contact@acme.com",
                    phone="+1 555-0100",
                    company="Acme Corp",
                    industry="Technology",
                    contact_person="Robert Smith",
                    status="Active",
                ),
                Client(
                    name="FinanceFirst",
                    email="info@financefirst.com",
                    phone="+1 555-0200",
                    company="FinanceFirst Inc",
                    industry="Finance",
                    contact_person="Emily Davis",
                    status="Active",
                ),
            ]
            db.add_all(sample_clients)
            print(f"[OK] Added {len(sample_clients)} sample clients")

        # Add sample projects
        if db.query(Project).count() == 0:
            print("\nAdding sample projects...")
            sample_projects = [
                Project(
                    name="E-Commerce Platform",
                    client_id=1,
                    description="Building a modern e-commerce platform",
                    status="Active",
                    start_date=date(2024, 1, 1),
                    technology_stack="React,Node.js,PostgreSQL",
                    project_manager="Sarah Johnson",
                    team_size=5,
                    priority="High",
                ),
                Project(
                    name="Mobile Banking App",
                    client_id=2,
                    description="Developing a secure mobile banking application",
                    status="Active",
                    start_date=date(2024, 2, 1),
                    technology_stack="React Native,Node.js,MongoDB",
                    project_manager="Sarah Johnson",
                    team_size=4,
                    priority="High",
                ),
            ]
            db.add_all(sample_projects)
            print(f"[OK] Added {len(sample_projects)} sample projects")

        db.commit()
        print("\n[SUCCESS] Database initialization completed successfully!")
        print("\n📝 You can now:")
        print("   1. Start the backend server: python run.py")
        print("   2. Login with: admin@company.com / admin123")
        print("   3. Access API docs at: http://localhost:8000/docs")

    except Exception as e:
        print(f"\n[ERROR] Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
