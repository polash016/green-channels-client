"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * Prefetch Component
 * Preloads critical routes, images, and data in the background
 * for instant navigation and better UX
 */
export function Prefetch() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch critical routes in the background
    const prefetchRoutes = () => {
      // Wait a bit for the initial page to load first
      setTimeout(() => {
        // Prefetch all main navigation routes
        router.prefetch("/about");
        router.prefetch("/services");
        router.prefetch("/products");
        router.prefetch("/csr");
      }, 2000); // Wait 2 seconds after page load
    };

    // Preload critical images from other pages
    const preloadImages = () => {
      const imagesToPreload = [
        "/about_us.jpeg",
        "/service.jpeg",
        "/csr.jpeg",
        "/logo.png",
      ];

      imagesToPreload.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Execute prefetching
    prefetchRoutes();
    preloadImages();

    // Cleanup
    return () => {
      // No cleanup needed for prefetch
    };
  }, [router]);

  // This component doesn't render anything
  return null;
}

/**
 * Hidden Image Preloader
 * Preloads images by rendering them hidden
 */
export function ImagePreloader({ images = [] }) {
  return (
    <div style={{ display: "none" }} aria-hidden="true">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt=""
          width={1}
          height={1}
          priority={false}
        />
      ))}
    </div>
  );
}
