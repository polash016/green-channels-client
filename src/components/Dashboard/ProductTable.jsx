"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Eye, Package } from "lucide-react";
import { ProductModal } from "./ProductModal";
import LazyImage from "../ui/lazy-image";
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteProductImageMutation,
} from "../../redux/api/productsApi";
import { toast } from "sonner";

export function ProductTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [deletingImageIndex, setDeletingImageIndex] = useState(null);

  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // API hooks with pagination and search
  const queryParams = {
    page: currentPage,
    limit: pageSize,
  };

  // Only add searchTerm if it exists and is not empty
  if (debouncedSearchTerm && debouncedSearchTerm.trim()) {
    queryParams.searchTerm = debouncedSearchTerm;
  }

  console.log("Frontend query params:", queryParams);

  const {
    data: productsResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery(queryParams);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteProductImage] = useDeleteProductImageMutation();

  // Extract products and pagination info
  const products = productsResponse?.data || [];
  const pagination = productsResponse?.meta || { page: 1, limit: 10, total: 0 };
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  // Pagination handlers
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  }, []);

  const handleCreate = async (formData) => {
    try {
      const formDataToSend = new FormData();

      console.log("formData", formData);

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

      const res = await createProduct(formDataToSend).unwrap();
      toast.success("Product created successfully!");
      setIsCreateModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Failed to create product");
      throw error;
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

      await updateProduct({
        id: selectedProduct.id,
        data: formDataToSend,
      }).unwrap();

      toast.success("Product updated successfully!");
      setIsUpdateModalOpen(false);
      setSelectedProduct(null);
      refetch();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product");
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
    }
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
    if (
      window.confirm(
        "Are you sure you want to delete this image? This action cannot be undone."
      )
    ) {
      setDeletingImageIndex(imageIndex);
      try {
        await deleteProductImage({
          productId,
          imageIndex,
        }).unwrap();
        toast.success("Image deleted successfully!");
        refetch();
        // Update the selected product to reflect the change
        if (selectedProduct && selectedProduct.id === productId) {
          const updatedProduct = { ...selectedProduct };
          updatedProduct.imgUrls = updatedProduct.imgUrls.filter(
            (_, index) => index !== imageIndex
          );
          setSelectedProduct(updatedProduct);
        }
      } catch (error) {
        console.error("Delete image error:", error);
        toast.error("Failed to delete image");
      } finally {
        setDeletingImageIndex(null);
      }
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  console.log("products", products);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Error loading products
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Failed to load product data. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Products
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: {pagination.total} products
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Show:
            </label>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
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
              {products.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
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
              {Math.min(currentPage * pageSize, pagination.total)} of{" "}
              {pagination.total} results
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
      {products.length === 0 && (
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
