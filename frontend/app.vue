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
          'https://geestock.fr/images/product/product-1.jpg',
          'https://geestock.fr/images/product/product-2.jpg',
          'https://geestock.fr/images/product/product-3.jpg',
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
