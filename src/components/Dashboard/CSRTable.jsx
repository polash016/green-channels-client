"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
  Award,
  X,
} from "lucide-react";
import {
  useGetCSRsQuery,
  useCreateCSRMutation,
  useUpdateCSRMutation,
  useDeleteCSRMutation,
} from "../../redux/api/csrApi";
import { toast } from "sonner";
import CSRModal from "./CSRModal";
import LazyImage from "../ui/lazy-image";

export function CSRTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCSR, setSelectedCSR] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // API hooks
  const {
    data: csrs,
    isLoading,
    error,
    refetch,
  } = useGetCSRsQuery({
    searchTerm,
    page: 1,
    limit: 100,
  });
  const [createCSR] = useCreateCSRMutation();
  const [updateCSR] = useUpdateCSRMutation();
  const [deleteCSR] = useDeleteCSRMutation();

  console.log(csrs);

  // Filter CSRs based on search term
  const filteredCSRs =
    csrs?.data?.filter((csr) =>
      csr.icon.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleCreate = async (formData) => {
    try {
      const formDataToSend = new FormData();

      if (formData.image) {
        formDataToSend.append("file", formData.image);
      }

      console.log(formData);

      formDataToSend.append(
        "data",
        JSON.stringify({
          icon: "placeholder", // Will be replaced by server
        })
      );

      const res = await createCSR(formDataToSend).unwrap();
      toast.promise(Promise.resolve(res), {
        loading: "Creating...",
        success: (res) => {
          if (res?.data?.id) {
            setIsCreateModalOpen(false);
            refetch();
            return res?.message || "CSR icon created successfully";
          } else {
            return res?.message;
          }
        },
        error: (error) => {
          return error?.message || "Something went wrong";
        },
      });
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Failed to create CSR icon");
      throw error;
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const formDataToSend = new FormData();

      if (formData.image) {
        formDataToSend.append("file", formData.image);
      }

      formDataToSend.append(
        "data",
        JSON.stringify({
          icon: "placeholder", // Will be replaced by server
        })
      );

      const res = await updateCSR({
        id: selectedCSR.id,
        formData: formDataToSend,
      }).unwrap();
      toast.promise(Promise.resolve(res), {
        loading: "Updating...",
        success: (res) => {
          if (res?.data?.id) {
            setIsUpdateModalOpen(false);
            setSelectedCSR(null);
            refetch();
            return res?.message || "CSR icon updated successfully";
          } else {
            return res?.message;
          }
        },
        error: (error) => {
          return error?.message || "Something went wrong";
        },
      });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update CSR icon");
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCSR(id).unwrap();
      toast.success("CSR icon deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete CSR icon");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (csr) => {
    setSelectedCSR(csr);
    setIsUpdateModalOpen(true);
  };

  const handleImageClick = (csr) => {
    setSelectedCSR(csr);
    setShowImageModal(true);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Error loading CSR icons
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Failed to load CSR icons. Please try again.
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            CSR Icons
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your CSR certification icons
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add CSR Icon
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search CSR icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* CSR Icons Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredCSRs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-200 dark:border-blue-800">
              <Award className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              No CSR icons found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {searchTerm
                ? "No CSR icons match your search criteria. Try adjusting your search terms."
                : "Showcase your certifications and achievements by uploading CSR icons."}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                <Award className="w-4 h-4" />
                Upload CSR Icon
              </button>
            )}
          </div>
        ) : (
          filteredCSRs.map((csr) => (
            <motion.div
              key={csr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
            >
              <div className="p-6">
                {/* CSR Icon Display */}
                <div className="aspect-square mb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-colors">
                  <LazyImage
                    src={csr.icon}
                    alt="CSR Icon"
                    className="w-full h-full"
                    onClick={() => handleImageClick(csr)}
                    fallbackIcon={Award}
                    onError={() => {
                      console.log("Image failed to load:", csr.icon);
                    }}
                  />
                </div>

                {/* CSR Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        CSR Icon
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(csr.createdAt)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center space-x-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={() => handleImageClick(csr)}
                      className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                      title="View full size"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(csr)}
                      className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                      title="Edit CSR icon"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(csr.id)}
                      className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                      title="Delete CSR icon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Modals */}
      <CSRModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Upload CSR Icon"
        submitText="Upload"
      />

      <CSRModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedCSR(null);
        }}
        onSubmit={handleUpdate}
        initialData={selectedCSR}
        title="Update CSR Icon"
        submitText="Update"
      />

      {/* Image Preview Modal */}
      {showImageModal && selectedCSR && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-96 h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <LazyImage
                src={selectedCSR.icon}
                alt="CSR Icon Preview"
                className="w-full h-full object-contain"
                fallbackIcon={Award}
                onError={() => {
                  console.log(
                    "Preview image failed to load:",
                    selectedCSR.icon
                  );
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
