import psycopg2

def init_postgres():
    try:
        conn = psycopg2.connect(
            host="localhost",
            port=5432,
            user="postgres",
            password="615461",
            dbname="postgres"
        )
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute("SELECT version();")
        print("Connected! Version:", cur.fetchone()[0])

        cur.execute("SELECT 1 FROM pg_database WHERE datname='payroll_db';")
        if not cur.fetchone():
            cur.execute("CREATE DATABASE payroll_db;")
            print("Successfully created database 'payroll_db'!")
        else:
            print("Database 'payroll_db' already exists!")
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print("PostgreSQL connection error:", e)
        return False

if __name__ == "__main__":
    init_postgres()
