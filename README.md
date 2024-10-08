# Blinkify

Blinkify is a Next.js application that integrates Shopify stores with Solana blockchain technology, allowing merchants to create and share Solana Blinks for their products.

# Testing credantials

```
access_token: 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
shop: https://solanablinks.myshopify.com/
```

# Demo Video

[![Demo Video](https://img.youtube.com/vi/yzXBa84oRiI/0.jpg)](https://www.youtube.com/watch?v=yzXBa84oRiI&ab_channel=Thrishank)

## Features

- Shopify and wallet integration
- Solana Blinks generation
- Blinks Hosting (pending)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Shopify store
- Solana wallet

### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/blinkify.git
cd blinkify
```

2. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the following variables:

```
DATABASE_URL=your_database_url
ENCRYPTION_KEY=your_encryption_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:

```
npm run dev
```

or

```
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

The project follows a typical Next.js structure with some additional directories:

- `app/`: Contains the main application pages and API routes
- `components/`: Reusable React components
- `lib/`: Utility functions and type definitions
- `prisma/`: Database schema and migrations

## Key Components

- Home page: Introduces Solana Blinks and their benefits
- Products page: Displays Shopify products and allows Blink generation
- Profile management: Handles Merchant authentication and Shopify integration

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- NextAuth.js
- Solana Web3.js
- Solana Actions
- Shopify API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# Todo

- Host the blinks in our website. The blink url's become much more user friendly
- Bug: Variants of the products price is not getting converted to USDC
- Curreny changing page fix the NAN error

- During the payment process if the reciever wallet address doesn't have any USDC, transaction failing. create a instruction to open the USDC ATA. Buyer will pay the fee ? research on this
- If the blinks is already created then no need to generate again. Store the generated blinks in the database
- Display the reciever wallet address during the blinks generation

- Add Analatyics to the website. Total number of blinks created, total number of products sold via blinks, Total number of shopify stores connected, Total transaction volume done via blinks

- add a pricing page free 10 blinks, create 2 blinks for 1$ plan, pay as you go plan
- add database logic for this if they complete the free 10 blinks for their shopify webiste they shouldn't be login again and use
- A public page where all the blinks are listed. People can buy the products using the blinks
- Affilate marketing for the blinks. If a person refer a shopify store to use the blinks and they use the blinks then the person who refered will get 10% of the transaction fee
