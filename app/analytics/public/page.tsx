import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page() {
  const data = await prisma.blink.findMany();
  const uniqueStores = [...new Set(data.map((blink) => blink.website_url))];

  return (
    <div>
      <h1>Analytics</h1>
      <h2>Total blink Created {data.length}</h2>
      <h2>Total Shopify stores connected {uniqueStores.length}</h2>
      <ul>
        {data.map((blink, id) => (
          <li key={id}>{blink.id}</li>
        ))}
      </ul>
    </div>
  );
}
