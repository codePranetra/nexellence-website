import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    include: { category: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button asChild className="bg-brand-orange text-white">
          <Link href="/admin/blogs/new">New blog</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-white/50">
                  No blogs yet. Create your first post.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-t border-white/5">
                  <td className="px-4 py-3 font-medium">{blog.title}</td>
                  <td className="px-4 py-3 text-white/60">{blog.category.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        blog.isPublished
                          ? "text-green-400"
                          : "text-yellow-400"
                      }
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/blogs/${blog.id}/edit`}
                      className="text-brand-orange hover:underline"
                    >
                      Edit
                    </Link>
                    {blog.isPublished && (
                      <>
                        {" · "}
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="text-white/50 hover:text-white"
                          target="_blank"
                        >
                          View
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
