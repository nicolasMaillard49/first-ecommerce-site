import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5433/geestock_dev';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed product
  await prisma.product.upsert({
    where: { slug: 'clipbag-magnetic-bottle-bag' },
    update: {
      images: [
        '/images/product/product-1.png',
        '/images/product/product-2.png',
        '/images/product/product-3.png',
        '/images/product/product-4.png',
        '/images/product/product-5.png',
        '/images/product/product-6.png',
      ],
    },
    create: {
      name: 'ClipBag - Sac Magnétique pour Bouteille',
      slug: 'clipbag-magnetic-bottle-bag',
      description:
        "Le sac magnétique révolutionnaire pour vos bouteilles d'eau. Conçu pour les sportifs et aventuriers, il se fixe instantanément grâce à sa technologie magnétique puissante. Libérez vos mains pendant vos séances de sport, randonnées ou déplacements quotidiens.",
      price: 29.99,
      comparePrice: 49.99,
      costPrice: 0,
      images: [
        '/images/product/product-1.png',
        '/images/product/product-2.png',
        '/images/product/product-3.png',
        '/images/product/product-4.png',
        '/images/product/product-5.png',
        '/images/product/product-6.png',
      ],
      variants: {
        colors: [
          { name: 'Noir', value: 'black' },
          { name: 'Bleu', value: 'blue' },
          { name: 'Vert', value: 'green' },
          { name: 'Rouge', value: 'red' },
        ],
      },
      active: true,
    },
  });

  // Seed admin (uses env vars in production)
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@clipbag.shop';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
    },
  });

  console.log(`Seed completed — admin: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
