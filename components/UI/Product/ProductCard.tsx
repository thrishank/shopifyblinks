import React from "react";
import Image from "next/image";
import { Product } from "@/lib/products";
import { Card, CardContent, CardFooter } from "@/components/common/card";
import { Button } from "@/components/common/button";

interface ProductCardProps {
  product: Product;
  onGenerateBlink: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onGenerateBlink,
}) => {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
      {product.image && (
        <Image
          src={product.image.src}
          alt={product.image.alt || product.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      )}
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-purple-800 dark:text-purple-200">
          {product.title}
        </h2>
        <div
          className="text-gray-600 dark:text-gray-300 mb-2"
          dangerouslySetInnerHTML={{ __html: product.body_html }}
        />
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          ${product.variants[0]?.price || "0.00"}
        </p>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-700 p-4">
        <Button
          onClick={() => onGenerateBlink(product)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600"
        >
          Generate Blink
        </Button>
      </CardFooter>
    </Card>
  );
};
