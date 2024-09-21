"use client";
import { BlinkDialog } from "@/components/UI/Product/BlinkDialog";
import { ProductCard } from "@/components/UI/Product/ProductCard";
import { Product } from "@/lib/products";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [currency_rate, setCurrencyRate] = useState("1");

  const { publicKey, connected } = useWallet();
  const router = useRouter();

  const session = useSession();
  const currency_url = `https://v6.exchangerate-api.com/v6/35e3fc6e6f0224062d2bf0b2/latest/USD`;

  useEffect(() => {
    const currency = session.data?.user.currency;
    if (currency !== "USD") {
      fetch(currency_url).then((res) => {
        res.json().then((data) => {
          setCurrencyRate(data.conversion_rates[currency!]);
        });
      });
    }
  }, []);

  useEffect(() => {
    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleGenerateBlink = async (
    product: Product,
    selectedVariantId: number
  ) => {
    setSelectedProduct(product);
    setIsGenerating(true);
    setGeneratedLink("");

    const selectedVariant = product.variants.find(
      (variant) => variant.id === selectedVariantId
    );

    const metadata = {
      title: product.title,
      description: htmlToText(product.body_html),
      image: product.image?.src,
      price: selectedVariant?.price || product.variants[0].price,
      wallet: publicKey?.toBase58(),
      varient_id: selectedVariantId,
    };

    if (!connected) {
      toast.error("Please connect your wallet first to recive the payments");
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } else {
      const res = await axios.post(
        `api/blink/create`,
        JSON.stringify(metadata)
      );

      const url = `https://solanablinks.me/blink?id=${res.data}`;

      setTimeout(() => {
        setIsGenerating(false);
        setGeneratedLink(url);
      }, 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copied!");
  };

  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/profile");
    },
  });

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
                onGenerateBlink={(product, selectedVariantId) =>
                  handleGenerateBlink(product, selectedVariantId)
                }
                currency_rate={currency_rate}
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

        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}

function htmlToText(html: string) {
  const tempDiv = document.createElement("div");

  tempDiv.innerHTML = html;

  return tempDiv.textContent || "";
}
