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

## 3. Database Initialization & Migration Strategy

Payload v3 uses Drizzle ORM to manage the PostgreSQL schema. To avoid schema drift between development and production, this project uses **Explicit Migrations**. 

By default in development (`NODE_ENV !== 'production'`), Payload will automatically "push" schema changes to the database without tracking them. However, for a production-ready workflow, you MUST track schema changes via migration files.

### Initialization Sequence (First Startup)
1. **Ensure PostgreSQL is running** and your `.env` is configured.
2. **Generate your first migration** (this tracks the initial schema creation):
   ```bash
   npm run payload:migrate:create
   ```
   *You will be prompted to name the migration (e.g., `initial_schema`). This generates a `.sql` and `.ts` file inside `src/migrations`.*
3. **Run the migration** to create the tables in your local database:
   ```bash
   npm run payload:migrate
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Managing Future Schema Changes
Whenever you modify a Collection (e.g., adding a new field to `Blogs.ts`), do NOT rely on automatic push. Instead, generate a new migration:
1. `npm run payload:migrate:create` (name it descriptively, e.g., `add_featured_hero_field`)
2. `npm run payload:migrate`
3. Commit the new migration file to Git.

## 4. First Admin User

1. Access the Payload Admin panel at: `http://localhost:3000/admin`
2. Since the database is freshly initialized, you will be prompted to create your first Admin user.

## Troubleshooting

- **`connect ECONNREFUSED 127.0.0.1:5432`**: This means your PostgreSQL server is not running or the port is blocked. Ensure Docker is running or the Windows service for PostgreSQL is active.
- **`password authentication failed`**: Verify the password in your `DATABASE_URI` matches the one configured in Postgres.
- **`relation "users" does not exist`**: You forgot to run `npm run payload:migrate`. The database is empty!
