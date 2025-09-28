"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "./ui/animated-modal";
import { motion } from "motion/react";
import Image from "next/image";

export function MaterialModal({ material, onOrder, isOpen, onOpenChange }) {
  const features = [
    {
      icon: "🧵",
      text: material.composition,
    },
    // {
    //   icon: "⚖️",
    //   text: material.specifications.weight,
    // },
    // {
    //   icon: "🌍",
    //   text: material.specifications.origin,
    // },
    // {
    //   icon: "✨",
    //   text: material.specifications.texture,
    // },
  ];

  // Use only the material's image from the database
  const image =
    material.imgUrl ||
    "https://res.cloudinary.com/daa4x7pfh/image/upload/v1756788507/Image_not_Available_2_k7h1ai.jpg";

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalBody>
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            {material.name}
            {/* <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
              {material.category}
            </span> */}
          </h4>
          <div className="flex justify-center items-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="rounded-xl p-2 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 overflow-hidden shadow-lg"
            >
              <Image
                src={image}
                alt={material.name}
                width={400}
                height={400}
                className="rounded-lg object-cover"
                priority
              />
            </motion.div>
          </div>
          {/* <div className="py-10 flex flex-wrap gap-4 items-start justify-center max-w-2xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-gray-50 dark:bg-neutral-800 rounded-lg px-4 py-2"
              >
                <span className="mr-2 text-xl">{feature.icon}</span>
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  {feature.text}
                </span>
              </div>
            ))}
          </div> */}
          <p className="text-neutral-600 dark:text-neutral-300 text-center max-w-xl mx-auto">
            {material.description}
          </p>
        </ModalContent>
        {/* <ModalFooter className="gap-4">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
          >
            Close
          </button>
          <button
            onClick={onOrder}
            className="bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black w-28"
          >
            Order Now
          </button>
        </ModalFooter> */}
      </ModalBody>
    </Modal>
  );
}
