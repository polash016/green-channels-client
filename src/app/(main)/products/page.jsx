import { ProductGallery } from "@/components/products/ProductGallery";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="min-h-screen bg-neutral-900 py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Our Products
                </h1>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Discover our premium collection of textiles and materials,
                  crafted with precision and designed for excellence.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
              </div>
            </div>
          </div>
        }
      >
        <ProductGallery />
      </Suspense>
    </div>
  );
};

export default page;
