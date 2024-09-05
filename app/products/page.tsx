"use client";
import { BlinkDialog } from "@/components/UI/Product/BlinkDialog";
import { ProductCard } from "@/components/UI/Product/ProductCard";
import { Product } from "@/lib/products";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

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
  }, []);

  const handleGenerateBlink = (product: Product) => {
    setSelectedProduct(product);
    setIsGenerating(true);
    setGeneratedLink("");

    // Simulate API call to generate Blink
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedLink(
        `https://solana.blinks.com/${product.id}-${product.handle}`
      );
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copied!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={`min-h-screen`}>
      <div className="bg-purple-50 dark:bg-gray-900 transition-colors duration-300">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-purple-900 dark:text-purple-100">
            Your Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onGenerateBlink={handleGenerateBlink}
              />
            ))}
          </div>
        </main>

        <BlinkDialog
          product={selectedProduct}
          isOpen={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
          isGenerating={isGenerating}
          generatedLink={generatedLink}
          onCopyLink={handleCopyLink}
        />

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
