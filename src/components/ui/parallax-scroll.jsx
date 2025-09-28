"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const ParallaxScroll = ({ products, className }) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    // offset: ["start end", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -500]);

  const third = Math.ceil(products?.length / 3);
  const firstPart = products.slice(0, third);
  const secondPart = products.slice(third, 2 * third);
  const thirdPart = products.slice(2 * third);

  const ProductImage = ({ product, translateY }) => (
    <motion.div
      style={{ y: translateY }}
      initial={{ y: 0 }}
      className="relative group"
    >
      {/* <Link href={`/products/${product.id}`}> */}
      <div>
        <div className="relative overflow-hidden rounded-lg bg-white dark:bg-neutral-800 ">
          <img
            src={product.image}
            className="h-80 w-full object-cover object-center rounded-lg transition-transform duration-500 group-hover:scale-105"
            height="400"
            width="400"
            alt={product.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white text-lg font-medium mb-1">
                {product.name}
              </h3>
              <span className="inline-block text-xs text-white/80 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                {product.category}
              </span>
            </div>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </motion.div>
  );

  return (
    <div
      className={cn("w-[90%] mx-auto h-full relative", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-10 py-40">
        <motion.div className="grid gap-10" initial={{ y: 0 }}>
          {firstPart.map((product, idx) => (
            <ProductImage
              key={"grid-1" + idx}
              product={product}
              translateY={translateFirst}
            />
          ))}
        </motion.div>
        <motion.div className="grid gap-10" initial={{ y: 0 }}>
          {secondPart.map((product, idx) => (
            <ProductImage
              key={"grid-2" + idx}
              product={product}
              translateY={translateSecond}
            />
          ))}
        </motion.div>
        <motion.div className="grid gap-10" initial={{ y: 0 }}>
          {thirdPart.map((product, idx) => (
            <ProductImage
              key={"grid-3" + idx}
              product={product}
              translateY={translateThird}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
