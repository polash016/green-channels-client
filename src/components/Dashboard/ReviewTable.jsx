"use client";

import { useState, useMemo, useTransition } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { ReviewModal } from "./ReviewModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createReview,
  updateReview,
  deleteReview,
} from "@/lib/actions";

export function ReviewTable({ initialReviews = [] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Filter reviews based on search term
  const filteredReviews = useMemo(() => {
    if (!searchTerm) return initialReviews;
    
    const lowerTerm = searchTerm.toLowerCase();
    return initialReviews.filter(
      (review) =>
        review.name.toLowerCase().includes(lowerTerm) ||
        review.title.toLowerCase().includes(lowerTerm) ||
        review.review.toLowerCase().includes(lowerTerm)
    );
  }, [initialReviews, searchTerm]);

  const handleCreate = async (formData) => {
    try {
      const reviewData = {
        review: {
          name: formData.name,
          title: formData.title,
          review: formData.review,
        },
      };

      startTransition(async () => {
        const res = await createReview(reviewData);
        if (res.success) {
          toast.success("Review created successfully!");
          setIsCreateModalOpen(false);
          router.refresh();
        } else {
          toast.error(res.error || "Failed to create review");
        }
      });
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Failed to create review");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const reviewData = {
        review: {
          name: formData.name,
          title: formData.title,
          review: formData.review,
        },
      };

      startTransition(async () => {
        const res = await updateReview(selectedReview.id, reviewData);
        if (res.success) {
          toast.success("Review updated successfully!");
          setIsUpdateModalOpen(false);
          setSelectedReview(null);
          router.refresh();
        } else {
          toast.error(res.error || "Failed to update review");
        }
      });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update review");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    startTransition(async () => {
      try {
        const res = await deleteReview(id);
        if (res.success) {
          toast.success("Review deleted successfully!");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to delete review");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete review");
      }
    });
  };

  const openUpdateModal = (review) => {
    setSelectedReview(review);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reviews
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: {filteredReviews.length} reviews
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, title, or review content..."
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Review
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
              {filteredReviews.map((review, index) => (
                <motion.tr
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  {/* Name Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {review.name}
                  </td>

                  {/* Title Column */}
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs">
                    <div className="line-clamp-1">{review.title}</div>
                  </td>

                  {/* Review Column */}
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-md">
                    <div className="line-clamp-3">{review.review}</div>
                  </td>

                  {/* Date Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(review.createdAt)}
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openUpdateModal(review)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="Edit Review"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete Review"
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

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No reviews found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm
              ? "Try adjusting your search terms."
              : "Review data will appear here."}
          </p>
        </div>
      )}

      {/* Modals */}
      {isCreateModalOpen && (
        <ReviewModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreate}
          mode="create"
        />
      )}

      {isUpdateModalOpen && selectedReview && (
        <ReviewModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedReview(null);
          }}
          onSubmit={handleUpdate}
          mode="update"
          review={selectedReview}
        />
      )}
    </div>
  );
}
