"use client";

import { useState, useMemo, useTransition } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { CategoryModal } from "./CategoryModal";
import { SubcategoryModal } from "./SubcategoryModal";
import { NestedCategoryModal } from "./NestedCategoryModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/actions";

export function CategoryTable({ initialCategories = [] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSubCreateOpen, setIsSubCreateOpen] = useState(false);
  const [isNestedCreateOpen, setIsNestedCreateOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [parentForSub, setParentForSub] = useState(null);
  const [parentForNested, setParentForNested] = useState(null);

  // Sort and filter categories
  const filteredCategories = useMemo(() => {
    let result = initialCategories;
    
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(lower));
    }

    return result.slice().sort((a, b) => {
      // First sort by parentId (root categories first)
      if (!a.parentId && b.parentId) return -1;
      if (a.parentId && !b.parentId) return 1;
      if (!a.parentId && !b.parentId) {
        // Both are root categories, sort by sortOrder
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      }
      if (a.parentId && b.parentId) {
        // Both have parents, sort by sortOrder
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      }
      return 0;
    });
  }, [initialCategories, searchTerm]);

  const handleCreate = async (formData) => {
    startTransition(async () => {
      try {
        const res = await createCategory(formData);
        if (res.success) {
          toast.success("Category created successfully");
          setIsCreateModalOpen(false);
          router.refresh();
        } else {
          toast.error(res.error || "Failed to create category");
        }
      } catch (error) {
        console.error("Create error:", error);
        toast.error("Failed to create category");
      }
    });
  };

  const handleCreateSub = async (formData) => {
    startTransition(async () => {
      try {
        const body = JSON.parse(formData.data);
        const payload = { ...body, parentId: parentForSub?.id };
        const res = await createCategory({
          data: JSON.stringify(payload),
        });
        
        if (res.success) {
          toast.success("Subcategory created successfully");
          setIsSubCreateOpen(false);
          setParentForSub(null);
          router.refresh();
        } else {
          toast.error(res.error || "Failed to create subcategory");
        }
      } catch (error) {
        console.error("Create subcategory error:", error);
        toast.error("Failed to create subcategory");
      }
    });
  };

  const handleCreateNested = async (formData) => {
    startTransition(async () => {
      try {
        const body = JSON.parse(formData.data);
        const payload = { ...body, parentId: parentForNested?.id };
        const res = await createCategory({
          data: JSON.stringify(payload),
        });
        
        if (res.success) {
          toast.success("Nested category created successfully");
          setIsNestedCreateOpen(false);
          setParentForNested(null);
          router.refresh();
        } else {
          toast.error(res.error || "Failed to create nested category");
        }
      } catch (error) {
        console.error("Create nested category error:", error);
        toast.error("Failed to create nested category");
      }
    });
  };

  const handleUpdate = async (formData) => {
    startTransition(async () => {
      try {
        const res = await updateCategory(selectedCategory.id, formData);
        if (res.success) {
          toast.success("Category updated successfully");
          setIsUpdateModalOpen(false);
          setSelectedCategory(null);
          router.refresh();
        } else {
          toast.error(res.error || "Failed to update category");
        }
      } catch (error) {
        console.error("Update error:", error);
        toast.error("Failed to update category");
      }
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    startTransition(async () => {
      try {
        const res = await deleteCategory(id);
        if (res.success) {
          toast.success("Category deleted successfully");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to delete category");
        }
      } catch (error) {
        toast.error("Failed to delete category");
        console.error("Delete error:", error);
      }
    });
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper function to determine category level
  const getCategoryLevel = (category, allCategories = initialCategories) => {
    if (!category.parentId) {
      return "Main";
    }

    // Try to find the parent category in the full categories array
    let parent = allCategories?.find((cat) => cat.id === category.parentId);

    // If not found in allCategories, try using the category.parent object as fallback
    if (!parent && category.parent) {
      parent = category.parent;
    }

    if (!parent) {
      return "Unknown";
    }

    // Check if parent has parentId - this is the definitive way to determine level
    if (!parent.parentId) {
      return "Sub";
    }

    // If parent has a parentId, this is a nested category
    return "Nested";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product categories
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No categories found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm
                ? "No categories match your search criteria."
                : "Get started by creating your first category."}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Create Category
              </button>
            )}
          </div>
        ) : (
          filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {/* Category level indicator */}
                        {(() => {
                          const level = getCategoryLevel(
                            category,
                            initialCategories
                          );
                          switch (level) {
                            case "Main":
                              return (
                                <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                                  Main
                                </span>
                              );
                            case "Sub":
                              return (
                                <span className="px-2 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full">
                                  Sub
                                </span>
                              );
                            case "Nested":
                              return (
                                <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                                  Nested
                                </span>
                              );
                            default:
                              return (
                                <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full">
                                  Unknown
                                </span>
                              );
                          }
                        })()}
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                          Order: {category.sortOrder || 0}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {category.parent && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Parent:</span>{" "}
                          {category.parent.name}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.products?.length || 0} products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                      title="Edit category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {/* Subcategories display */}
                  {Array.isArray(category.children) &&
                    category.children.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                          Subcategories
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.children.map((sub) => (
                            <span
                              key={sub.id}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                            >
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setParentForSub(category);
                        setIsSubCreateOpen(true);
                      }}
                      className="px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                    >
                      + Subcategory
                    </button>

                    {Array.isArray(category.children) &&
                      category.children.length > 0 && (
                        <button
                          onClick={() => {
                            // choose first sub by default; user can change in modal
                            setParentForNested(category.children[0]);
                            setIsNestedCreateOpen(true);
                          }}
                          className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer"
                        >
                          + Nested under sub
                        </button>
                      )}
                  </div>

                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    Created: {formatDate(category.createdAt)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Modals */}
      <CategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Create Category"
        submitText="Create"
      />

      <CategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleUpdate}
        initialData={selectedCategory}
        title="Edit Category"
        submitText="Update"
      />

      {/* Create Subcategory Modal */}
      <CategoryModal
        isOpen={isSubCreateOpen}
        onClose={() => {
          setIsSubCreateOpen(false);
          setParentForSub(null);
        }}
        onSubmit={handleCreateSub}
        title={
          parentForSub
            ? `Create subcategory under "+ ${parentForSub.name}"`
            : "Create Subcategory"
        }
        submitText="Create Subcategory"
      />

      {/* Create Nested Category Modal */}
      <NestedCategoryModal
        isOpen={isNestedCreateOpen}
        onClose={() => {
          setIsNestedCreateOpen(false);
          setParentForNested(null);
        }}
        onSubmit={handleCreateNested}
        parentForNested={parentForNested}
        parentCategoryOptions={filteredCategories}
        title="Create Nested Category"
        submitText="Create Nested"
      />
    </div>
  );
}
