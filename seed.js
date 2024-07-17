import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const categories = Array.from({ length: 100 }).map(() => ({
    name:
      Math.random() < 0.5
        ? faker.word.adjective().charAt(0).toUpperCase() +
          faker.word.adjective().slice(1) +
          " " +
          faker.commerce.department()
        : faker.commerce.department() +
          " " +
          faker.word.adjective().charAt(0).toUpperCase() +
          faker.word.adjective().slice(1),
  }));
  console.log(categories);
  await prisma.category.createMany({ data: categories });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
