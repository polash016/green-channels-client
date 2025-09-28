"use client";
import { FocusCards } from "../ui/focus-cards";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useState, useEffect, useCallback, memo, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  setSubcategory,
  setNestedCategory,
  setSearchTerm,
  clearFilters,
  setFiltersFromUrl,
} from "@/redux/slices/productFilterSlice";
import Image from "next/image";
import { Search, Filter, ChevronRight, Home } from "lucide-react";

export const ProductGallery = memo(function ProductGallery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const { selectedCategory, subcategoryId, nestedCategoryId } = useSelector(
    (state) => state.productFilter
  );

  // Local state for UI
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Get categories for filtering
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery({ limit: 1000 });

  // Build breadcrumb path based on current filters
  const breadcrumbPath = useMemo(() => {
    if (!categoriesData?.data) return [];

    const categories = categoriesData.data;
    const path = [];

    // Find the current category in the hierarchy
    let currentCategory = null;

    if (nestedCategoryId) {
      currentCategory = categories.find((cat) => cat.id === nestedCategoryId);
    } else if (subcategoryId) {
      currentCategory = categories.find((cat) => cat.id === subcategoryId);
    } else if (selectedCategory) {
      currentCategory = categories.find((cat) => cat.id === selectedCategory);
    }

    if (!currentCategory) return [];

    // Build the path by traversing up the hierarchy
    const buildPath = (category) => {
      if (!category) return;

      // Find parent category
      const parent = categories.find((cat) => cat.id === category.parentId);
      if (parent) {
        buildPath(parent);
      }

      path.push({
        id: category.id,
        name: category.name,
        level: parent
          ? path.length > 0
            ? path[path.length - 1].level + 1
            : 1
          : 0,
      });
    };

    buildPath(currentCategory);
    return path;
  }, [categoriesData?.data, selectedCategory, subcategoryId, nestedCategoryId]);

  // Initialize filters from URL
  useEffect(() => {
    const cat = searchParams.get("categoryId") || "";
    const sub = searchParams.get("subcategoryId") || "";
    const nested = searchParams.get("nestedCategoryId") || "";

    // Dispatch to Redux store
    dispatch(
      setFiltersFromUrl({
        categoryId: cat,
        subcategoryId: sub,
        nestedCategoryId: nested,
      })
    );
  }, [searchParams, dispatch]);

  // Build query parameters with useMemo for better performance
  const queryParams = useMemo(() => {
    const params = {};

    // Only add searchTerm if it exists and is not empty
    if (debouncedSearchTerm && debouncedSearchTerm.trim()) {
      params.searchTerm = debouncedSearchTerm;
    }

    // Only add hierarchy filters if present
    if (nestedCategoryId) {
      params.nestedCategoryId = nestedCategoryId;
    } else if (subcategoryId) {
      params.subcategoryId = subcategoryId;
    } else if (selectedCategory) {
      params.categoryId = selectedCategory;
    }

    return params;
  }, [debouncedSearchTerm, nestedCategoryId, subcategoryId, selectedCategory]);

  const {
    data: productsResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery(queryParams, {
    // Force refetch when parameters change
    refetchOnMountOrArgChange: true,
  });

  // Redux will automatically trigger re-renders when state changes

  // Extract products
  const products = productsResponse?.data || [];

  const handleCategoryChange = useCallback(
    (categoryId) => {
      dispatch(setCategory(categoryId));
      const params = new URLSearchParams(window.location.search);
      if (categoryId) {
        params.set("categoryId", categoryId);
        params.delete("subcategoryId");
        params.delete("nestedCategoryId");
      } else {
        params.delete("categoryId");
      }
      router.push(`/products?${params.toString()}`);
    },
    [router, dispatch]
  );

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    dispatch(clearFilters());
    router.push("/products");
  }, [router, dispatch]);

  // Transform database products to match the expected format for FocusCards
  const transformedProducts = useMemo(() => {
    return products.map((product) => ({
      slug: product.id, // Using ID as slug for now, can be enhanced later
      title: product.name,
      src:
        product.imgUrls && product.imgUrls.length > 0
          ? product.imgUrls[0]
          : "https://res.cloudinary.com/daa4x7pfh/image/upload/v1756788507/Image_not_Available_2_k7h1ai.jpg",
      description:
        product.description || "Premium quality product from our collection.",
      tags: [
        product.material && product.material,
        product.composition && product.composition,
        product.status && product.status,
        product.category?.name && product.category.name,
      ].filter(Boolean),
    }));
  }, [products]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Products
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Discover our premium collection of textiles and materials, crafted
              with precision and designed for excellence.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Products
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Discover our premium collection of textiles and materials, crafted
              with precision and designed for excellence.
            </p>
          </div>
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">
              Failed to load products. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Category Breadcrumb */}
          {(breadcrumbPath.length > 0 ||
            selectedCategory ||
            subcategoryId ||
            nestedCategoryId) && (
            <div className="mb-6">
              <div className="text-lg text-neutral-300">
                {breadcrumbPath.length > 0
                  ? breadcrumbPath.map((item, index) => (
                      <span key={item.id}>
                        {item.name}
                        {index < breadcrumbPath.length - 1 && (
                          <span className="mx-3 text-green-400">→</span>
                        )}
                      </span>
                    ))
                  : // Fallback: show current category name if breadcrumb path is empty
                    categoriesData?.data?.find(
                      (cat) =>
                        cat.id === selectedCategory ||
                        cat.id === subcategoryId ||
                        cat.id === nestedCategoryId
                    )?.name}
              </div>
            </div>
          )}

          {/* Search and Filter Controls */}
          <div className="mt-8 max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {breadcrumbPath.length > 0
                    ? "Back to All Products"
                    : "Clear Filters"}
                </button>
              )}
            </div>

            {/* Category Tabs - Always Visible */}
            {/* <div className="mb-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-white">
                  Browse by Category
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === ""
                      ? "bg-green-600 text-white shadow-lg transform scale-105"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:scale-105"
                  }`}
                >
                  All Categories
                </button>

                {categoriesLoading ? (
                  <div className="flex items-center space-x-2 text-neutral-400 px-6 py-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                    <span>Loading categories...</span>
                  </div>
                ) : (
                  categoriesData?.data?.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-green-600 text-white shadow-lg transform scale-105"
                          : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:scale-105"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))
                )}
              </div>
            </div> */}

            {/* Additional Filter Toggle */}
            {/* <div className="flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white hover:bg-neutral-700 transition-colors text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>{showFilters ? "Hide" : "Show"} Additional Info</span>
              </button>
            </div> */}

            {/* Additional Info Panel */}
            {showFilters && (
              <div className="mt-6 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
                <div className="space-y-4">
                  {/* Results Count and Active Filters */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="text-sm text-neutral-300">
                      Showing {products.length} products
                    </div>

                    {/* Active Filters Display */}
                    {(searchTerm || selectedCategory) && (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-neutral-400">
                          Active filters:
                        </span>
                        {searchTerm && (
                          <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                            Search: "{searchTerm}"
                          </span>
                        )}
                        {selectedCategory && (
                          <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                            Category:{" "}
                            {
                              categoriesData?.data?.find(
                                (c) => c.id === selectedCategory
                              )?.name
                            }
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">
                        {products.length}
                      </div>
                      <div className="text-sm text-neutral-400">
                        Total Products
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">
                        {categoriesData?.data?.length || 0}
                      </div>
                      <div className="text-sm text-neutral-400">Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">
                        {transformedProducts.length}
                      </div>
                      <div className="text-sm text-neutral-400">Displayed</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {transformedProducts.length > 0 ? (
          <>
            <FocusCards cards={transformedProducts} />
          </>
        ) : (
          <div className="text-center pb-16 px-4">
            <div className="max-w-md mx-auto">
              {/* Smart messaging based on context */}
              {searchTerm || selectedCategory ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    No products match your search
                  </h3>
                  <p className="text-neutral-300 mb-6 leading-relaxed">
                    We couldn't find any products matching your criteria. Try
                    adjusting your search terms or filters.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Clear Filters
                  </button>
                </>
              ) : (
                <h3 className="text-xl text-neutral-400">
                  No Products available
                </h3>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
