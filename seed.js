import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const categories = Array.from({ length: 100 }).map(() => ({
    name: faker.commerce.department(),
  }));
  console.log(categories);
  await prisma.category.createMany({ data: categories });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
