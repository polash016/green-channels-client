"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function OurMission() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/slider1.jpeg",
      alt: "Modern textile factory with machinery",
      overlay: "Responsible Sourcing",
    },
    // {
    //   image: "/slider2.jpeg",
    //   alt: "Textile workers in factory",
    //   overlay: "Expert Intermediation",
    // },
    // {
    //   image: "/slider3.jpeg",
    //   alt: "Quality control inspection",
    //   overlay: "Long-term Success",
    // },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="w-full py-20">
      {/* Test image - remove this after testing */}

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            We are committed to creating sustainable value through responsible
            business practices and expert intermediation.
          </p>
        </motion.div>

        {/* Mission Slider */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Slider */}
          <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  scale: currentSlide === index ? 1 : 1.1,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`absolute inset-0 ${
                  currentSlide === index ? "z-10" : "z-0"
                }`}
              >
                {/* Background Image */}
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-8">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mb-6"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <div className="w-10 h-10 bg-white rounded-lg opacity-90"></div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {slide.overlay}
                        </h3>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto"
                      >
                        <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                          "Our goal is to drive long-term business success by
                          aligning the interests of our customers and suppliers
                          through responsible sourcing and expert
                          intermediation."
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-blue-500 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + slides.length) % slides.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Additional Mission Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Responsible Sourcing",
              description:
                "We partner with suppliers who share our commitment to ethical practices, environmental stewardship, and social responsibility.",
              icon: "🌱",
            },
            {
              title: "Expert Intermediation",
              description:
                "Our 35+ years of experience enables us to bridge cultural and operational gaps between international buyers and local manufacturers.",
              icon: "🤝",
            },
            {
              title: "Long-term Success",
              description:
                "We focus on building sustainable partnerships that create lasting value for all stakeholders in the supply chain.",
              icon: "🚀",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
