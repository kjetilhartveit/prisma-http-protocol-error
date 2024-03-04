import { PrismaClient } from "@prisma/client";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { Client } from "@planetscale/database";

const client = new Client({ url: process.env.DATABASE_URL });
const adapter = new PrismaPlanetScale(client);
const prisma = new PrismaClient({
    log: ["error", "warn"],
    adapter,
});

// source: https://www.prisma.io/docs/concepts/components/prisma-client/crud#delete-all-records-from-all-tables
const transactions = [];
transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

const tablenames = await prisma.$queryRaw`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE();`;

for (const { TABLE_NAME } of tablenames) {
    if (TABLE_NAME !== "_prisma_migrations") {
        transactions.push(
            prisma.$executeRawUnsafe(`TRUNCATE TABLE ${TABLE_NAME};`),
        );
    }
}

transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);

await prisma.$transaction(transactions);

console.log('Everything is fine 😅');
