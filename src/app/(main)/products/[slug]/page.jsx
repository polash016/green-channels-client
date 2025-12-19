import React from "react";
import Link from "next/link";
import { getSingleProduct } from "@/lib/api";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const productData = await getSingleProduct(slug);
  const product = productData?.data;

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description || `Premium quality ${product.name} from Green Channels Ltd.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imgUrls?.[0] ? [{ url: product.imgUrls[0] }] : [],
    },
  };
}

export default async function ProductShowcasePage({ params }) {
  const { slug } = await params;
  const productData = await getSingleProduct(slug);
  const product = productData?.data;

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-200 flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <p className="mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link href="/products" className="underline text-green-400">
            Back to gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link
            href="/products"
            className="text-sm text-neutral-300 hover:text-white underline"
          >
            ← Back to gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <ProductImageGallery
              images={product.imgUrls || []}
              productName={product.name}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className="text-neutral-300 text-lg leading-relaxed">
                {product.description ||
                  "Premium quality product from our collection."}
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/#contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"
              >
                Contact to source this product
              </Link>
            </div>

            <div className="pt-4 text-sm text-neutral-400">
              <p>
                Interested in this product? Contact us for pricing,
                availability, and custom specifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
