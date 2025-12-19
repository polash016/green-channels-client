import { ProductGallery } from "@/components/products/ProductGallery";
import { getProducts, getCategories } from "@/lib/api";
import React, { Suspense } from "react";

export const metadata = {
  title: "Our Products",
  description: "Browse our extensive collection of high-quality textiles and garments, sourced from the finest manufacturers in Bangladesh.",
};

const page = async ({ searchParams }) => {
  const params = await searchParams;
  
  // Fetch products based on URL params
  const productsData = await getProducts(params);
  
  // Fetch all categories for navigation
  const categoriesData = await getCategories({ limit: 1000 });

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                    <div className="aspect-square w-full bg-neutral-800 animate-pulse" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 w-3/4 bg-neutral-800 animate-pulse rounded" />
                      <div className="h-4 w-1/2 bg-neutral-800 animate-pulse rounded" />
                      <div className="h-20 w-full bg-neutral-800 animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <ProductGallery 
          initialProducts={productsData?.data || []} 
          categories={categoriesData?.data || []} 
        />
      </Suspense>
    </div>
  );
};

export default page;
