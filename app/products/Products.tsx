"use client";
import { BlinkDialog } from "@/components/UI/Product/BlinkDialog";
import { ProductCard } from "@/components/UI/Product/ProductCard";
import { Product } from "@/lib/products";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Products({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const handleGenerateBlink = async (product: Product) => {
    setSelectedProduct(product);
    setIsGenerating(true);
    setGeneratedLink("");

    const metadata = {
      title: product.title,
      description: htmlToText(product.body_html),
      image: product.image?.src,
      price: product.variants[0].price,
    };

    const res = await axios.post("/api/blink/create", JSON.stringify(metadata));

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedLink(`https://solana.blinks.com/blink?id=${res.data.data.id}`);
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
    </main>
  );
}

function htmlToText(html: string) {
  const tempDiv = document.createElement("div");

  tempDiv.innerHTML = html;

  return tempDiv.textContent || "";
}
