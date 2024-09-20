import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/lib/products";
import { Card, CardContent, CardFooter } from "@/components/common/card";
import { Button } from "@/components/common/button";

interface ProductCardProps {
  product: Product;
  onGenerateBlink: (product: Product, selectedVariantId: number) => void;
  currency_rate: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onGenerateBlink,
  currency_rate,
}) => {
  // Ensure there is at least one variant before setting initial state
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(
    product.variants && product.variants.length > 0
      ? product.variants[0]
      : undefined
  );

  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    const variant = product.variants.find((v) => v.id === selectedId);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  if (!selectedVariant) {
    return <div>No variants available</div>;
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
      {product.image && (
        <Image
          src={product.image.src}
          alt={product.image.alt || product.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      )}
      <CardContent className="p-4 flex-grow">
        <h2 className="text-xl font-semibold mb-2 text-purple-800 dark:text-purple-200">
          {product.title}
        </h2>
        <div
          className="text-gray-600 dark:text-gray-300 mb-2"
          dangerouslySetInnerHTML={{ __html: product.body_html }}
        />
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {(
            parseFloat(selectedVariant.price) / parseFloat(currency_rate)
          ).toFixed(2) || "0.00"}{" "}
          USDC
        </p>

        {product.variants.length > 1 && (
          <div className="my-4">
            <label
              htmlFor="variant-select"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Select Variant:
            </label>
            <select
              id="variant-select"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
              value={selectedVariant.id}
              onChange={handleVariantChange}
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.title} - ${variant.price}
                </option>
              ))}
            </select>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-700 p-4 mt-auto">
        <Button
          onClick={() => onGenerateBlink(product, selectedVariant.id)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600"
        >
          Generate Blink
        </Button>
      </CardFooter>
    </Card>
  );
};
