"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch(
    //   `/api/products?token=${"update token here"}&shop_url=${"update shop url here"}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data.products));

    fetch(
      `/api/products?token=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&shop_url=791225-45.myshopify.com`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
    console.log(products);
  }, []);
  return (
    <div>
      {products &&
        products.map((product: any) => {
          const html = { __html: product.body_html };
          return (
            <div>
              <h1>{product.title}</h1>
              <img src={product.image.src} />
              <p dangerouslySetInnerHTML={html} />
            </div>
          );
        })}
    </div>
  );
}
