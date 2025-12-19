"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialModal } from "@/components/MaterialModal";
import { ZoomIn } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";

const MaterialShowcase = ({ materials }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Fetch products from API
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  // Use API data if available, otherwise fallback to default materials
  const displayMaterials = products?.data || [];

  // const categories = [
  //   "all",
  //   ...Array.from(
  //     new Set(displayMaterials.map((material) => material.status || "regular"))
  //   ),
  // ];

  // const filteredMaterials =
  //   activeCategory === "all"
  //     ? displayMaterials
  //     : displayMaterials.filter(
  //         (material) => (material.status || "regular") === activeCategory
  //       );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleZoomClick = (material) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  const handleOrder = (material) => {
    // Handle order logic here
  };

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Premium Materials
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our curated selection of high-quality fabrics and
            materials, sourced from the finest mills around the world.
          </p>
        </motion.div>

        {/* Commented out filter tabs for now */}
        {/* <Tabs defaultValue="all" className="mb-8">
          <TabsList className="flex justify-center mb-8 overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs> */}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">
              Failed to load products. Please try again later.
            </p>
          </div>
        )}

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {displayMaterials.map((material) => (
            <motion.div key={material.id} variants={itemVariants}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg dark:bg-neutral-800 dark:border-neutral-700 group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={material.imgUrl || material.image}
                    alt={material.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <motion.button
                      onClick={() => {
                        setSelectedMaterial(material);
                        setIsModalOpen(true);
                      }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-white/10 backdrop-blur-sm p-3 rounded-full cursor-pointer hover:bg-white/20 transition-colors"
                    >
                      <ZoomIn className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium dark:text-white">
                    {material.name}
                  </h3>
                  {/* {(material.composition ||
                    material.specifications?.composition) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {material.composition ||
                        material.specifications?.composition}
                    </p>
                  )} */}
                  {material.status && (
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        material.status === "PREMIUM"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {material.status}
                    </span>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedMaterial && (
        <MaterialModal
          material={selectedMaterial}
          onOrder={() => handleOrder(selectedMaterial)}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </section>
  );
};

export default MaterialShowcase;
