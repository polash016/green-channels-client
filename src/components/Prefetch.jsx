"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Cache for prefetched data
const dataCache = new Map();

/**
 * Enhanced Prefetch Component
 * Intelligently preloads routes, images, and API data in the background
 * Uses idle time detection and caches responses for instant navigation
 */
export function Prefetch() {
  const router = useRouter();
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let idleTimer;
    
    // Detect when user is idle (not interacting)
    const detectIdle = () => {
      clearTimeout(idleTimer);
      setIsIdle(false);
      
      // User is considered idle after 2 seconds of no interaction
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 2000);
    };

    // Listen for user activity
    window.addEventListener('mousemove', detectIdle);
    window.addEventListener('scroll', detectIdle);
    window.addEventListener('keydown', detectIdle);
    window.addEventListener('touchstart', detectIdle);

    // Initial idle detection
    detectIdle();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', detectIdle);
      window.removeEventListener('scroll', detectIdle);
      window.removeEventListener('keydown', detectIdle);
      window.removeEventListener('touchstart', detectIdle);
    };
  }, []);

  useEffect(() => {
    if (!isIdle) return;

    // Prefetch critical routes
    const prefetchRoutes = () => {
      const routes = ["/about", "/services", "/products", "/csr"];
      
      routes.forEach((route, index) => {
        setTimeout(() => {
          router.prefetch(route);
        }, index * 500); // Stagger prefetching to avoid overwhelming the network
      });
    };

    // Preload critical images
    const preloadImages = () => {
      const imagesToPreload = [
        "/about_us.jpeg",
        "/service.jpeg",
        "/csr.jpeg",
        "/logo.png",
      ];

      imagesToPreload.forEach((src, index) => {
        setTimeout(() => {
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.as = "image";
          link.href = src;
          document.head.appendChild(link);
        }, index * 300);
      });
    };

    // Prefetch product data from API
    const prefetchProductData = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      
      try {
        // Check if data is already cached
        if (dataCache.has('products')) {
          console.log('Products already cached');
          return;
        }

        // Prefetch products list (with limit for initial load)
        const productsResponse = await fetch(`${API_URL}/products?limit=20`);
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          dataCache.set('products', productsData);
          console.log('✅ Prefetched products data');
        }
      } catch (error) {
        console.log('Prefetch skipped (network/API issue)');
      }
    };

    // Prefetch categories data
    const prefetchCategoriesData = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      
      try {
        if (dataCache.has('categories')) {
          console.log('Categories already cached');
          return;
        }

        const categoriesResponse = await fetch(`${API_URL}/categories?limit=100`);
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          dataCache.set('categories', categoriesData);
          console.log('✅ Prefetched categories data');
        }
      } catch (error) {
        console.log('Category prefetch skipped');
      }
    };

    // Execute prefetching strategies in order of priority
    setTimeout(() => {
      prefetchRoutes();        // Priority 1: Routes
      preloadImages();         // Priority 2: Images
      
      // Wait a bit more before fetching data (lower priority)
      setTimeout(() => {
        prefetchProductData();   // Priority 3: Product data
        prefetchCategoriesData(); // Priority 4: Category data
      }, 2000);
    }, 1000); // Start after 1 second of being idle

  }, [isIdle, router]);

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

/**
 * Get cached data
 * Use this in your pages to retrieve prefetched data
 */
export function getCachedData(key) {
  return dataCache.get(key);
}

/**
 * Check if data is cached
 */
export function hasCachedData(key) {
  return dataCache.has(key);
}
