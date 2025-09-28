"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = ({
  title = "More than 35 years experience with Bangladesh's Garment Manufacturers",
  subtitle = "",
  ctaText = "Discover Our Collection",
  backgroundVideo = "https://res.cloudinary.com/dkwmxljjk/video/upload/v1755881572/WhatsApp_Video_2025-08-22_at_22.49.20_0fd6ffcf_e3yqan.mp4",
}) => {
  return (
    <section className="relative max-h-screen h-screen w-full overflow-hidden bg-gray-900">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
            {/* Fallback image if video fails to load */}
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=80"
              alt="Fashion background"
              className="w-full h-full object-cover"
            />
          </video>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              size="lg"
              href="/products"
              className="bg-white text-gray-900 hover:bg-gray-200 cursor-pointer text-base md:text-lg px-8 py-3 rounded-md"
            >
              {ctaText}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowDownIcon className="h-8 w-8 text-white opacity-80" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
