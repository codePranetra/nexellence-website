"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export type CategoryOption = { id: number; name: string; slug: string };

export type BlogFormValues = {
  id?: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  content: string;
  thumbnail_image: string;
  thumbnail_alt_text: string;
  banner_image: string;
  banner_text: string;
  category_id: number;
  is_published: boolean;
};

type Props = {
  initial: BlogFormValues;
  categories: CategoryOption[];
  mode: "create" | "edit";
};

export function BlogForm({ initial, categories, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<"thumbnail" | "banner" | null>(null);

  function update<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadImage(file: File, target: "thumbnail" | "banner") {
    setUploading(target);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Upload failed");
      }
      if (target === "thumbnail") update("thumbnail_image", json.data.url);
      else update("banner_image", json.data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url =
        mode === "create" ? "/api/admin/blogs" : `/api/admin/blogs/${initial.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug || undefined,
          short_description: form.short_description || null,
          description: form.description || null,
          content: form.content,
          thumbnail_image: form.thumbnail_image || null,
          thumbnail_alt_text: form.thumbnail_alt_text || null,
          banner_image: form.banner_image || null,
          banner_text: form.banner_text || null,
          category_id: form.category_id,
          is_published: form.is_published,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Save failed");
      }
      router.push("/admin/blogs");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title *">
          <input
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Slug">
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="auto-generated if empty"
            className={inputClass}
          />
        </Field>
        <Field label="Category *">
          <select
            required
            value={form.category_id}
            onChange={(e) => update("category_id", Number(e.target.value))}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Published">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => update("is_published", e.target.checked)}
            />
            Visible on public blog
          </label>
        </Field>
      </div>

      <Field label="Short description">
        <textarea
          rows={2}
          value={form.short_description}
          onChange={(e) => update("short_description", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Description">
        <textarea
          rows={2}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Content (HTML) *">
        <textarea
          required
          rows={12}
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Thumbnail image">
          <input
            value={form.thumbnail_image}
            onChange={(e) => update("thumbnail_image", e.target.value)}
            className={inputClass}
            placeholder="/uploads/blogs/..."
          />
          <input
            type="file"
            accept="image/*"
            className="mt-2 text-sm"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadImage(f, "thumbnail");
            }}
          />
          {uploading === "thumbnail" && (
            <p className="text-xs text-white/50">Uploading...</p>
          )}
        </Field>
        <Field label="Thumbnail alt text">
          <input
            value={form.thumbnail_alt_text}
            onChange={(e) => update("thumbnail_alt_text", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Banner image">
          <input
            value={form.banner_image}
            onChange={(e) => update("banner_image", e.target.value)}
            className={inputClass}
          />
          <input
            type="file"
            accept="image/*"
            className="mt-2 text-sm"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadImage(f, "banner");
            }}
          />
          {uploading === "banner" && <p className="text-xs text-white/50">Uploading...</p>}
        </Field>
        <Field label="Banner text">
          <input
            value={form.banner_text}
            onChange={(e) => update("banner_text", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="bg-brand-orange text-white">
          {loading ? "Saving..." : mode === "create" ? "Create blog" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-white/80">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/50";
