"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Trash2,
  Package,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import LazyImage from "../ui/lazy-image";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";

export function ProductModal({ isOpen, onClose, onSubmit, mode, product }) {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery({ limit: 1000 });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    composition: "",
    status: "REGULAR",
    material: "",
    categoryId: "",
    images: [],
    imagePreviews: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
    if (mode === "update" && product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        composition: product.composition || "",
        status: product.status || "REGULAR",
        material: product.material || "",
        categoryId: product.categoryId || "",
        images: [],
        imagePreviews:
          product.imgUrls && product.imgUrls.length > 0 ? product.imgUrls : [],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        composition: "",
        status: "REGULAR",
        material: "",
        categoryId: "",
        images: [],
        imagePreviews: [],
      });
    }
  }, [mode, product]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };

    if (isCategoryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryDropdownOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        composition: "",
        status: "REGULAR",
        material: "",
        categoryId: "",
        images: [],
        imagePreviews: [],
      });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...formData.images, ...files];
      const newPreviews = [
        ...formData.imagePreviews,
        ...files.map((file) => URL.createObjectURL(file)),
      ];

      setFormData({
        ...formData,
        images: newImages,
        imagePreviews: newPreviews,
      });
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = formData.imagePreviews.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews,
    });
  };

  const isFormValid = formData.name.trim() && formData.categoryId;

  // Build category hierarchy
  const categories = categoriesData?.data || [];
  const rootCategories = useMemo(
    () => categories.filter((cat) => !cat.parentId),
    [categories]
  );

  // Get category path (e.g., "Fashion → Knit → Cotton")
  const getCategoryPath = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return "";

    const path = [category.name];
    let current = category;

    while (current.parentId) {
      const parent = categories.find((cat) => cat.id === current.parentId);
      if (parent) {
        path.unshift(parent.name);
        current = parent;
      } else {
        break;
      }
    }

    return path.join(" → ");
  };

  // Get subcategories for a given category
  const getSubcategories = (categoryId) => {
    return categories.filter((cat) => cat.parentId === categoryId);
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Get selected category display name
  const getSelectedCategoryDisplay = () => {
    if (!formData.categoryId) return "Select a category";
    return getCategoryPath(formData.categoryId);
  };

  // Recursive component to render category tree
  const CategoryTreeItem = ({ category, level = 0 }) => {
    const subcategories = getSubcategories(category.id);
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = formData.categoryId === category.id;
    const hasChildren = subcategories.length > 0;

    return (
      <div className="select-none">
        <div
          className={`flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-colors ${
            isSelected
              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              : "hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300"
          }`}
          style={{ paddingLeft: `${12 + level * 20}px` }}
          onClick={() => {
            setFormData({ ...formData, categoryId: category.id });
            setIsCategoryDropdownOpen(false);
          }}
        >
          <div className="flex items-center space-x-2">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategoryExpansion(category.id);
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ) : (
              <div className="w-6" />
            )}
            <span className="text-sm font-medium">{category.name}</span>
            {isSelected && (
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                Selected
              </span>
            )}
          </div>
        </div>

        {/* Subcategories */}
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {subcategories.map((subcategory) => (
              <CategoryTreeItem
                key={subcategory.id}
                category={subcategory}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mode === "create" ? "Add New Product" : "Update Product"}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>

                  {/* Custom Dropdown */}
                  <div className="relative" ref={categoryDropdownRef}>
                    <button
                      type="button"
                      onClick={() =>
                        setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                      }
                      disabled={isSubmitting || categoriesLoading}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between disabled:opacity-50"
                    >
                      <span
                        className={
                          formData.categoryId
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-500"
                        }
                      >
                        {getSelectedCategoryDisplay()}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isCategoryDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isCategoryDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {categoriesLoading ? (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            Loading categories...
                          </div>
                        ) : rootCategories.length === 0 ? (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No categories available
                          </div>
                        ) : (
                          <div className="py-2">
                            {rootCategories.map((category) => (
                              <CategoryTreeItem
                                key={category.id}
                                category={category}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Selected Category Path Display */}
                  {formData.categoryId && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Selected: {getCategoryPath(formData.categoryId)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Composition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Composition
                  </label>
                  <input
                    type="text"
                    value={formData.composition}
                    onChange={(e) =>
                      setFormData({ ...formData, composition: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    <option value="REGULAR">Regular</option>
                    <option value="PREMIUM">Premium</option>
                  </select>
                </div>

                {/* Material */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) =>
                      setFormData({ ...formData, material: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Images
                  </label>
                  <div className="space-y-4">
                    {/* Upload Button */}
                    <label className="flex items-center space-x-2 cursor-pointer bg-gray-100 dark:bg-neutral-700 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Upload Images (Multiple)</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={isSubmitting}
                      />
                    </label>

                    {/* Image Previews */}
                    {formData.imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <LazyImage
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-24 h-24 rounded-lg border-2 border-gray-200 dark:border-neutral-600 object-cover"
                              fallbackIcon={Package}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                              disabled={isSubmitting}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-neutral-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>
                        {mode === "create"
                          ? "Create Product"
                          : "Update Product"}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
