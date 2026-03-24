# Geestock - Frontend

Nuxt 3 + Vue 3 + Tailwind CSS frontend pour le site e-commerce Geestock.

## Setup

```bash
npm install
```

## Développement

```bash
# Lancer le serveur de dev (port 3000)
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Variables d'environnement

Copier `.env.example` en `.env` et adapter les valeurs.

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NUXT_PUBLIC_API_BASE` | URL de l'API backend | `http://localhost:3001/api` |
| `NUXT_PUBLIC_SITE_URL` | URL publique du site | `http://localhost:3000` |
