"use client";

import { useState, useEffect, useMemo, useTransition } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Eye, Package } from "lucide-react";
import { ProductModal } from "./ProductModal";
import LazyImage from "../ui/lazy-image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  deleteProductImage 
} from "@/lib/actions";
import { getCategories } from "@/lib/api";

export function ProductTable({ initialProducts = [] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [deletingImageIndex, setDeletingImageIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch categories for the modal
  useEffect(() => {
    let mounted = true;
    
    async function fetchCategories() {
      try {
        const data = await getCategories({ limit: 1000 });
        if (mounted) {
          setCategories(data?.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        if (mounted) {
          setCategoriesLoading(false);
        }
      }
    }
    
    fetchCategories();
    return () => { mounted = false; };
  }, []);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return initialProducts;
    
    const lowerTerm = searchTerm.toLowerCase();
    return initialProducts.filter(product => 
      product.name?.toLowerCase().includes(lowerTerm) ||
      product.description?.toLowerCase().includes(lowerTerm) ||
      product.material?.toLowerCase().includes(lowerTerm) ||
      product.composition?.toLowerCase().includes(lowerTerm)
    );
  }, [initialProducts, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Reset to first page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  const handleCreate = async (formData) => {
    try {
      const formDataToSend = new FormData();

      // Add product data
      const productData = {
        product: {
          name: formData.name,
          description: formData.description || "",
          categoryId: formData.categoryId,
          composition: formData.composition,
          status: formData.status,
          material: formData.material || "",
        },
      };

      formDataToSend.append("data", JSON.stringify(productData));

      // Add images if they exist
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataToSend.append("files", image);
        });
      }

      startTransition(async () => {
        const result = await createProduct(formDataToSend);
        if (result.success) {
          toast.success("Product created successfully!");
          setIsCreateModalOpen(false);
          router.refresh();
        } else {
          toast.error(`Failed to create product: ${result.error}`);
        }
      });
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Failed to create product");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const formDataToSend = new FormData();

      // Add product data
      const productData = {
        product: {
          name: formData.name,
          description: formData.description || "",
          categoryId: formData.categoryId,
          composition: formData.composition,
          status: formData.status,
          material: formData.material || "",
        },
      };

      formDataToSend.append("data", JSON.stringify(productData));

      // Add images if they exist
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataToSend.append("files", image);
        });
      }

      startTransition(async () => {
        const result = await updateProduct(selectedProduct.id, formDataToSend);
        if (result.success) {
          toast.success("Product updated successfully!");
          setIsUpdateModalOpen(false);
          setSelectedProduct(null);
          router.refresh();
        } else {
          toast.error(`Failed to update product: ${result.error}`);
        }
      });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result.success) {
        toast.success("Product deleted successfully!");
        router.refresh();
      } else {
        toast.error("Failed to delete product");
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowImageModal(true);
  };

  const handleDeleteImage = async (productId, imageIndex) => {
    // Show confirmation toast with custom action buttons
    toast.custom(
      (t) => (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-md">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Delete Image
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Are you sure you want to delete this image? This action cannot
                be undone.
              </p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={async () => {
                    toast.dismiss(t);
                    setDeletingImageIndex(imageIndex);
                    try {
                      const result = await deleteProductImage(productId, imageIndex);
                      if (result.success) {
                        toast.success("Image deleted successfully!");
                        router.refresh();
                        // Update the selected product to reflect the change locally
                        if (selectedProduct && selectedProduct.id === productId) {
                          const updatedProduct = { ...selectedProduct };
                          updatedProduct.imgUrls = updatedProduct.imgUrls.filter(
                            (_, index) => index !== imageIndex
                          );
                          setSelectedProduct(updatedProduct);
                        }
                      } else {
                        toast.error("Failed to delete image");
                      }
                    } catch (error) {
                      console.error("Delete image error:", error);
                      toast.error("Failed to delete image");
                    } finally {
                      setDeletingImageIndex(null);
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keep open until user decides
      }
    );
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

  const getStatusColor = (status) => {
    switch (status) {
      case "PREMIUM":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "REGULAR":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Products
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: {filteredProducts.length} products
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Show:
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, description, material, or composition..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Composition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700">
              {paginatedProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  {/* Image Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-600">
                        <LazyImage
                          src={
                            product.imgUrls && product.imgUrls.length > 0
                              ? product.imgUrls[0]
                              : ""
                          }
                          alt={product.name}
                          className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleImageClick(product)}
                          fallbackIcon={Package}
                        />
                        {/* Multiple images indicator */}
                        {product.imgUrls && product.imgUrls.length > 1 && (
                          <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                            +{product.imgUrls.length - 1}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Name Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </td>

                  {/* Description Column */}
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs">
                    <div className="line-clamp-2">
                      {product.description || "No description provided"}
                    </div>
                  </td>

                  {/* Composition Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {product.composition}
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  {/* Material Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {product.material || "N/A"}
                  </td>

                  {/* Category Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {product.category?.name || "No Category"}
                  </td>

                  {/* Date Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(product.createdAt)}
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openUpdateModal(product)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, filteredProducts.length)} of{" "}
              {filteredProducts.length} results
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-600"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-600"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-600"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 px-4"
        >
          <div className="max-w-md mx-auto">
            {/* Smart messaging based on context */}
            {searchTerm ? (
              <>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  No products match your search
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  We couldn't find any products matching{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    "{searchTerm}"
                  </span>
                  . Try different keywords or check your spelling.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => setSearchTerm("")}
                    className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Clear Search
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Or try searching for:{" "}
                    <span className="font-medium">
                      materials, categories, or product names
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <h3 className="text-xl text-gray-500 dark:text-gray-400">
                No Products available
              </h3>
            )}
          </div>
        </motion.div>
      )}

      {/* Modals */}
      {isCreateModalOpen && (
        <ProductModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreate}
          mode="create"
          categories={categories}
          categoriesLoading={categoriesLoading}
        />
      )}

      {isUpdateModalOpen && selectedProduct && (
        <ProductModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleUpdate}
          mode="update"
          product={selectedProduct}
          categories={categories}
          categoriesLoading={categoriesLoading}
        />
      )}

      {/* Image Modal */}
      {showImageModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Product Images ({selectedProduct.imgUrls?.length || 0})
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {/* Image Gallery */}
              {selectedProduct.imgUrls && selectedProduct.imgUrls.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {selectedProduct.imgUrls.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-48 bg-gray-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
                        <LazyImage
                          src={imageUrl}
                          alt={`${selectedProduct.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          fallbackIcon={Package}
                        />
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteImage(selectedProduct.id, index)
                        }
                        disabled={deletingImageIndex === index}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white text-xs px-2 py-1 rounded-full transition-colors duration-200 flex items-center justify-center w-6 h-6"
                        title="Delete image"
                      >
                        {deletingImageIndex === index ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        ) : (
                          "✕"
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No images available
                  </p>
                </div>
              )}

              {/* Product Details */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Name:</strong> {selectedProduct.name}
                </p>
                <p>
                  <strong>Composition:</strong> {selectedProduct.composition}
                </p>
                <p>
                  <strong>Status:</strong> {selectedProduct.status}
                </p>
                {selectedProduct.material && (
                  <p>
                    <strong>Material:</strong> {selectedProduct.material}
                  </p>
                )}
                {selectedProduct.description && (
                  <p>
                    <strong>Description:</strong> {selectedProduct.description}
                  </p>
                )}
                <p>
                  <strong>Date Added:</strong>{" "}
                  {formatDate(selectedProduct.createdAt)}
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-neutral-700 flex justify-end">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-neutral-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-neutral-500 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
