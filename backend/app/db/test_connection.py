from sqlalchemy import create_engine
from app.config import DATABASE_URL

def test_connection():
    print(f"Attempting to connect to database: {DATABASE_URL}")
    try:
        engine = create_engine(DATABASE_URL)

        with engine.connect():
            print("Connection successful!")

    except Exception as e:
        print(f"Failed to connect to database: {e}")

if __name__ == "__main__":
    test_connection()
