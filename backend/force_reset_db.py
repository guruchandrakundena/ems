"""
Force reset database - Drop all constraints and tables manually
"""
from sqlalchemy import text
from app.db.database import engine, Base
from app.models import User, Employee, Client, Project, Onboarding


def force_reset_db():
    """Forcefully drop all tables and constraints."""
    print("Force resetting database...")

    with engine.connect() as conn:
        # Start a transaction
        trans = conn.begin()

        try:
            print("\n1. Dropping all foreign key constraints...")

            # Get all foreign keys
            fk_query = text("""
                SELECT
                    fk.name AS constraint_name,
                    OBJECT_NAME(fk.parent_object_id) AS table_name
                FROM sys.foreign_keys AS fk
            """)

            result = conn.execute(fk_query)
            fks = result.fetchall()

            for fk in fks:
                constraint_name = fk[0]
                table_name = fk[1]
                try:
                    drop_fk = text(f"ALTER TABLE [{table_name}] DROP CONSTRAINT [{constraint_name}]")
                    conn.execute(drop_fk)
                    print(f"   [OK] Dropped FK: {constraint_name} from {table_name}")
                except Exception as e:
                    print(f"   [SKIP] Could not drop {constraint_name}")

            print("\n2. Dropping all tables...")

            # List of tables to drop (in reverse dependency order)
            tables_to_drop = ['onboarding', 'projects', 'clients', 'employees', 'users']

            for table in tables_to_drop:
                try:
                    drop_table = text(f"DROP TABLE IF EXISTS [{table}]")
                    conn.execute(drop_table)
                    print(f"   [OK] Dropped table: {table}")
                except Exception as e:
                    print(f"   [SKIP] Could not drop {table}")

            trans.commit()
            print("\n[SUCCESS] All tables and constraints dropped!")

        except Exception as e:
            trans.rollback()
            print(f"\n[ERROR] Error during drop: {e}")
            print("Trying to continue anyway...")

    print("\n3. Creating fresh tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("[SUCCESS] All tables created successfully!")
        print("\n[DONE] Database reset complete!")
        print("\nNext step: Run 'python init_db.py' to add sample data.")
    except Exception as e:
        print(f"[ERROR] Error creating tables: {e}")


if __name__ == "__main__":
    force_reset_db()
