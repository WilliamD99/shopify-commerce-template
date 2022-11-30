# # Ecommerce Template (Shopify)

A Nextjs web template to boostrap the development of ecommerce store

Live demo is avalable at [Demo Site](https://shopify-commerce-template.vercel.app/)

# Getting started

## Secret keys

- Storefront URL (NEXT_PUBLIC_STOREFRONT_URL)
- Storefront token (NEXT_PUBLIC_STOREFRONT_TOKEN)
- Admin REST URL (NEXT_PUBLIC_ADMIN_URL)
- Admin Graphql URL (NEXT_PUBLIC_ADMIN_GRAPHQL_URL)
- Admin token (NEXT_PUBLIC_ADMIN_TOKEN)
- Encrypt key (NEXT_PUBLIC_ENCRYPT_KEY) - Random string to encrypt/descrypt data in the frontend
- Upstash URI (NEXT_PUBLIC_UPSTASH_URI) - In development
- Yotpo app key (NEXT_PUBLIC_YOTPO_APP_KEY)
- Yotpo secret key (NEXT_PUBLIC_YOTPO_SECRET_KEY)
- Yotpo GUID (NEXT_PUBLIC_YOTPO_GUID)
- Yotpo key (NEXT_PUBLIC_YOTPO_KEY)
- Mailchimp audience (NEXT_PUBLIC_MAILCHIMP_AUDIENCE)

## Setup store

- Add metafield to products (selection_type, related_products)
- Add metafield to user (wishlist, approved)

## Setup Stripe

- Make sure you have a Stripe account
- Get stripe API key and put it in the .env file
- To integrate Stripe with Shopify, you need to setup a webhook for Payment Intent event
