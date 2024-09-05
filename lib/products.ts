export interface ProductVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  inventory_quantity: number;
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string | null;
  width: number;
  height: number;
}

export interface Product {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  created_at: string;
  handle: string;
  variants: ProductVariant[];
  images: ProductImage[];
  image: ProductImage | null;
}

export interface ShopifyApiResponse {
  products: Product[];
}
