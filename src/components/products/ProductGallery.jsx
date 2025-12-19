"use client";
import { FocusCards } from "../ui/focus-cards";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ChevronRight, Home, Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductGallery = function ProductGallery({ initialProducts = [], categories = [], categoriesLoading = false }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive state from URL params
  const selectedCategory = searchParams.get("categoryId");
  const subcategoryId = searchParams.get("subcategoryId");
  const nestedCategoryId = searchParams.get("nestedCategoryId");
  const urlSearchTerm = searchParams.get("searchTerm") || "";

  // Local state for UI
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== urlSearchTerm) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm) {
          params.set("searchTerm", searchTerm);
        } else {
          params.delete("searchTerm");
        }
        router.push(`/products?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, urlSearchTerm, router, searchParams]);

  // Sync local search term if URL changes externally
  useEffect(() => {
    setSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  // Get subcategories and nested categories for the selected main category
  const mainCategorySubcategories = useMemo(() => {
    if (!selectedCategory || !categories) return [];

    const mainCategory = categories.find((cat) => cat.id === selectedCategory);
    if (!mainCategory) return [];

    // Get direct subcategories
    const subcategories = categories.filter(
      (cat) => cat.parentId === selectedCategory
    );


    // Get nested categories (children of subcategories)
    const nestedCategories = categories.filter((cat) =>
      subcategories.some((sub) => sub.id === cat.parentId)
    );

    return { subcategories, nestedCategories };
  }, [selectedCategory, categories]);

  // Get nested categories for the selected subcategory
  const subcategoryNestedCategories = useMemo(() => {
    if (!subcategoryId || !categories) return [];
    return categories.filter((cat) => cat.parentId === subcategoryId);
  }, [subcategoryId, categories]);

  // Build breadcrumb path based on current filters
  const breadcrumbPath = useMemo(() => {
    if (!categories) return [];


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
  }, [categories, selectedCategory, subcategoryId, nestedCategoryId]);

  // URL params are already being used directly via searchParams

  // Products are passed via props
  const products = initialProducts || [];

  const handleCategoryChange = useCallback(
    (categoryId) => {
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
    [router]
  );

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    router.push("/products");
  }, [router]);

  // Handle breadcrumb navigation
  const handleBreadcrumbClick = useCallback(
    (categoryId, level) => {
      const params = new URLSearchParams(window.location.search);

      // Clear all category-related parameters first
      params.delete("categoryId");
      params.delete("subcategoryId");
      params.delete("nestedCategoryId");

      // Set the appropriate parameter based on the level clicked
      if (level === 0) {
        // Root category
        params.set("categoryId", categoryId);
      } else if (level === 1) {
        // Subcategory
        params.set("subcategoryId", categoryId);
      } else if (level === 2) {
        // Nested category
        params.set("nestedCategoryId", categoryId);
      }

      router.push(`/products?${params.toString()}`);
    },
    [router]
  );

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
              <div className="flex items-center justify-center flex-wrap gap-2 text-lg text-neutral-300">
                {breadcrumbPath.length > 0 ? (
                  breadcrumbPath.map((item, index) => (
                    <div key={item.id} className="flex items-center">
                      <button
                        onClick={() =>
                          handleBreadcrumbClick(item.id, item.level)
                        }
                        className={`transition-colors duration-200 hover:text-green-400 ${
                          index === breadcrumbPath.length - 1
                            ? "text-white font-medium"
                            : "text-neutral-300 hover:text-green-400"
                        }`}
                        title={`Go to ${item.name}`}
                      >
                        {item.name}
                      </button>
                      {index < breadcrumbPath.length - 1 && (
                        <ChevronRight className="mx-3 text-green-400 w-4 h-4" />
                      )}
                    </div>
                  ))
                ) : (
                  // Fallback: show current category name if breadcrumb path is empty
                  <span className="text-white font-medium">
                    {
                      categories?.find(
                        (cat) =>
                          cat.id === selectedCategory ||
                          cat.id === subcategoryId ||
                          cat.id === nestedCategoryId
                      )?.name
                    }
                  </span>
                )}
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
              {/* {(breadcrumbPath.length > 0 ||
                searchTerm ||
                selectedCategory ||
                subcategoryId ||
                nestedCategoryId) && (
                <button
                  onClick={handleClearFilters}
                  className="flex items-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to All Products</span>
                </button>
              )} */}
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
                              categories?.find(
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
                        {categories?.length || 0}
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

        {/* Show subcategory navigation for main categories, nested categories for subcategories, products for nested categories */}
        {selectedCategory && !subcategoryId && !nestedCategoryId ? (
          // Main category selected - show subcategory navigation
          <div className="text-center pb-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8">
                Browse{" "}
                {
                  categories?.find(
                    (cat) => cat.id === selectedCategory
                  )?.name
                }
              </h3>

              {/* Dynamic Category Tree */}
              {mainCategorySubcategories?.subcategories?.length > 0 && (
                <div className="space-y-6">
                  {mainCategorySubcategories.subcategories.map(
                    (subcategory) => {
                      const nestedUnderThisSub =
                        mainCategorySubcategories?.nestedCategories?.filter(
                          (nested) => nested.parentId === subcategory.id
                        ) || [];

                      return (
                        <div
                          key={subcategory.id}
                          className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-green-500 transition-all duration-200"
                        >
                          {/* Subcategory Header */}
                          <div className="p-6 border-b border-neutral-700">
                            <Link
                              href={`/products?subcategoryId=${subcategory.id}`}
                              className="group block"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                                    <span className="text-white font-semibold text-sm">
                                      {subcategory.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <h5 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
                                      {subcategory.name}
                                    </h5>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-neutral-500 bg-neutral-700 px-2 py-1 rounded-full">
                                    View
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-green-400 transition-colors" />
                                </div>
                              </div>
                            </Link>
                          </div>

                          {/* Nested Categories */}
                          {nestedUnderThisSub.length > 0 && (
                            <div className="p-6 pt-0">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                {nestedUnderThisSub.map((nestedCategory) => (
                                  <Link
                                    key={nestedCategory.id}
                                    href={`/products?nestedCategoryId=${nestedCategory.id}`}
                                    className="group/nested p-4 bg-neutral-900 hover:bg-neutral-700 rounded-lg border border-neutral-600 hover:border-purple-500 transition-all duration-200 hover:scale-105"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center group-hover/nested:bg-purple-500 transition-colors">
                                        <span className="text-white font-medium text-xs">
                                          {nestedCategory.name
                                            .charAt(0)
                                            .toUpperCase()}
                                        </span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h6 className="text-sm font-medium text-white group-hover/nested:text-purple-400 transition-colors truncate">
                                          {nestedCategory.name}
                                        </h6>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {mainCategorySubcategories?.subcategories?.length === 0 &&
                mainCategorySubcategories?.nestedCategories?.length === 0 && (
                  <div className="text-neutral-400">
                    <p>No subcategories available for this category.</p>
                  </div>
                )}
            </div>
          </div>
        ) : subcategoryId && !nestedCategoryId ? (
          // Subcategory selected - show nested categories
          <div className="text-center pb-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8">
                {
                  categories?.find((cat) => cat.id === subcategoryId)
                    ?.name
                }
              </h3>

              {subcategoryNestedCategories?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {subcategoryNestedCategories.map((nestedCategory) => (
                    <Link
                      key={nestedCategory.id}
                      href={`/products?nestedCategoryId=${nestedCategory.id}`}
                      className="group bg-neutral-800 hover:bg-neutral-700 rounded-2xl border border-neutral-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"
                    >
                      <div className="p-8 text-center">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-400 group-hover:to-purple-600 transition-all duration-300 group-hover:scale-110">
                          <span className="text-white font-bold text-xl">
                            {nestedCategory.name.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors mb-2">
                          {nestedCategory.name}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                          View products in this category
                        </p>

                        {/* Arrow */}
                        <div className="mt-4 flex justify-center">
                          <div className="w-8 h-8 bg-neutral-700 group-hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-12">
                  <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-neutral-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    No Categories
                  </h4>
                  <p className="text-neutral-400 mb-6">
                    This subcategory doesn't have any nested categories yet.
                  </p>
                  {/* <Link
                    href={`/products?subcategoryId=${mainCategorySubcategories}`}
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  >
                    View All Products
                  </Link> */}
                </div>
              )}
            </div>
          </div>
        ) : transformedProducts.length > 0 ? (
          // Sub/Nested category selected - show products
          <>
            <FocusCards cards={transformedProducts} />
          </>
        ) : (
          // No products or no category selected
          <div className="text-center pb-16 px-4">
            <div className="max-w-md mx-auto">
              {/* Smart messaging based on context */}
              {searchTerm || nestedCategoryId ? (
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
};
