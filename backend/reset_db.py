"""
Reset database - Drop all tables and recreate them
"""
from app.db.database import engine, Base
from app.models import User, Employee, Client, Project, Onboarding


def reset_db():
    """Drop all tables and recreate them."""
    print("Dropping all existing tables...")
    try:
        Base.metadata.drop_all(bind=engine)
        print("✓ All tables dropped successfully!")
    except Exception as e:
        print(f"Note: {e}")
        print("(This is OK if tables didn't exist)")

    print("\nCreating fresh tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ All tables created successfully!")
    print("\nDatabase is now ready. Run 'python init_db.py' to add sample data.")


if __name__ == "__main__":
    reset_db()
