"use client";
import React from "react";
import Link from "next/link";
import { useGetSingleProductQuery } from "@/redux/api/productsApi";
import { useParams, useRouter } from "next/navigation";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";

const ProductShowcasePage = () => {
  const { slug: slugData } = useParams();
  const router = useRouter();

  const {
    data: productSData,
    isLoading,
    error,
  } = useGetSingleProductQuery(slugData);

  const product = productSData?.data;

  const handleContactClick = () => {
    router.push("/#contact");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-200 flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
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
          {/* Image Gallery */}
          <div className="space-y-6">
            <ProductImageGallery
              images={product.imgUrls || []}
              productName={product.name}
            />
          </div>

          {/* Product Details */}
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

            {/* Product Specifications */}
            {/* <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Product Details
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {product.composition && (
                  <div className="flex justify-between py-2 border-b border-neutral-700">
                    <span className="text-neutral-400">Composition:</span>
                    <span className="text-white">{product.composition}</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex justify-between py-2 border-b border-neutral-700">
                    <span className="text-neutral-400">Material:</span>
                    <span className="text-white">{product.material}</span>
                  </div>
                )}
                {product.status && (
                  <div className="flex justify-between py-2 border-b border-neutral-700">
                    <span className="text-neutral-400">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.status === "PREMIUM"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                )}
                {product.category?.name && (
                  <div className="flex justify-between py-2 border-b border-neutral-700">
                    <span className="text-neutral-400">Category:</span>
                    <span className="text-white">{product.category.name}</span>
                  </div>
                )}
              </div>
            </div> */}

            {/* Call to Action */}
            <div className="pt-6">
              <button
                onClick={handleContactClick}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"
              >
                Contact to source this product
              </button>
            </div>

            {/* Additional Info */}
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
};

export default ProductShowcasePage;
