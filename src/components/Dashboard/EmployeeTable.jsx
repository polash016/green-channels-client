"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Eye, User } from "lucide-react";
import { EmployeeModal } from "./EmployeeModal";
import LazyImage from "../ui/lazy-image";
import {
  useGetAllEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "../../redux/api/employeeApi";
import { toast } from "sonner";

export function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // API hooks
  const {
    data: employees,
    isLoading,
    error,
    refetch,
  } = useGetAllEmployeesQuery();
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  // Filter employees based on search term
  const filteredEmployees =
    employees?.data?.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (employee.description &&
          employee.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

  const handleCreate = async (formData) => {
    try {
      const formDataToSend = new FormData();

      // Add employee data
      const employeeData = {
        employee: {
          name: formData.name,
          designation: formData.designation,
          description: formData.description || "",
        },
      };

      formDataToSend.append("data", JSON.stringify(employeeData));

      // Add image if exists
      if (formData.image) {
        formDataToSend.append("file", formData.image);
      }

      const res = createEmployee(formDataToSend).unwrap();
      toast.promise(res, {
        loading: "Creating...",
        success: (res) => {
          if (res?.data?.id) {
            setIsCreateModalOpen(false);
            refetch();
            return res?.message || "Employee created successfully";
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
      toast.error("Failed to create employee");
      throw error;
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const formDataToSend = new FormData();

      // Add employee data
      const employeeData = {
        employee: {
          name: formData.name,
          designation: formData.designation,
          description: formData.description || "",
        },
      };

      formDataToSend.append("data", JSON.stringify(employeeData));

      // Add image if exists
      if (formData.image) {
        formDataToSend.append("file", formData.image);
      }

      const res = updateEmployee({
        data: formDataToSend,
        id: selectedEmployee.id,
      }).unwrap();

      toast.promise(res, {
        loading: "Updating...",
        success: (res) => {
          if (res?.data?.id) {
            setIsUpdateModalOpen(false);
            setSelectedEmployee(null);
            return res?.message || "Employee updated successfully";
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
      toast.error("Failed to update employee");
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id).unwrap();
      toast.success("Employee deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete employee");
    }
  };

  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setIsUpdateModalOpen(true);
  };

  const handleImageClick = (employee) => {
    setSelectedEmployee(employee);
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
          <Eye className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Error loading employees
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Failed to load employee data. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
          Employees
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: {filteredEmployees.length} employees
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, designation, or description..."
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
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
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
              {filteredEmployees.map((employee, index) => (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  {/* Image Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-neutral-600">
                        <LazyImage
                          src={employee.imgUrl}
                          alt={employee.name}
                          className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleImageClick(employee)}
                          fallbackIcon={User}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Name Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {employee.name}
                  </td>

                  {/* Designation Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {employee.designation}
                  </td>

                  {/* Description Column */}
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs">
                    <div className="line-clamp-2">
                      {employee.description || "No description provided"}
                    </div>
                  </td>

                  {/* Date Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(employee.createdAt)}
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openUpdateModal(employee)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="Edit Employee"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete Employee"
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
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No employees found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm
              ? "Try adjusting your search terms."
              : "Employee data will appear here."}
          </p>
        </div>
      )}

      {/* Modals */}
      {isCreateModalOpen && (
        <EmployeeModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreate}
          mode="create"
        />
      )}

      {isUpdateModalOpen && selectedEmployee && (
        <EmployeeModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedEmployee(null);
          }}
          onSubmit={handleUpdate}
          mode="update"
          employee={selectedEmployee}
        />
      )}

      {/* Image Modal */}
      {showImageModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Employee Image
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="w-full h-32 bg-gray-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
                <LazyImage
                  src={selectedEmployee.imgUrl}
                  alt={selectedEmployee.name}
                  className="w-full h-full object-contain"
                  fallbackIcon={User}
                />
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Name:</strong> {selectedEmployee.name}
                </p>
                <p>
                  <strong>Designation:</strong> {selectedEmployee.designation}
                </p>
                {selectedEmployee.description && (
                  <p>
                    <strong>Description:</strong> {selectedEmployee.description}
                  </p>
                )}
                <p>
                  <strong>Date Added:</strong>{" "}
                  {formatDate(selectedEmployee.createdAt)}
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
