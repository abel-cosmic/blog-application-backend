import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// const userData: Prisma.UserCreateInput[] = [
//   {
// TODO: add example user to seed
// ]

async function main() {
  console.log(`Start seeding ...`);
  // TODO: add  a logic to add the user to the database
  //   for (const u of userData) {
  //     const user = await prisma.user.create({
  //       data: u,
  //     })
  //     console.log(`Created user with id: ${user.id}`)
  //   }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
