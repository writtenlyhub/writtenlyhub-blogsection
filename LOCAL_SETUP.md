# Local Database Setup

This project uses **Payload CMS** backed by a **PostgreSQL** database. To run the project locally and interact with the CMS, you need a running PostgreSQL instance.

## 1. Required Configuration

Payload and Next.js rely on the `DATABASE_URI` environment variable to connect to your PostgreSQL database. Ensure you have a `.env` file in the root of your project:

```env
# Example .env
DATABASE_URI=postgres://postgres:<password>@127.0.0.1:5432/writtenlyhub
PAYLOAD_SECRET=YOUR_SECRET_KEY
```

> **Note:** Replace `<password>` with your actual PostgreSQL user password.

## 2. Setting Up PostgreSQL

You can run PostgreSQL locally using Docker or by installing it directly on your machine.

### Option A: Using Docker (Recommended)
If you have Docker Desktop installed, you can spin up a PostgreSQL instance quickly without polluting your system.

Run the following command in your terminal:
```bash
docker run --name writtenlyhub-postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=writtenlyhub \
  -p 5432:5432 \
  -d postgres
```
*Make sure your `.env` `DATABASE_URI` matches the password and DB name used above.*

### Option B: Native Installation (Windows/Mac)
1. Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).
2. Open **pgAdmin** or your command line (psql) and create a new database:
   ```sql
   CREATE DATABASE writtenlyhub;
   ```
3. Update your `.env` file with the correct credentials.

## 3. Starting the Project

Once PostgreSQL is running and your `.env` is configured:

1. Start the Next.js development server:
   ```bash
   npm run dev
   ```
2. Payload will automatically connect to your database, run the required migrations, and synchronize the database schema based on your Collections.
3. Access the Payload Admin panel at: `http://localhost:3000/admin`
4. The first time you visit the admin panel, you'll be prompted to create your first Admin user.

## Troubleshooting

- **`connect ECONNREFUSED 127.0.0.1:5432`**: This means your PostgreSQL server is not running or the port is blocked. Ensure Docker is running or the Windows service for PostgreSQL is active.
- **`password authentication failed`**: Verify the password in your `DATABASE_URI` matches the one configured in Postgres.
