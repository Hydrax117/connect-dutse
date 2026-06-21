import { PrismaClient, CategoryType } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const productCategories = [
    { name: "Electronics", slug: "electronics", icon: "📱" },
    { name: "Fashion & Clothing", slug: "fashion-clothing", icon: "👕" },
    { name: "Furniture & Home", slug: "furniture-home", icon: "🪑" },
    { name: "Vehicles & Parts", slug: "vehicles-parts", icon: "🚗" },
    { name: "Food & Agriculture", slug: "food-agriculture", icon: "🌾" },
    { name: "Books & Education", slug: "books-education", icon: "📚" },
    { name: "Sports & Fitness", slug: "sports-fitness", icon: "⚽" },
    { name: "Baby & Kids", slug: "baby-kids", icon: "🧸" },
  ];

  const serviceCategories = [
    { name: "Artisans & Craftsmen", slug: "artisans-craftsmen", icon: "🔨" },
    { name: "Repairs & Maintenance", slug: "repairs-maintenance", icon: "🧰" },
    { name: "Tailoring & Fashion", slug: "tailoring-fashion", icon: "🧵" },
    { name: "Photography & Video", slug: "photography-video", icon: "📷" },
    { name: "Cleaning Services", slug: "cleaning-services", icon: "🧹" },
    { name: "Tutoring & Education", slug: "tutoring-education", icon: "🎓" },
    { name: "Health & Wellness", slug: "health-wellness", icon: "💊" },
    { name: "Transport & Logistics", slug: "transport-logistics", icon: "🚚" },
    { name: "Beauty & Personal Care", slug: "beauty-personal-care", icon: "💇" },
    { name: "IT & Tech Support", slug: "it-tech-support", icon: "💻" },
  ];

  for (const cat of productCategories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, type: CategoryType.PRODUCT },
    });
  }

  for (const cat of serviceCategories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, type: CategoryType.SERVICE },
    });
  }

  console.log(
    `Seeded ${productCategories.length} product categories and ${serviceCategories.length} service categories.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
