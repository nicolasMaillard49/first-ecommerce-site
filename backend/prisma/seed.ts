import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/geestock_dev';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed product
  await prisma.product.upsert({
    where: { slug: 'geestock-magnetic-bottle-bag' },
    update: {},
    create: {
      name: 'Geestock Sac Magnétique pour Bouteille',
      slug: 'geestock-magnetic-bottle-bag',
      description:
        "Le sac magnétique révolutionnaire pour vos bouteilles d'eau. Conçu pour les sportifs et aventuriers, il se fixe instantanément grâce à sa technologie magnétique puissante. Libérez vos mains pendant vos séances de sport, randonnées ou déplacements quotidiens.",
      price: 29.99,
      comparePrice: 49.99,
      images: [
        '/images/product/product-1.jpg',
        '/images/product/product-2.jpg',
        '/images/product/product-3.jpg',
        '/images/product/product-4.jpg',
        '/images/product/product-5.jpg',
        '/images/product/product-6.jpg',
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

  // Seed admin
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@geestock.fr' },
    update: {},
    create: {
      email: 'admin@geestock.fr',
      passwordHash,
    },
  });

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
