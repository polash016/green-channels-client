"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Mail,
  Phone,
  User,
  Calendar,
  Trash2,
  Eye,
  Download,
} from "lucide-react";
import {
  useGetAllContactsQuery,
  useDeleteContactMutation,
} from "../../redux/api/contactApi";
import { toast } from "sonner";

export function ContactForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Fetch contacts from API
  const {
    data: contacts,
    isLoading,
    error,
    refetch,
  } = useGetAllContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  // Filter contacts based on search term
  const filteredContacts =
    contacts?.data?.filter(
      (contact) =>
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.contactNo &&
          contact.contactNo.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

  const handleDelete = async (id) => {
    try {
      await deleteContact(id).unwrap();
      toast.success("Contact deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete contact");
      console.error("Delete error:", error);
    }
  };

  const handleImageClick = (contact) => {
    setSelectedContact(contact);
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
          <Mail className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Error loading contacts
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Failed to load contact submissions. Please try again.
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
          Contact Form Submissions
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total: {filteredContacts.length} submissions
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by email, subject, body, or contact number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Contacts Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700">
              {filteredContacts.map((contact, index) => (
                <motion.tr
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                  {/* Image Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-600">
                        {contact.imgUrl ? (
                          <img
                            src={contact.imgUrl}
                            alt="Contact attachment"
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleImageClick(contact)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Mail className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Contact Info Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {contact.email}
                        </span>
                      </div>
                      {contact.contactNo && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {contact.contactNo}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Subject Column */}
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {contact.subject}
                      </p>
                    </div>
                  </td>

                  {/* Message Column */}
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {contact.body}
                      </p>
                    </div>
                  </td>

                  {/* Date Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleImageClick(contact)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="View Image"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete Contact"
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
      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No submissions found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm
              ? "Try adjusting your search terms."
              : "Contact form submissions will appear here."}
          </p>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contact Image
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedContact.imgUrl}
                alt="Contact attachment"
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
              />
              <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Email:</strong> {selectedContact.email}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedContact.subject}
                </p>
                {selectedContact.contactNo && (
                  <p>
                    <strong>Contact:</strong> {selectedContact.contactNo}
                  </p>
                )}
                <p>
                  <strong>Date:</strong> {formatDate(selectedContact.createdAt)}
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-neutral-700 flex justify-end space-x-2">
              <a
                href={selectedContact.imgUrl}
                download
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
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
