"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CSRClient({ certificates }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full flex flex-col items-center justify-center py-60 px-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/csr.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center"></div>
      </motion.section>

      {/* Certificates Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our Certifications & Compliance
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              We maintain the highest standards of quality and ethical manufacturing through globally recognized certifications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="group relative"
              >
                <div className="bg-neutral-900/40 backdrop-blur-md rounded-2xl p-6 h-48 flex flex-col items-center justify-center border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-neutral-800/60 shadow-xl">
                  <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-contain filter brightness-110 contrast-110"
                      sizes="(max-width: 768px) 90px, (max-width: 1024px) 120px, 140px"
                    />
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
