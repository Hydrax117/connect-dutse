# Database Setup

## 1. Create a PostgreSQL database

### Option A — Neon (recommended, free tier)

1. Go to https://neon.tech and create an account
2. Create a new project called `connect-dutse`
3. Copy the connection string from the dashboard

### Option B — Supabase

1. Go to https://supabase.com and create a project
2. Go to Settings > Database > Connection string (URI mode)
3. Copy the connection string

### Option C — Local PostgreSQL

```
createdb connect_dutse
DATABASE_URL=postgresql://postgres:password@localhost:5432/connect_dutse
```

## 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your `DATABASE_URL`:

```bash
cp .env.example .env.local
```

## 3. Run migrations

```bash
npm run db:migrate
# When prompted, name the migration: initial_schema
```

## 4. Seed categories

```bash
npm run db:seed
```

## 5. View your data

```bash
npm run db:studio
```
