"use client";
import { useGetAllEmployeesQuery } from "@/redux/api/employeeApi";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: employeesResponse,
    isLoading,
    error,
  } = useGetAllEmployeesQuery({
    searchTerm: searchTerm || undefined,
  });
  // Transform database employees to match the expected format for AnimatedTestimonials
  const transformedEmployees =
    employeesResponse?.data?.map((employee) => ({
      quote:
        employee.description ||
        "Our dedicated team member contributing to excellence.",
      name: employee.name,
      designation: employee.designation,
      src:
        employee.imgUrl ||
        "https://res.cloudinary.com/daa4x7pfh/image/upload/v1756788507/Image_not_Available_2_k7h1ai.jpg",
    })) || [];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">
            Failed to load employee data. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (transformedEmployees.length === 0) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="text-center">
          <p className="text-neutral-400 text-lg">
            {searchTerm
              ? "No employees found matching your search."
              : "No employees available at the moment."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search functionality */}
      <div className="max-w-md mx-auto mb-8">
        {/* <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-green-500"
        /> */}
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {transformedEmployees.map((employee, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative"
          >
            {/* Employee Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={employee.src}
                  alt={employee.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {employee.name}
                </h3>
                <p className="text-gray-700 font-semibold text-sm uppercase tracking-wide mb-3">
                  {employee.designation}
                </p>
                {employee.quote && (
                  <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                    {employee.quote}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
