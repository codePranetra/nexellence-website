# Nexellence Blog CMS

Full-stack blog admin inside this Next.js app (Prisma + MySQL).

## Database

- **Database:** `nexellence_db`
- **Connection:** `mysql://root:root@localhost:3306/nexellence_db` (see `.env` / `.env.local`)

```sql
CREATE DATABASE IF NOT EXISTS nexellence_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Commands

```bash
npm run db:migrate   # apply migrations
npm run db:seed      # seed admin + sample category/blog
npm run dev          # http://localhost:3000
```

## Admin login

| Field | Default (after seed) |
|-------|----------------------|
| Email | `admin@nexellence.net` |
| Username | `Admin` (same as `ADMIN_NAME` in `.env`) |
| Password | `admin123` (from `ADMIN_PASSWORD` in `.env`) |

**URL:** http://localhost:3000/admin/login

## Tables

- `login` — single admin (`id`, `name`, `email`, `hash_password`, timestamps)
- `categories` — `id`, `name`, `slug`, timestamps
- `blogs` — full post fields + `category_id`, `is_published`, `created_by_id`, `updated_by_id`

## API routes

- `POST /api/auth/login` — `{ id, password }`
- `GET /api/categories`, `GET /api/blogs`, `GET /api/blogs/[slug]` — public
- `/api/admin/*` — requires admin cookie
