"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const LazyImage = ({
  src,
  alt,
  className = "",
  fallbackIcon: FallbackIcon = ImageIcon,
  onClick,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoaded(false);
    if (onError) onError(e);
  };

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <FallbackIcon className="w-12 h-12 text-gray-400" />
        </div>
      )}

      {/* Actual image */}
      {isInView && src && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${
            onClick ? "cursor-pointer hover:scale-105 transition-transform" : ""
          }`}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          loading="lazy"
          {...props}
        />
      )}

      {/* No image fallback */}
      {!src && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <FallbackIcon className="w-12 h-12 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;
