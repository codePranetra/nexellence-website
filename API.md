# Nexellence Blog CMS — API Reference

**Base URL (local):** `http://localhost:3000`

**Content-Type:** `application/json` (except upload)

**Response envelope (all routes):**

```json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "message": "Error description" }
```

---

## Auth (admin)

Admin routes use an **httpOnly cookie** named `admin_token` (set on login, ~8 hours).

For browser / Next.js: always send requests with `credentials: "include"`.

For Postman: enable **Cookies** → login first → cookie is sent automatically on later requests.

---

### POST `/api/auth/login`

**Auth:** None

**Body:**

```json
{
  "id": 1,
  "password": "admin123"
}
```

| Field | Type | Required |
|-------|------|----------|
| id | number | yes |
| password | string | yes |

**Success `200`:**

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

**Errors:** `400` invalid body · `401` wrong credentials

**Side effect:** Sets `admin_token` cookie.

---

### POST `/api/auth/logout`

**Auth:** Cookie

**Body:** none

**Success `200`:**

```json
{
  "success": true,
  "data": { "loggedOut": true }
}
```

---

### GET `/api/auth/me`

**Auth:** Cookie

**Success `200`:**

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

**Error `401`:** not logged in

---

## Public APIs (no auth)

Only blogs with `is_published = true` are returned.

---

### GET `/api/categories`

**Query:** none

**Success `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Blog",
      "slug": "blog"
    }
  ]
}
```

---

### GET `/api/blogs`

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| category_slug | string | optional filter |
| page | number | default `1` |
| limit | number | default `50`, max `100` |

**Example:** `GET /api/blogs?category_slug=blog&page=1&limit=10`

**Success `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "slug": "advanced-rpo-solutions-solving-hiring-gaps",
      "title": "How Advanced RPO Solutions Are Solving Modern Hiring Gaps",
      "short_description": "The hiring landscape has changed...",
      "thumbnail_image": "https://images.unsplash.com/...",
      "thumbnail_alt_text": "How Advanced RPO Solutions...",
      "is_published": true,
      "published_at": "2026-05-29T09:52:18.000Z",
      "created_at": "2026-05-29T09:52:18.000Z",
      "category": {
        "id": 1,
        "name": "Blog",
        "slug": "blog"
      }
    }
  ]
}
```

Note: list items do **not** include `content`, `description`, `banner_image`, etc.

---

### GET `/api/blogs/[slug]`

**Example:** `GET /api/blogs/advanced-rpo-solutions-solving-hiring-gaps`

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "slug": "advanced-rpo-solutions-solving-hiring-gaps",
    "title": "How Advanced RPO Solutions Are Solving Modern Hiring Gaps",
    "short_description": "...",
    "description": null,
    "content": "<p>...</p>",
    "thumbnail_image": "https://...",
    "thumbnail_alt_text": "...",
    "banner_image": "https://...",
    "banner_text": null,
    "category_id": 1,
    "is_published": true,
    "published_at": "2026-05-29T09:52:18.000Z",
    "created_at": "2026-05-29T09:52:18.000Z",
    "updated_at": "2026-05-29T09:52:18.000Z",
    "category": {
      "id": 1,
      "name": "Blog",
      "slug": "blog"
    }
  }
}
```

**Error `404`:** not found or not published

---

## Admin APIs (cookie required)

All require `admin_token` cookie. **Error `401`** if missing/invalid.

---

### GET `/api/admin/categories`

**Success `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Blog",
      "slug": "blog",
      "blog_count": 4,
      "created_at": "2026-05-29T09:52:18.000Z",
      "updated_at": "2026-05-29T09:52:18.000Z"
    }
  ]
}
```

---

### POST `/api/admin/categories`

**Body:**

```json
{
  "name": "Recruitment",
  "slug": "recruitment"
}
```

| Field | Type | Required |
|-------|------|----------|
| name | string | yes (max 100) |
| slug | string | no (auto-generated from name if omitted) |

**Success `201`:**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Recruitment",
    "slug": "recruitment",
    "createdAt": "2026-05-29T10:00:00.000Z",
    "updatedAt": "2026-05-29T10:00:00.000Z"
  }
}
```

Note: create/update single category responses use Prisma **camelCase** (`createdAt`, `updatedAt`).

---

### GET `/api/admin/categories/[id]`

**Example:** `GET /api/admin/categories/1`

**Success `200`:** same shape as create (camelCase Prisma object)

**Errors:** `400` invalid id · `404` not found

---

### PUT `/api/admin/categories/[id]`

**Body (all optional, at least one field):**

```json
{
  "name": "Updated Name",
  "slug": "updated-slug"
}
```

**Success `200`:** updated category (camelCase)

---

### DELETE `/api/admin/categories/[id]`

**Success `200`:**

```json
{
  "success": true,
  "data": { "deleted": true }
}
```

**Error `409`:** category has linked blogs

---

### GET `/api/admin/blogs`

**Query:**

| Param | Type | Description |
|-------|------|-------------|
| is_published | `true` \| `false` | optional filter |
| category_id | number | optional filter |

**Example:** `GET /api/admin/blogs?is_published=true&category_id=1`

**Success `200`:** array of full blog objects (snake_case, includes drafts):

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "slug": "welcome-to-nexellence-blog",
      "title": "Welcome to Nexellence Blog",
      "short_description": "...",
      "description": "...",
      "content": "<p>...</p>",
      "thumbnail_image": null,
      "thumbnail_alt_text": "...",
      "banner_image": null,
      "banner_text": "Nexellence Insights",
      "category_id": 1,
      "is_published": true,
      "published_at": "...",
      "created_at": "...",
      "updated_at": "...",
      "category": { "id": 1, "name": "Blog", "slug": "blog" }
    }
  ]
}
```

---

### POST `/api/admin/blogs`

**Body:**

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

| Field | Type | Required |
|-------|------|----------|
| title | string | yes |
| content | string | yes |
| category_id | number | yes |
| slug | string | no (auto from title) |
| short_description | string \| null | no |
| description | string \| null | no |
| thumbnail_image | string \| null | no |
| thumbnail_alt_text | string \| null | no |
| banner_image | string \| null | no |
| banner_text | string \| null | no |
| is_published | boolean | no (default `false`) |

**Success `201`:** full blog object (snake_case) as in GET detail.

Server sets: `created_by_id`, `updated_by_id`, `published_at` (when publishing).

---

### GET `/api/admin/blogs/[id]`

**Example:** `GET /api/admin/blogs/2`

**Success `200`:** full blog by numeric id (includes drafts).

**Errors:** `400` · `404`

---

### PUT `/api/admin/blogs/[id]`

**Body:** same fields as POST; all optional except validation still requires valid types when sent. Partial update supported.

```json
{
  "title": "Updated title",
  "is_published": true
}
```

**Success `200`:** updated blog (snake_case).

---

### DELETE `/api/admin/blogs/[id]`

**Success `200`:**

```json
{
  "success": true,
  "data": { "deleted": true }
}
```

---

### POST `/api/admin/upload`

**Content-Type:** `multipart/form-data`

**Form field:** `file` (image file)

**Allowed types:** JPEG, PNG, WebP, GIF · max **5MB**

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "url": "/uploads/blogs/3f2a1b4c-....jpg"
  }
}
```

Use returned `url` in `thumbnail_image` or `banner_image` when creating/updating a blog.

Full image URL example: `http://localhost:3000/uploads/blogs/3f2a1b4c-....jpg`

---

## Postman testing order

1. `POST /api/auth/login` with `{ "id": 1, "password": "admin123" }`
2. `GET /api/auth/me` (verify cookie)
3. Public: `GET /api/categories`, `GET /api/blogs`, `GET /api/blogs/{slug}`
4. Admin: categories CRUD → upload → blogs CRUD
5. `POST /api/auth/logout`

---

## Default test credentials (after seed)

| Field | Value |
|-------|-------|
| Admin ID | `1` |
| Password | `admin123` (or `ADMIN_PASSWORD` in `.env`) |

---

## HTTP status codes summary

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Validation / bad request |
| 401 | Unauthorized (admin routes) |
| 404 | Not found |
| 409 | Conflict (e.g. delete category with blogs) |
| 500 | Server error |
