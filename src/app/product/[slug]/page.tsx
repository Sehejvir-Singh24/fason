import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, FLAGSHIP_PRODUCT } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug) || FLAGSHIP_PRODUCT;

  return {
    title: `${product.name} | FASON® Feel The Relief`,
    description: product.description,
    openGraph: {
      title: `${product.name} | FASON®`,
      description: product.tagline,
      images: [product.fallbackImage],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
