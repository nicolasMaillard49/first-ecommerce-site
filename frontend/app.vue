<script setup lang="ts">
// JSON-LD structured data for SEO (Product schema)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Geestock - Sac Magnétique pour Bouteille',
        description: 'Le sac magnétique révolutionnaire pour vos bouteilles. Fixation instantanée, ultra léger (120g), compatible toutes bouteilles.',
        image: [
          'https://ae01.alicdn.com/kf/Sb3f10763c9c948c7a9bdc6e84a6e9a0fe.jpg',
          'https://ae01.alicdn.com/kf/S12e824863ec645dea0aef595f904c0eaf.jpg',
          'https://ae01.alicdn.com/kf/S4d8bac28c4794424a382b37bf383cac4d.jpg',
        ],
        brand: { '@type': 'Brand', name: 'Geestock' },
        offers: {
          '@type': 'Offer',
          url: 'https://geestock.fr',
          priceCurrency: 'EUR',
          price: '29.99',
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'Geestock' },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'EUR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'FR',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
              transitTime: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 20, unitCode: 'DAY' },
            },
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '2147',
          bestRating: '5',
          worstRating: '1',
        },
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
