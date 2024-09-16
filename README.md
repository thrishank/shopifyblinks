# Todo

- Transaction Verifcation also test with different values
- Input validation for access_token and shopify_website_url in next-auth authoptions file
- change the content of the home page
- Record a demo video and write a medium blog
- create a page for generated blinks. Store the blinks url in db after generation
- Build a intertisital site like dial.to
- update the UI/UX

# Testing credantials

```
access_token: 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
shop: https://solanablinks.myshopify.com/
```

# Blinkify

Blinkify is a Next.js application that integrates Shopify stores with Solana blockchain technology, allowing merchants to create and share Solana Blinks for their products.

## Features

- Shopify and wallet integration
- Solana Blinks generation

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
