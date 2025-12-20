"use client";
import React, { useState, memo } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const Card = React.memo(({ card, index, hovered, setHovered }) => (
  <Link 
    href={card.slug ? `/products/${card.slug}` : "#"}
    className="block"
  >
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-80 sm:h-72 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={85}
        loading={index < 6 ? "eager" : "lazy"}
        priority={index < 3}
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-6 sm:py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-lg sm:text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
    <div className="mt-3 text-center">
      <div className="text-sm md:text-base font-medium text-neutral-200">
        {card.title}
      </div>
    </div>
  </Link>
));

Card.displayName = "Card";

export const FocusCards = memo(function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto px-4 md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.slug || index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
});
