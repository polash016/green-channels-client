"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useGetCSRsQuery } from "@/redux/api/csrApi";

export default function CSRPage() {
  const { data: csrData, isLoading, error } = useGetCSRsQuery();

  // Fallback certificates in case API fails or returns empty data
  const fallbackCertificates = [
    { name: "Accord", image: "/csr/Accord.png" },
    { name: "Better Cotton", image: "/csr/Better cotton.png" },
    { name: "Fair Trade", image: "/csr/Fairtrade.png" },
    { name: "Gots", image: "/csr/GOTS.png" },
    { name: "HIG Index", image: "/csr/HIG.png" },
    { name: "ISO", image: "/csr/ISO.png" },
    { name: "ISO 14001-2015", image: "/csr/ISO 1401-2015.jpg" },
    { name: "Organic 100 Content Standard", image: "/csr/Organic.png" },
    { name: "Recycled 100 Claim Standard", image: "/csr/Recyle.png" },
    { name: "RCS", image: "/csr/RCS.png" },
    { name: "Sedex", image: "/csr/Sadex.png" },
    { name: "RSC", image: "/csr/RSC.jpg" },
  ];

  // Use API data if available, otherwise fallback to static data
  const certificates =
    csrData?.data?.length > 0
      ? csrData.data.map((csr) => ({
          name: `CSR Certificate ${csr.id.slice(0, 8)}`, // Generate a name since CSR model only has icon
          image: csr.icon,
        }))
      : fallbackCertificates;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900/80 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading CSR certificates...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    console.error("Error fetching CSR data:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/80 via-neutral-900 to-neutral-950">
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
      <section className="py-20 px-4 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          ></motion.div>

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
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 h-40 flex flex-col items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15">
                  <div className="relative w-28 h-28 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90px, (max-width: 1024px) 120px, 140px"
                    />
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
