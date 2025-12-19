"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export function Employee({ employees = [], isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Transform database employees to match the expected format
  const transformedEmployees =
    employees?.map((employee) => ({
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
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
              <Skeleton className="h-72 w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          ))}
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
              : "No employee data available."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Our Dedicated Team
        </h2>
        <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
          Meet the experts behind Green Channels Ltd. who ensure excellence in every step of our textile and garment sourcing process.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {transformedEmployees.map((employee, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden bg-neutral-200">
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
