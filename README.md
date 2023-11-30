# Vipaṇi Vendor Dashboard for Vipaṇi Marketplace (Under Development)
Vipaṇi Marketplace (Vipaṇi (विपणि) means Marketplace in Sanskrit) is a digital platform for the small-scale marketplace of cities of India to provide online availability to their vendors under their own name without losing the identity of the marketplace as well as the Vendor's store. This is the Vendor Dashboard for Vipaṇi Marketplace.

- The Vipaṇi Marketplace is live [here](https://vipani.vercel.app/).
- The Vipaṇi Vendor Dashboard is live [here](https://vipani-admin.vercel.app/).

## Abstract
As India is moving towards a digital world, people prefer to buy household groceries and products through digital platforms like Amazon and Flipkart. The problem with this is that most of the vendors from traditional local marketplaces don’t know much about e-commerce websites and they are losing their customer base. The second issue that they face is if they use e-commerce websites like Amazon or Flipkart, they not only lose their brand identity but also the brand identity of the marketplace. 

We aim to provide a digital presence to local marketplaces where the Vendors of that marketplace can create an online store and sell their product to local customers. Through Vipaṇi they won’t lose their trusted customers as well as brand identity.

## Example usecase
Let’s say Chowk Bazaar is the local marketplace in Azamgarh, Uttar Pradesh.  Chowk Bazaar can create their digital marketplace at Vipaṇi at the domain: “chowkbazaar-azamgarh.vipani.com”. 

If Ramesh Kumar has a cloth store in Chowk Bazaar, he can create his cloth store named “Fashion House” in the Chowk Bazaar Vipani Marketplace as: “chowkbazaar-azamgarh.vipani.com/faishon-house”.

## Techstack
### Vipaṇi Marketplace
- Typescript
- Next.js
- Clerk
- Stripe
- Zustand
- Shad CN UI
- Tailwind CSS
- CLSX
- Lucide React
- React Hot Toast

### Vipaṇi Vendor Dashboard
- Typescript
- Next.js
- Prisma DB
- Planetscale
- Clerk
- Stripe
- Zustand
- ShadCN UI
- Tailwind CSS
- CLSX
- Lucide React
- React Hot Toast

## Contributor
- [Ashmit JaiSarita Gupta](https://github.com/devilkiller-ag).

# Development Guide
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.