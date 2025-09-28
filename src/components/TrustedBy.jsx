"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrustedBy({
  logos = [
    { src: "/chub.png", name: "Chub" },
    { src: "/alstom.png", name: "Alstom" },
  ],
  groupSize = 1,
  intervalMs = 3000,
}) {
  const groups = useMemo(() => {
    const out = [];
    for (let i = 0; i < logos.length; i += groupSize) {
      out.push(logos.slice(i, i + groupSize));
    }
    return out.length ? out : [logos];
  }, [logos, groupSize]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((p) => (p + 1) % groups.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [groups.length, intervalMs]);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Trusted by the best companies
        </h2>
        <p className="mt-2 text-center text-blue-100">
          Companies that have been using our product from the very start.
        </p>

        <div className="relative mt-12 h-16 md:h-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -32, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center gap-10 md:gap-16"
            >
              {groups[idx].map((logo, i) => (
                <div
                  key={`${logo.src}-${i}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-12 md:h-10 object-contain drop-shadow-sm"
                  />
                  <span className="hidden md:inline text-white/80 text-sm font-medium">
                    {logo.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
