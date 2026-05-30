import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const LEGACY_POSTS = [
  {
    slug: "advanced-rpo-solutions-solving-hiring-gaps",
    title: "How Advanced RPO Solutions Are Solving Modern Hiring Gaps",
    shortDescription:
      "The hiring landscape has changed significantly in recent years, making recruitment more challenging for businesses across different industries.",
    thumbnailImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
    isPublished: true,
  },
  {
    slug: "enterprise-growth-smarter-rpo-models",
    title: "Why Enterprise Growth Now Depends on Smarter RPO Models",
    shortDescription:
      "Business expansion is driven by speed, adaptability, and access to exceptional professionals. Traditional recruitment structures are no longer enough.",
    thumbnailImage:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    isPublished: true,
  },
  {
    slug: "strategic-rpo-shift-modern-businesses",
    title: "The Strategic RPO Shift Modern Businesses Can't Ignore",
    shortDescription:
      "Hiring today is no longer just an HR function—it has become a major business decision that directly impacts growth and productivity.",
    thumbnailImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    isPublished: true,
  },
];

async function main() {
  const adminId = Number(process.env.ADMIN_ID ?? "1");
  const adminName = process.env.ADMIN_NAME ?? "Admin";
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@nexellence.net";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  const hashPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.login.upsert({
    where: { id: adminId },
    update: {
      name: adminName,
      email: adminEmail,
      hashPassword,
    },
    create: {
      id: adminId,
      name: adminName,
      email: adminEmail,
      hashPassword,
    },
  });

  const blogCategory = await prisma.category.upsert({
    where: { slug: "blog" },
    update: { name: "Blog" },
    create: { name: "Blog", slug: "blog" },
  });

  for (const post of LEGACY_POSTS) {
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        shortDescription: post.shortDescription,
        thumbnailImage: post.thumbnailImage,
        isPublished: post.isPublished,
        updatedById: adminId,
      },
      create: {
        slug: post.slug,
        title: post.title,
        shortDescription: post.shortDescription,
        description: null,
        content: `<p>${post.shortDescription}</p>`,
        thumbnailImage: post.thumbnailImage,
        thumbnailAltText: post.title,
        bannerImage: post.thumbnailImage,
        bannerText: null,
        categoryId: blogCategory.id,
        isPublished: post.isPublished,
        publishedAt: new Date(),
        createdById: adminId,
        updatedById: adminId,
      },
    });
  }

  console.log("Seed complete.");
  console.log(
    `Admin login — email: ${adminEmail}, username: ${adminName}, password: (from ADMIN_PASSWORD env)`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
