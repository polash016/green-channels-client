"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/NavBar/NavBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getUserInfo } from "@/services/auth.service";
import { IconBrandWhatsapp, IconDownload } from "@tabler/icons-react";
import { useEffect, useMemo, useState, memo, useCallback } from "react";
import { useGetCategoriesForNavbarQuery } from "@/redux/api/categoryApi";
import Link from "next/link";

const ResponsiveNavbar = memo(function ResponsiveNavbar() {
  const user = getUserInfo();
  const navItems = [
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "CSR",
      link: "/csr",
    },
    ...(user?.id
      ? [
          {
            name: "Dashboard",
            link: "/dashboard",
          },
        ]
      : []),
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState(
    new Set()
  );
  const [isMobileCategoriesExpanded, setIsMobileCategoriesExpanded] =
    useState(false);

  // Fetch categories for hover menu
  const { data: categoriesResponse } = useGetCategoriesForNavbarQuery();
  const categories = categoriesResponse?.data || [];
  const rootCategories = useMemo(
    () => categories.filter((c) => !c.parentId),
    [categories]
  );

  // Get subcategories for hovered category
  const subcategories = useMemo(() => {
    if (!hoveredCategory) return [];
    return categories.filter((c) => c.parentId === hoveredCategory.id);
  }, [categories, hoveredCategory]);

  // Get nested categories for hovered subcategory
  const nestedCategories = useMemo(() => {
    if (!hoveredSubcategory) return [];
    return categories.filter((c) => c.parentId === hoveredSubcategory.id);
  }, [categories, hoveredSubcategory]);

  const whatsappUrl = "https://wa.me/+8801682507450";

  const whatsappButtonClasses =
    "inline-flex items-center gap-2 rounded-md px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 dark:from-emerald-600 dark:via-green-600 dark:to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 dark:hover:from-emerald-500 dark:hover:via-green-500 dark:hover:to-teal-500 cursor-pointer";

  const downloadButtonClasses =
    "inline-flex items-center gap-2 rounded-md px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 dark:from-blue-600 dark:via-blue-700 dark:to-indigo-700 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 dark:hover:from-blue-500 dark:hover:via-blue-600 dark:hover:to-indigo-600 cursor-pointer";

  const handleDownloadPortfolio = () => {
    const link = document.createElement("a");
    link.href = "/green_channels.pdf";
    link.download = "green_channels.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mobile category navigation helpers
  const toggleMobileCategoriesDropdown = useCallback(() => {
    setIsMobileCategoriesExpanded((prev) => !prev);
  }, []);

  const toggleMobileCategory = useCallback((categoryId) => {
    setExpandedMobileCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  const getMobileSubcategories = useCallback(
    (categoryId) => {
      return categories.filter((cat) => cat.parentId === categoryId);
    },
    [categories]
  );

  const getMobileNestedCategories = useCallback(
    (subcategoryId) => {
      return categories.filter((cat) => cat.parentId === subcategoryId);
    },
    [categories]
  );

  // Custom logo component with Green Channels branding
  const GreenChannelsLogo = () => (
    <a
      href="/"
      className="relative z-20 mr-4 flex flex-col items-center space-y-2 px-2 py-2"
    >
      <img
        src="/logo.png"
        alt="Green Channels Logo"
        width={120}
        height={140}
        // className="h-24 w-24"
      />
      {/* <span className="text-xs font-medium text-green-400 dark:text-green-400">
        Green Channels
      </span> */}
    </a>
  );

  return (
    <div className="relative w-full py-2 bg-white dark:bg-neutral-900">
      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden lg:block">
        <Navbar>
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4">
            {/* Left: Logo */}
            <div className="flex items-center">
              <GreenChannelsLogo />
            </div>

            {/* Center: Navigation Menu */}
            <div className="flex items-center space-x-6">
              {navItems.map((item, idx) => (
                <a
                  key={`nav-link-${idx}`}
                  href={item.link}
                  className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => {
                  setIsCategoriesOpen(false);
                  setHoveredCategory(null);
                  setHoveredSubcategory(null);
                }}
              >
                <button className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-colors duration-200">
                  Main Categories
                </button>
                {isCategoriesOpen && (
                  <div className="absolute left-0 top-full z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl p-4">
                    {/* Smart responsive container - hybrid approach for different screen sizes */}
                    <div className="flex gap-[clamp(1rem,2.5vw,2rem)] max-w-[min(98vw,clamp(1200px,90vw,1800px))] overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent">
                      {/* Column 1: Root categories - Always visible */}
                      <div className="min-w-[200px]">
                        {/* <div className="text-xs uppercase text-neutral-400 mb-3 font-semibold">
                          Main Categories
                        </div> */}
                        <ul className="space-y-1">
                          {rootCategories.map((cat) => {
                            const hasSubcategories = categories.some(
                              (c) => c.parentId === cat.id
                            );
                            return (
                              <li key={cat.id}>
                                <Link
                                  href={{
                                    pathname: "/products",
                                    query: { categoryId: cat.id },
                                  }}
                                  onMouseEnter={() => {
                                    setHoveredCategory(cat);
                                    setHoveredSubcategory(null);
                                  }}
                                  className={`flex items-center justify-between gap-4 px-[clamp(0.75rem,1.5vw,1rem)] py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                    hoveredCategory?.id === cat.id
                                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 pr-8"
                                      : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                  }`}
                                >
                                  <span>{cat.name}</span>
                                  {hasSubcategories && (
                                    <svg
                                      className="w-3 h-3 flex-shrink-0 text-neutral-400 dark:text-neutral-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Column 2: Subcategories - Only show when category is hovered AND has subcategories */}
                      {hoveredCategory && subcategories.length > 0 && (
                        <div className="flex-1 min-w-0 basis-[clamp(160px,clamp(20vw,25vw,30vw),clamp(200px,250px,300px))] pl-[clamp(1rem,2vw,1.5rem)]">
                          {/* Arrow indicator */}
                          {/* <div className="flex items-center mb-2">
                            <svg
                              className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                              {hoveredCategory.name}
                            </span>
                          </div> */}
                          <ul className="space-y-1 max-h-64 overflow-auto pr-1 xl:space-y-0 xl:space-x-2 xl:flex xl:flex-wrap xl:max-h-none xl:overflow-visible">
                            {subcategories.map((sub) => {
                              const wordCount = sub.name.split(" ").length;
                              const isShortName = wordCount <= 2;
                              const hasNestedCategories = categories.some(
                                (c) => c.parentId === sub.id
                              );

                              return (
                                <li
                                  key={sub.id}
                                  className={`xl:flex-shrink-0 ${
                                    isShortName
                                      ? "xl:inline-block"
                                      : "xl:block xl:w-full"
                                  }`}
                                >
                                  <Link
                                    href={{
                                      pathname: "/products",
                                      query: { subcategoryId: sub.id },
                                    }}
                                    onMouseEnter={() =>
                                      setHoveredSubcategory(sub)
                                    }
                                    className={`flex items-center justify-between px-[clamp(0.75rem,1.5vw,1rem)] py-2 rounded-md text-sm transition-all duration-200 ${
                                      isShortName
                                        ? "xl:whitespace-nowrap"
                                        : "xl:whitespace-normal"
                                    } ${
                                      hoveredSubcategory?.id === sub.id
                                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                                        : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                    }`}
                                  >
                                    <span
                                      className={
                                        isShortName
                                          ? "xl:whitespace-nowrap"
                                          : "xl:whitespace-normal"
                                      }
                                    >
                                      {sub.name}
                                    </span>
                                    {hasNestedCategories && (
                                      <svg
                                        className="w-3 h-3 text-neutral-400 dark:text-neutral-500 flex-shrink-0 ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {/* Column 3: Nested categories - Only show when subcategory is hovered AND has nested categories */}
                      {hoveredSubcategory && nestedCategories.length > 0 && (
                        <div className="flex-1 min-w-0 basis-[clamp(160px,clamp(20vw,25vw,30vw),clamp(200px,250px,300px))] pl-[clamp(1rem,2vw,1.5rem)]">
                          {/* Arrow indicator */}
                          {/* <div className="flex items-center mb-2">
                            <svg
                              className="w-4 h-4 text-green-500 dark:text-green-400 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                            <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">
                              {hoveredSubcategory.name}
                            </span>
                          </div> */}
                          <ul className="space-y-1 max-h-64 overflow-auto pr-1 xl:space-y-0 xl:space-x-2 xl:flex xl:flex-wrap xl:max-h-none xl:overflow-visible">
                            {nestedCategories.map((nested) => {
                              const wordCount = nested.name.split(" ").length;
                              const isShortName = wordCount <= 2;

                              return (
                                <li
                                  key={nested.id}
                                  className={`xl:flex-shrink-0 ${
                                    isShortName
                                      ? "xl:inline-block"
                                      : "xl:block xl:w-full"
                                  }`}
                                >
                                  <Link
                                    href={{
                                      pathname: "/products",
                                      query: { nestedCategoryId: nested.id },
                                    }}
                                    className={`block px-[clamp(0.75rem,1.5vw,1rem)] py-2 rounded-md text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 ${
                                      isShortName
                                        ? "xl:whitespace-nowrap"
                                        : "xl:whitespace-normal"
                                    }`}
                                  >
                                    {nested.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {/* Dynamic spacer - fills remaining space when only 1-2 columns are visible */}
                      {(!hoveredCategory ||
                        !hoveredSubcategory ||
                        nestedCategories.length === 0) && (
                        <div className="flex-1 min-w-0 basis-[clamp(160px,clamp(20vw,25vw,30vw),clamp(200px,250px,300px))]">
                          <div className="text-xs uppercase text-neutral-400 mb-3 font-semibold px-[clamp(0.75rem,1.5vw,1rem)] opacity-0">
                            Spacer
                          </div>
                          <div className="space-y-1">
                            <div className="px-[clamp(0.75rem,1.5vw,1rem)] py-2 text-sm text-transparent">
                              Select a category to see subcategories
                            </div>
                            <div className="px-[clamp(0.75rem,1.5vw,1rem)] py-2 text-sm text-transparent">
                              Select a subcategory to see nested items
                            </div>
                            <div className="px-[clamp(0.75rem,1.5vw,1rem)] py-2 text-sm text-transparent">
                              Explore our product categories
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dynamic scroll indicator - shows when content overflows */}
                    {/* <div className="mt-2 text-center">
                      <div className="text-xs text-neutral-400">
                        {hoveredSubcategory && nestedCategories.length > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                              />
                            </svg>
                            <span className="hidden sm:inline">
                              Scroll to see all categories
                            </span>
                            <span className="sm:hidden">Scroll</span>
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              {/* <button
                onClick={handleDownloadPortfolio}
                className={downloadButtonClasses}
              >
                <IconDownload className="h-5 w-5" />
                <span className="text-sm">Portfolio</span>
              </button> */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={whatsappButtonClasses}
              >
                <IconBrandWhatsapp className="h-5 w-5" />
                <span className="text-sm">Chat with us</span>
              </a>
            </div>
          </div>
        </Navbar>
      </div>

      {/* Mobile Navigation - Hidden on desktop */}
      <div className="lg:hidden">
        <Navbar>
          <MobileNav>
            <MobileNavHeader>
              <GreenChannelsLogo />
              <div className="flex items-center gap-2">
                {/* <ThemeToggle /> */}
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}

              {/* Categories - Inline with other nav items */}
              <div className="relative">
                <button
                  onClick={toggleMobileCategoriesDropdown}
                  className="flex items-center justify-between w-full text-left text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">Main Categories</span>
                  <svg
                    className={`w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 ${
                      isMobileCategoriesExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Categories Dropdown Content */}
                {isMobileCategoriesExpanded && (
                  <div className="ml-4 mt-2 space-y-2">
                    {rootCategories.map((category) => {
                      const subcategories = getMobileSubcategories(category.id);
                      const isExpanded = expandedMobileCategories.has(
                        category.id
                      );

                      return (
                        <div key={category.id} className="space-y-1">
                          {/* Main Category */}
                          <div className="flex items-center justify-between">
                            <Link
                              href={`/products?categoryId=${category.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {category.name}
                            </Link>
                            {subcategories.length > 0 && (
                              <button
                                onClick={() =>
                                  toggleMobileCategory(category.id)
                                }
                                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
                              >
                                <svg
                                  className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                                    isExpanded ? "rotate-180" : ""
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>

                          {/* Subcategories */}
                          {isExpanded && subcategories.length > 0 && (
                            <div className="ml-4 space-y-1">
                              {subcategories.map((subcategory) => {
                                const nestedCategories =
                                  getMobileNestedCategories(subcategory.id);
                                const isSubExpanded =
                                  expandedMobileCategories.has(subcategory.id);

                                return (
                                  <div
                                    key={subcategory.id}
                                    className="space-y-1"
                                  >
                                    {/* Subcategory */}
                                    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-1">
                                      <Link
                                        href={`/products?subcategoryId=${subcategory.id}`}
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                        className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                      >
                                        {subcategory.name}
                                      </Link>
                                      {nestedCategories.length > 0 && (
                                        <button
                                          onClick={() =>
                                            toggleMobileCategory(subcategory.id)
                                          }
                                          className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
                                        >
                                          <svg
                                            className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                                              isSubExpanded ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M19 9l-7 7-7-7"
                                            />
                                          </svg>
                                        </button>
                                      )}
                                    </div>

                                    {/* Nested Categories */}
                                    {isSubExpanded &&
                                      nestedCategories.length > 0 && (
                                        <div className="ml-4 space-y-1">
                                          {nestedCategories.map((nested) => (
                                            <Link
                                              key={nested.id}
                                              href={`/products?nestedCategoryId=${nested.id}`}
                                              onClick={() =>
                                                setIsMobileMenuOpen(false)
                                              }
                                              className="block text-xs text-neutral-500 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-neutral-200 dark:border-neutral-700 pb-1"
                                            >
                                              {nested.name}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col gap-4">
                {/* <button
                {/* <button
                  onClick={() => {
                    handleDownloadPortfolio();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${downloadButtonClasses} justify-center w-full text-center`}
                >
                  <IconDownload className="h-5 w-5" />
                  <span className="text-sm">Download Portfolio</span>
                </button> */}
                {/* </button> */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${whatsappButtonClasses} justify-center w-full text-center`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <IconBrandWhatsapp className="h-5 w-5" />
                  <span className="text-sm">Chat on WhatsApp</span>
                </a>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>
    </div>
  );
});

export default ResponsiveNavbar;
