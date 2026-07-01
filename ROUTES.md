# Nexellence — API Routes Reference

Complete list of all Next.js API routes with request/response fields.

**Project:** `nexellence-website`  
**Base URL (local):** `http://localhost:3000`  
**Content-Type:** `application/json` (except upload)

---

## Response envelope

All routes return JSON in this shape:

| Type | Shape |
|------|-------|
| Success | `{ "success": true, "data": <payload> }` |
| Error | `{ "success": false, "message": "<description>" }` |

---

## Authentication

| Item | Value |
|------|-------|
| Cookie name | `admin_token` |
| Cookie type | httpOnly |
| TTL | 8 hours |
| Required for | All `/api/admin/*` routes |

**Browser / fetch:** always use `credentials: "include"`.

---

## Route index

| # | Method | Route | Auth |
|---|--------|-------|------|
| 1 | POST | `/api/auth/login` | None |
| 2 | POST | `/api/auth/logout` | Cookie |
| 3 | GET | `/api/auth/me` | Cookie |
| 4 | GET | `/api/categories` | None |
| 5 | GET | `/api/blogs` | None |
| 6 | GET | `/api/blogs/[slug]` | None |
| 7 | GET | `/api/admin/categories` | Admin |
| 8 | POST | `/api/admin/categories` | Admin |
| 9 | GET | `/api/admin/categories/[id]` | Admin |
| 10 | PUT | `/api/admin/categories/[id]` | Admin |
| 11 | DELETE | `/api/admin/categories/[id]` | Admin |
| 12 | GET | `/api/admin/blogs` | Admin |
| 13 | POST | `/api/admin/blogs` | Admin |
| 14 | GET | `/api/admin/blogs/[id]` | Admin |
| 15 | PUT | `/api/admin/blogs/[id]` | Admin |
| 16 | DELETE | `/api/admin/blogs/[id]` | Admin |
| 17 | POST | `/api/admin/upload` | Admin |
| 18 | POST | `/api/pricing/inquiry/draft` | None |
| 19 | POST | `/api/pricing/inquiry` | None |

---

## 1. POST `/api/auth/login`

Admin login. Sets `admin_token` cookie on success.

### Request body

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `identifier` | string | Yes | min 1 char | Admin email or username (`name`) |
| `password` | string | Yes | min 1 char | Admin password |

**Example:**

```json
{
  "identifier": "admin@nexellence.net",
  "password": "admin123"
}
```

### Response `data` fields (200)

| Field | Type | Description |
|-------|------|-------------|
| `admin.id` | number | Admin user ID |
| `admin.name` | string | Admin display name |
| `admin.email` | string | Admin email |

**Example:**

```json
{
  "success": true,
  "data": {
    "admin": {
      "id": 1,
      "name": "Admin",
      "email": "admin@nexellence.net"
    }
  }
}
```

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid email/username or password |
| 401 | Invalid credentials |
| 500 | Login failed |

---

## 2. POST `/api/auth/logout`

Clears the `admin_token` cookie.

### Request body

None.

### Response `data` fields (200)

| Field | Type | Description |
|-------|------|-------------|
| `loggedOut` | boolean | Always `true` |

**Example:**

```json
{
  "success": true,
  "data": { "loggedOut": true }
}
```

---

## 3. GET `/api/auth/me`

Returns the currently logged-in admin from the session cookie.

### Request

No body. No query params.

### Response `data` fields (200)

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Admin user ID |
| `name` | string | Admin display name |
| `email` | string | Admin email |

**Example:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Admin",
    "email": "admin@nexellence.net"
  }
}
```

### Errors

| Status | Message |
|--------|---------|
| 401 | Unauthorized |

---

## 4. GET `/api/categories`

Public list of all categories (no auth).

### Request

No body. No query params.

### Response `data` (200) — array of:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Category ID |
| `name` | string | Category name |
| `slug` | string | URL-friendly slug |

**Example:**

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Blog", "slug": "blog" }
  ]
}
```

---

## 5. GET `/api/blogs`

Public list of **published** blogs only.

### Query parameters

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `category_slug` | string | No | — | Filter by category slug |
| `page` | number | No | `1` | Page number |
| `limit` | number | No | `50` | Items per page (max `100`) |

**Example:** `GET /api/blogs?category_slug=blog&page=1&limit=10`

### Response `data` (200) — array of:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Blog ID |
| `slug` | string | URL slug |
| `title` | string | Post title |
| `short_description` | string \| null | Card/list excerpt |
| `thumbnail_image` | string \| null | Thumbnail URL path |
| `thumbnail_alt_text` | string \| null | Thumbnail alt text |
| `is_published` | boolean | Always `true` for this route |
| `published_at` | string (ISO date) \| null | Publish timestamp |
| `created_at` | string (ISO date) | Created timestamp |
| `category.id` | number | Category ID |
| `category.name` | string | Category name |
| `category.slug` | string | Category slug |

**Note:** List items do **not** include `content`, `description`, `banner_image`, `banner_text`, or `category_id`.

---

## 6. GET `/api/blogs/[slug]`

Public single blog by slug. Only **published** posts.

### Path parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | Blog URL slug |

**Example:** `GET /api/blogs/advanced-rpo-solutions-solving-hiring-gaps`

### Response `data` fields (200)

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Blog ID |
| `slug` | string | URL slug |
| `title` | string | Post title |
| `short_description` | string \| null | Card excerpt |
| `description` | string \| null | Detail page subtitle |
| `content` | string | Full HTML body |
| `thumbnail_image` | string \| null | Thumbnail URL path |
| `thumbnail_alt_text` | string \| null | Thumbnail alt text |
| `banner_image` | string \| null | Banner URL path |
| `banner_text` | string \| null | Hero headline text |
| `category_id` | number | Category ID |
| `is_published` | boolean | Publish flag |
| `published_at` | string (ISO date) \| null | Publish timestamp |
| `created_at` | string (ISO date) | Created timestamp |
| `updated_at` | string (ISO date) | Last updated timestamp |
| `category.id` | number | Category ID |
| `category.name` | string | Category name |
| `category.slug` | string | Category slug |

### Errors

| Status | Message |
|--------|---------|
| 404 | Blog not found |

---

## 7. GET `/api/admin/categories`

Admin list of all categories with blog counts.

### Response `data` (200) — array of:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Category ID |
| `name` | string | Category name |
| `slug` | string | URL slug |
| `blog_count` | number | Number of linked blogs |
| `created_at` | string (ISO date) | Created timestamp |
| `updated_at` | string (ISO date) | Updated timestamp |

### Errors

| Status | Message |
|--------|---------|
| 401 | Unauthorized |

---

## 8. POST `/api/admin/categories`

Create a new category.

### Request body

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `name` | string | Yes | min 1, max 100 | Category name |
| `slug` | string | No | max 120 | URL slug; auto-generated from `name` if omitted |

**Example:**

```json
{
  "name": "Recruitment",
  "slug": "recruitment"
}
```

### Response `data` fields (201)

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Category ID |
| `name` | string | Category name |
| `slug` | string | URL slug |
| `createdAt` | string (ISO date) | Created timestamp (camelCase) |
| `updatedAt` | string (ISO date) | Updated timestamp (camelCase) |

**Note:** Create response uses Prisma **camelCase** (`createdAt`, `updatedAt`).

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid category data |
| 401 | Unauthorized |
| 500 | Failed to create category |

---

## 9. GET `/api/admin/categories/[id]`

Get a single category by numeric ID.

### Path parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Category ID |

### Response `data` fields (200)

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Category ID |
| `name` | string | Category name |
| `slug` | string | URL slug |
| `createdAt` | string (ISO date) | Created timestamp (camelCase) |
| `updatedAt` | string (ISO date) | Updated timestamp (camelCase) |

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid id |
| 401 | Unauthorized |
| 404 | Category not found |

---

## 10. PUT `/api/admin/categories/[id]`

Update a category (partial update).

### Path parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Category ID |

### Request body

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `name` | string | No | min 1, max 100 | Updated name |
| `slug` | string | No | max 120 | Updated slug; auto-generated from `name` if `name` changes and `slug` omitted |

**Example:**

```json
{
  "name": "Updated Name",
  "slug": "updated-slug"
}
```

### Response `data` fields (200)

Same shape as GET single category (camelCase Prisma object).

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid id / Invalid category data |
| 401 | Unauthorized |
| 404 | Category not found |
| 500 | Failed to update category |

---

## 11. DELETE `/api/admin/categories/[id]`

Delete a category. Fails if blogs are linked.

### Path parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Category ID |

### Response `data` fields (200)

| Field | Type | Description |
|-------|------|-------------|
| `deleted` | boolean | Always `true` |

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid id |
| 401 | Unauthorized |
| 404 | Category not found |
| 409 | Cannot delete category with existing blogs |

---

## 12. GET `/api/admin/blogs`

Admin list of all blogs (includes drafts).

### Query parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `is_published` | `"true"` \| `"false"` | No | Filter by publish status |
| `category_id` | number | No | Filter by category ID |

**Example:** `GET /api/admin/blogs?is_published=true&category_id=1`

### Response `data` (200) — array of full blog objects (snake_case):

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Blog ID |
| `slug` | string | URL slug |
| `title` | string | Post title |
| `short_description` | string \| null | Card excerpt |
| `description` | string \| null | Detail subtitle |
| `content` | string | Full HTML body |
| `thumbnail_image` | string \| null | Thumbnail URL |
| `thumbnail_alt_text` | string \| null | Thumbnail alt |
| `banner_image` | string \| null | Banner URL |
| `banner_text` | string \| null | Hero text |
| `category_id` | number | Category ID |
| `is_published` | boolean | Draft / published flag |
| `published_at` | string (ISO date) \| null | Publish timestamp |
| `created_at` | string (ISO date) | Created timestamp |
| `updated_at` | string (ISO date) | Updated timestamp |
| `category.id` | number | Category ID |
| `category.name` | string | Category name |
| `category.slug` | string | Category slug |

### Errors

| Status | Message |
|--------|---------|
| 401 | Unauthorized |

---

## 13. POST `/api/admin/blogs`

Create a new blog post.

### Request body

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `title` | string | Yes | min 1, max 255 | Post title |
| `content` | string | Yes | min 1 | Full HTML body |
| `category_id` | number | Yes | positive integer | Category ID |
| `slug` | string | No | max 255 | URL slug; auto-generated from `title` if omitted |
| `short_description` | string \| null | No | — | Card/list excerpt |
| `description` | string \| null | No | — | Detail page subtitle |
| `thumbnail_image` | string \| null | No | max 500 | Thumbnail path (e.g. from upload) |
| `thumbnail_alt_text` | string \| null | No | max 255 | Thumbnail alt text |
| `banner_image` | string \| null | No | max 500 | Banner image path |
| `banner_text` | string \| null | No | max 500 | Hero headline |
| `is_published` | boolean | No | default `false` | Publish immediately if `true` |

**Example:**

```json
{
  "title": "My New Post",
  "slug": "my-new-post",
  "short_description": "Card excerpt text",
  "description": "Subtitle on detail page",
  "content": "<p>Full HTML body</p>",
  "thumbnail_image": "/uploads/blogs/abc.jpg",
  "thumbnail_alt_text": "Alt text",
  "banner_image": "/uploads/blogs/banner.jpg",
  "banner_text": "Hero headline",
  "category_id": 1,
  "is_published": false
}
```

### Server-side auto fields

| Field | Behavior |
|-------|----------|
| `created_by_id` | Set from logged-in admin ID |
| `updated_by_id` | Set from logged-in admin ID |
| `published_at` | Set to current time when `is_published` is `true`; otherwise `null` |

### Response `data` fields (201)

Full blog object (snake_case) — same fields as GET `/api/admin/blogs/[id]`.

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid blog data / Category not found |
| 401 | Unauthorized |
| 500 | Failed to create blog |

---

## 14. GET `/api/admin/blogs/[id]`

Get a single blog by numeric ID (includes drafts).

### Path parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Blog ID |

### Response `data` fields (200)

Full blog object (snake_case) — same fields as admin blog list item.

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid id |
| 401 | Unauthorized |
| 404 | Blog not found |

---

## 15. PUT `/api/admin/blogs/[id]`

Update a blog (partial update supported).

### Path parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Blog ID |

### Request body

Same fields as POST `/api/admin/blogs`, but **all optional** (partial update).

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `title` | string | No | min 1, max 255 |
| `content` | string | No | min 1 |
| `category_id` | number | No | positive integer |
| `slug` | string | No | max 255 |
| `short_description` | string \| null | No | — |
| `description` | string \| null | No | — |
| `thumbnail_image` | string \| null | No | max 500 |
| `thumbnail_alt_text` | string \| null | No | max 255 |
| `banner_image` | string \| null | No | max 500 |
| `banner_text` | string \| null | No | max 500 |
| `is_published` | boolean | No | — |

**Example:**

```json
{
  "title": "Updated title",
  "is_published": true
}
```

### Server-side behavior on update

| Field | Behavior |
|-------|----------|
| `updated_by_id` | Set from logged-in admin ID |
| `published_at` | Set on first publish; cleared when unpublished |

### Response `data` fields (200)

Updated full blog object (snake_case).

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid id / Invalid blog data / Category not found |
| 401 | Unauthorized |
| 404 | Blog not found |
| 500 | Failed to update blog |

---

## 16. DELETE `/api/admin/blogs/[id]`

Delete a blog by ID.

### Path parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Blog ID |

### Response `data` fields (200)

| Field | Type | Description |
|-------|------|-------------|
| `deleted` | boolean | Always `true` |

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid id |
| 401 | Unauthorized |
| 404 | Blog not found |

---

## 17. POST `/api/admin/upload`

Upload an image for blog thumbnail or banner.

### Content-Type

`multipart/form-data`

### Form fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | Image file |

### File constraints

| Rule | Value |
|------|-------|
| Allowed MIME types | `image/jpeg`, `image/png`, `image/webp`, `image/gif` |
| Max size | 5 MB |

### Response `data` fields (200)

| Field | Type | Description |
|-------|------|-------------|
| `url` | string | Public path, e.g. `/uploads/blogs/<uuid>.jpg` |

**Example:**

```json
{
  "success": true,
  "data": {
    "url": "/uploads/blogs/3f2a1b4c-....jpg"
  }
}
```

Full URL example: `http://localhost:3000/uploads/blogs/3f2a1b4c-....jpg`

Use the returned `url` in `thumbnail_image` or `banner_image` when creating/updating a blog.

### Errors

| Status | Message |
|--------|---------|
| 400 | No file provided / Invalid file type / File too large |
| 401 | Unauthorized |
| 500 | Upload failed |

---

## Database models (field reference)

### `login` (admin)

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `name` | varchar(100) | Admin username |
| `email` | varchar(255) | Unique email |
| `hash_password` | varchar(255) | Bcrypt password hash |
| `created_at` | datetime | Created timestamp |
| `updated_at` | datetime | Updated timestamp |

### `categories`

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `name` | varchar(100) | Category name |
| `slug` | varchar(120) | Unique URL slug |
| `created_at` | datetime | Created timestamp |
| `updated_at` | datetime | Updated timestamp |

### `blogs`

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `slug` | varchar(255) | Unique URL slug |
| `title` | varchar(255) | Post title |
| `short_description` | text | Card excerpt |
| `description` | text | Detail subtitle |
| `content` | longtext | Full HTML body |
| `thumbnail_image` | varchar(500) | Thumbnail path |
| `thumbnail_alt_text` | varchar(255) | Thumbnail alt |
| `banner_image` | varchar(500) | Banner path |
| `banner_text` | varchar(500) | Hero text |
| `category_id` | int | FK → categories |
| `is_published` | boolean | Default `false` |
| `published_at` | datetime | Nullable |
| `created_by_id` | int | FK → login |
| `updated_by_id` | int | FK → login (nullable) |
| `created_at` | datetime | Created timestamp |
| `updated_at` | datetime | Updated timestamp |

---

## HTTP status codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Validation / bad request |
| 401 | Unauthorized (admin routes or `/api/auth/me`) |
| 404 | Not found |
| 409 | Conflict (delete category with blogs) |
| 500 | Server error |

---

## Default test credentials (after seed)

| Field | Value |
|-------|-------|
| Email | `admin@nexellence.net` |
| Username | `Admin` |
| Password | `admin123` (or `ADMIN_PASSWORD` in `.env`) |

---

## 18. POST `/api/pricing/inquiry/draft`

Save email when user completes step 1 of the custom pricing wizard. Upserts a `draft` inquiry.

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Valid email address |
| `inquiryId` | number | No | Existing draft ID when updating email |

### Response `data` fields (200 / 201)

| Field | Type | Description |
|-------|------|-------------|
| `inquiryId` | number | Draft inquiry ID |
| `email` | string | Normalized email |

---

## 19. POST `/api/pricing/inquiry`

Submit full custom pricing inquiry with calculated estimate. Marks inquiry as `submitted`.

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `inquiryId` | number | Yes | Draft inquiry ID from step 1 |
| `email` | string | Yes | User email |
| `services` | string[] | Yes | Min 1 service ID |
| `weeklyHours` | 20 \| 30 \| 40 | Yes | Weekly hours |
| `durationType` | `"short"` \| `"long"` | Yes | Project duration type |
| `months` | number | Yes | 1–6 if short; 7+ if long |
| `skillLevel` | `"fresher"` \| `"intermediate"` \| `"expert"` | Yes | Skill level |
| `message` | string | No | Optional message |

### Response `data` fields (200)

| Field | Type | Description |
|-------|------|-------------|
| `inquiryId` | number | Submitted inquiry ID |
| `email` | string | User email |
| `pricing.lineItems` | array | Estimate line items |
| `pricing.discount` | number | Discount in USD |
| `pricing.subtotal` | number | Subtotal in USD |
| `pricing.total` | number | Final estimate in USD |

---

## Suggested Postman test order

1. `POST /api/auth/login`
2. `GET /api/auth/me`
3. `GET /api/categories`
4. `GET /api/blogs`
5. `GET /api/blogs/{slug}`
6. `GET /api/admin/categories`
7. `POST /api/admin/categories`
8. `POST /api/admin/upload`
9. `POST /api/admin/blogs`
10. `PUT /api/admin/blogs/{id}`
11. `DELETE /api/admin/blogs/{id}`
12. `POST /api/auth/logout`
13. `POST /api/pricing/inquiry/draft`
14. `POST /api/pricing/inquiry`

---

## Source files

| Route group | File path |
|-------------|-----------|
| Auth | `app/api/auth/login/route.ts`, `logout/route.ts`, `me/route.ts` |
| Public | `app/api/categories/route.ts`, `app/api/blogs/route.ts`, `app/api/blogs/[slug]/route.ts` |
| Admin | `app/api/admin/categories/route.ts`, `app/api/admin/categories/[id]/route.ts` |
| Admin blogs | `app/api/admin/blogs/route.ts`, `app/api/admin/blogs/[id]/route.ts` |
| Upload | `app/api/admin/upload/route.ts` |
| Pricing inquiry | `app/api/pricing/inquiry/draft/route.ts`, `app/api/pricing/inquiry/route.ts` |
| Validations | `lib/validations.ts` |
| Serializers | `lib/blog-queries.ts` |
