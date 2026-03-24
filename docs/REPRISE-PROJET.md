# Geestock - Reprise du Projet

> Document de reprise pour continuer le developpement sur un autre poste.
> Derniere mise a jour : 24 mars 2026

---

## 1. Presentation du projet

**Geestock** est un site e-commerce mono-produit (dropshipping) pour un sac magnetique pour bouteille.

- **Produit** : Sac Magnetique pour Bouteille - 29,99 EUR (prix barre 49,99 EUR, -40%)
- **Langue** : Francais uniquement
- **Domaine cible** : geestock.fr
- **Style** : Sport/Fitness moderne, theme sombre, couleur brand emerald (#10b981)

---

## 2. Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Backend | NestJS | 11.x |
| Frontend | Nuxt 3 | 3.21.x |
| CSS | Tailwind CSS (via @nuxtjs/tailwindcss) | v3 (module v6.14) |
| State | Pinia | 3.x |
| ORM | Prisma | 7.5 (avec PrismaPg adapter) |
| BDD | PostgreSQL | 16 Alpine (Docker) |
| Paiement | Stripe (mode test) | SDK v20.4 |
| Auth | JWT (@nestjs/jwt) | 11.x |
| Securite | helmet, @nestjs/throttler, class-validator | |
| Runtime | Node.js | v24+ (attention: commonjs obligatoire, pas nodenext) |

---

## 3. Architecture des fichiers

```
first-ecommerce-site/
├── docker-compose.yml          # PostgreSQL 16 Alpine
├── docs/
│   ├── plans/                  # Design docs et plans d'implementation
│   └── recommendations/        # Docs strategie (prix, ads, logistique, etc.)
│
├── backend/                    # NestJS API (port 3001, prefix /api)
│   ├── .env                    # Variables d'environnement (voir section 5)
│   ├── tsconfig.json           # IMPORTANT: module=commonjs, pas nodenext
│   ├── prisma/
│   │   ├── schema.prisma       # Schema BDD (Product, Order, OrderItem, Admin)
│   │   └── seed.ts             # Seed produit + admin
│   ├── generated/prisma/       # Client Prisma genere (ne pas modifier)
│   └── src/
│       ├── main.ts             # Bootstrap: helmet, cors, validation, prefix /api
│       ├── app.module.ts       # Modules: Config, Throttler, Prisma, Products, Payments, Auth, Admin, Health
│       ├── prisma/             # PrismaService (global)
│       ├── products/           # CRUD produit (GET /api/products, GET /api/products/:slug)
│       ├── payments/           # Stripe checkout + webhook
│       │   └── dto/create-checkout.dto.ts  # productId + quantity seulement (1-click)
│       ├── auth/               # POST /api/auth/login (JWT)
│       │   └── dto/login.dto.ts
│       ├── admin/              # CRUD admin (protege par AuthGuard JWT)
│       │   └── dto/            # update-order-status, update-product
│       └── health/             # GET /api/health (status + DB check)
│
└── frontend/                   # Nuxt 3 (port 3000)
    ├── nuxt.config.ts          # SEO, OG tags, route rules, Tailwind + Pinia modules
    ├── tailwind.config.ts      # Theme: brand (emerald), surface (dark), fonts (Inter + Montserrat)
    ├── app.vue                 # Layout + JSON-LD Product schema
    ├── composables/
    │   └── useApi.ts           # Helper $fetch vers backend
    ├── stores/
    │   ├── product.ts          # Store produit
    │   ├── cart.ts             # Store panier
    │   └── auth.ts             # Store auth admin (JWT localStorage)
    ├── components/
    │   ├── SiteNavbar.vue      # Navbar flottante + mobile slide-in
    │   ├── HeroSection.vue     # Hero 2 colonnes, badge social proof
    │   ├── ProblemSection.vue  # Avant/Apres avec cartes gradient
    │   ├── FeaturesSection.vue # 3 colonnes, 6 features, hover glow
    │   ├── GallerySection.vue  # Galerie zoom, fleches, keyboard nav
    │   ├── TestimonialsSection.vue  # 6 temoignages, carousel mobile
    │   ├── OrderSection.vue    # 1-click checkout (quantite + bouton Commander)
    │   ├── LiveViewers.vue     # Widget "X personnes regardent ce produit"
    │   ├── FaqSection.vue      # Accordion FAQ, 6 questions
    │   └── SiteFooter.vue      # 4 colonnes, paiement, social, legal
    ├── pages/
    │   ├── index.vue           # Page principale (toutes les sections)
    │   ├── success.vue         # Page post-paiement reussi
    │   ├── cancel.vue          # Page annulation paiement
    │   ├── mentions-legales.vue
    │   ├── cgv.vue
    │   ├── confidentialite.vue
    │   └── admin/
    │       ├── login.vue       # Login admin
    │       ├── index.vue       # Dashboard admin
    │       ├── orders.vue      # Gestion commandes
    │       └── product.vue     # Edition produit
    └── assets/css/main.css     # Animations scroll, pulse-glow, scrollbar-hide
```

---

## 4. Schema de base de donnees (Prisma)

```prisma
model Product {
  id, name, slug (unique), description, price, comparePrice?, images[], variants (Json?), active, timestamps
  → relation: OrderItem[]
}

model Order {
  id, status (enum PENDING/PAID/PROCESSING/SHIPPED/DELIVERED/CANCELLED)
  customerEmail, customerName, shippingAddress (Json)
  total, stripeSessionId? (unique), stripePaymentId?
  → relation: OrderItem[]
  → index: status, createdAt, customerEmail
}

model OrderItem {
  id, orderId, productId, quantity, price, variant?
  → index: orderId, productId
}

model Admin {
  id, email (unique), passwordHash, createdAt
}
```

---

## 5. Variables d'environnement (.env backend)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/geestock_dev"
STRIPE_SECRET_KEY="sk_test_PLACEHOLDER"        # Remplacer par ta cle Stripe test
STRIPE_WEBHOOK_SECRET="whsec_PLACEHOLDER"      # stripe listen --forward-to localhost:3001/api/payments/webhook
JWT_SECRET="dev-jwt-secret-change-in-prod"      # Changer en prod
FRONTEND_URL="http://localhost:3000"
```

**Frontend** (`nuxt.config.ts` runtimeConfig) :
- `apiBase` = `http://localhost:3001/api`
- `siteUrl` = `https://geestock.fr`

---

## 6. Demarrage rapide (nouveau PC)

### Prerequis
- Node.js v24+ (ou v20+)
- Docker Desktop
- Git

### Etapes

```bash
# 1. Cloner le repo
git clone <repo-url>
cd first-ecommerce-site

# 2. Lancer PostgreSQL
docker compose up -d
# Attendre que le healthcheck passe (pg_isready)

# 3. Backend
cd backend
npm install
cp .env.example .env   # ou creer .env avec les valeurs de la section 5
npx prisma generate     # Generer le client Prisma
npx prisma migrate dev  # Appliquer les migrations
npx tsx prisma/seed.ts  # Seed: produit + admin (admin@geestock.fr / admin123)
npm run start:dev       # Demarre sur http://localhost:3001

# 4. Verifier le backend
curl http://localhost:3001/api/health
# Doit retourner: {"status":"ok","database":"connected",...}

# 5. Frontend (dans un autre terminal)
cd frontend
npm install
npm run dev             # Demarre sur http://localhost:3000
```

---

## 7. Points d'API principaux

| Methode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | /api/health | Non | Health check + DB status |
| GET | /api/products | Non | Liste des produits actifs |
| GET | /api/products/:slug | Non | Detail produit par slug |
| POST | /api/payments/create-checkout | Non | Cree une session Stripe (body: `{productId, quantity}`) |
| POST | /api/payments/webhook | Non | Webhook Stripe (raw body + signature) |
| GET | /api/payments/session/:id | Non | Statut d'une session Stripe |
| POST | /api/auth/login | Non | Login admin (body: `{email, password}`) → JWT |
| GET | /api/admin/orders | JWT | Liste des commandes |
| PUT | /api/admin/orders/:id/status | JWT | Maj statut commande |
| GET | /api/admin/product | JWT | Detail produit (admin) |
| PUT | /api/admin/product/:id | JWT | Maj produit |

**Rate limiting** : 60 requetes / 60 secondes (global, ThrottlerGuard).

---

## 8. Fonctionnalites implementees

### Frontend
- [x] Landing page mono-produit, theme sombre premium
- [x] Sections: Hero, Probleme, Features, Galerie, Temoignages, Commande, FAQ, Footer
- [x] Navbar flottante avec liens ancre + menu mobile
- [x] **1-click checkout** : pas de formulaire, Stripe gere l'adresse de livraison
- [x] **Widget "Live Viewers"** : "X personnes regardent ce produit" (3-15, mise a jour 30-60s)
- [x] Countdown timer (urgence)
- [x] Badge -40% sur l'image produit
- [x] Bouton CTA flottant mobile
- [x] Animations scroll (IntersectionObserver)
- [x] Pages legales : Mentions legales, CGV, Politique de confidentialite
- [x] Pages post-paiement : Success (avec recap commande), Cancel
- [x] Panel admin : Login, Dashboard, Commandes, Edition produit
- [x] SEO : meta OG/Twitter, JSON-LD Product schema, canonical, robots.txt
- [x] Route rules : SWR caching, admin en CSR only
- [x] Gestion erreurs reseau (ERR_CONNECTION_REFUSED)

### Backend
- [x] API RESTful NestJS avec prefix /api
- [x] Prisma 7 + PrismaPg adapter + PostgreSQL Docker
- [x] Stripe Checkout Sessions avec shipping_address_collection (France)
- [x] Webhook Stripe : remplit customerEmail, customerName, shippingAddress depuis la session
- [x] Auth JWT pour le panel admin
- [x] Validation DTO (class-validator, whitelist, forbidNonWhitelisted)
- [x] Securite : helmet, CORS configure, rate limiting (60/60s)
- [x] Health endpoint avec check DB
- [x] Indexes DB sur Order et OrderItem

---

## 9. Identifiants par defaut (dev)

| Service | Identifiant | Mot de passe |
|---------|------------|--------------|
| PostgreSQL | postgres | postgres |
| Admin panel | admin@geestock.fr | admin123 |

---

## 10. Decisions techniques importantes

### tsconfig.json du backend
**CRITIQUE** : Utiliser `"module": "commonjs"` et `"moduleResolution": "node"`. Le mode `"nodenext"` cause un crash Prisma 7 sur Node.js v24 (`ReferenceError: exports is not defined in ES module scope`).

### Prisma 7
- Provider = `prisma-client` (pas `prisma-client-js`)
- Pas de `url` dans `datasource db` (la connexion passe par l'adapter PrismaPg)
- Output genere dans `../generated/prisma` (relatif au fichier schema)
- Import : `from '../../generated/prisma/client'` (sans extension `.js` dans le code source)

### 1-click Checkout (Stripe)
- Le frontend n'envoie que `productId` + `quantity`
- Une commande PENDING est creee cote backend avec des champs client vides
- Stripe collecte l'adresse via `shipping_address_collection: { allowed_countries: ['FR'] }`
- Le webhook `checkout.session.completed` remplit les infos client (email, nom, adresse)

### Demarrage du backend compile
Le build NestJS sort dans `dist/src/main.js` (pas `dist/main.js`).
```bash
npx nest build && node dist/src/main.js
```

---

## 11. Ce qu'il reste a faire

- [ ] Remplacer les cles Stripe placeholder par de vraies cles test
- [ ] Configurer le webhook Stripe en local (`stripe listen --forward-to localhost:3001/api/payments/webhook`)
- [ ] Tester le parcours complet : Commander → Stripe → Success page
- [ ] Emails transactionnels (confirmation de commande, expedition)
- [ ] Deploiement (VPS, Vercel, Railway, etc.)
- [ ] Nom de domaine + SSL
- [ ] Analytics (GA4, Meta Pixel)
- [ ] Images produit en local ou CDN (actuellement AliExpress)
- [ ] Tests unitaires et e2e

---

## 12. Documents de strategie disponibles

Les documents suivants sont dans `docs/recommendations/` :
- `pricing-strategy.md` — Strategie de prix et promotions
- `ads-strategy.md` — Strategie publicitaire (Meta, Google, TikTok)
- `supplier-logistics.md` — Fournisseurs et logistique
- `product-innovation.md` — Idees d'innovation produit
- `testing-strategy.md` — Strategie de tests
- `devops-checklist.md` — Checklist DevOps et deploiement
