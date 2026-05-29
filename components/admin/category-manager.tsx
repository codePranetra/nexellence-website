"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export type CategoryRow = {
  id: number;
  name: string;
  slug: string;
  blog_count: number;
};

export function CategoryManager({ initial }: { initial: CategoryRow[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initial);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function refresh() {
    const res = await fetch("/api/admin/categories");
    const json = await res.json();
    if (json.success) setCategories(json.data);
    router.refresh();
  }

  async function createCategory(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message ?? "Failed");
      setName("");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id: number) {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok || !json.success) {
      alert(json.message ?? "Cannot delete");
      return;
    }
    await refresh();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={createCategory} className="flex flex-wrap gap-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="min-w-[200px] flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-orange/50"
        />
        <Button type="submit" disabled={loading} className="bg-brand-orange text-white">
          Add category
        </Button>
      </form>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <ul className="divide-y divide-white/10 rounded-xl border border-white/10">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center justify-between gap-4 px-4 py-3">
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-white/50">
                /{c.slug} · {c.blog_count} blog(s)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={c.blog_count > 0}
              onClick={() => deleteCategory(c.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
