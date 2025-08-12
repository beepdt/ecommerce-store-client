"use client";

import { Image as ImageType } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchMoveRef = useRef({ x: 0, y: 0 });
  const totalSlides = images.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentSlide) return;
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating, currentSlide]
  );

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 400);
  }, [totalSlides, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 400);
  }, [totalSlides, isAnimating]);

  // Touch/Swipe handlers
  const handleTouchStart = (e: TouchEvent | React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchMoveRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: TouchEvent | React.TouchEvent) => {
    const touch = e.touches[0];
    touchMoveRef.current = { x: touch.clientX, y: touch.clientY };

    const diffX = touchStartRef.current.x - touchMoveRef.current.x;
    const diffY = touchStartRef.current.y - touchMoveRef.current.y;

    // Prevent vertical scroll if horizontal swipe is detected
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    const diffX = touchStartRef.current.x - touchMoveRef.current.x;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      diffX > 0 ? nextSlide() : prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === "Escape") {
        // Optional: Add escape handler for modal-like behavior
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Handle image loading
  const handleImageLoad = useCallback((index: number) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  }, []);

  // Preload adjacent images
  useEffect(() => {
    const preloadImages = () => {
      const indicesToPreload = [
        (currentSlide - 1 + totalSlides) % totalSlides,
        currentSlide,
        (currentSlide + 1) % totalSlides,
      ];

      indicesToPreload.forEach((index) => {
        if (!imageLoaded[index]) {
          const img = new window.Image();
          img.onload = () => handleImageLoad(index);
          img.src = images[index]?.url;
        }
      });
    };

    if (images.length > 0) {
      preloadImages();
    }
  }, [currentSlide, totalSlides, images, imageLoaded, handleImageLoad]);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 space-x-8 lg:flex scroll-hide">
      {/* Desktop Thumbnails */}
      <div className="hidden lg:flex lg:flex-col gap-2 overflow-y-auto overflow-x-hidden pl-2 pr-6 py-2 w-32 max-h-100">
        {images.map((image, index) => (
          <button
            key={`thumb-${index}-${image.url}`}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`w-21 h-21 rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 border-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              index === currentSlide
                ? "border-foreground dark:border-background scale-105"
                : "border-transparent hover:border-gray-300"
            } ${isAnimating ? "pointer-events-none" : ""}`}
            aria-label={`Go to image ${index + 1}`}
          >
            <div className="relative h-full w-full">
              <Image
                fill
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover"
                sizes="84px"
                priority={index < 3}
                onLoad={() => handleImageLoad(index)}
              />
              {!imageLoaded[index] && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Main Gallery */}
      <div
        className="relative w-full rounded-xl border-2 dark:border-4 shadow-sm border-white dark:border-background/15 overflow-hidden min-w-[320px] xl:min-w-[480px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="img"
        aria-label={`Image ${currentSlide + 1} of ${totalSlides}`}
      >
        <div
          className={`flex h-full transition-transform duration-500 ease-out ${
            isAnimating ? "" : "transition-none"
          }`}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={`main-${index}-${image.url}`}
              className="flex-shrink-0 aspect-[4/5]  overflow-hidden w-full h-full relative"
            >
              <Image
                fill
                src={image.url}
                alt={`Product Image ${index + 1}`}
                className="object-cover select-none"
                draggable={false}
                priority={Math.abs(index - currentSlide) <= 1}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => handleImageLoad(index)}
              />
              {!imageLoaded[index] && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {totalSlides > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentSlide + 1} / {totalSlides}
          </div>
        )}
      </div>

      {/* Mobile Thumbnails */}
      <div className="flex lg:hidden overflow-x-auto gap-2 ">
        {images.map((image, index) => (
          <button
            key={`mobile-thumb-${index}-${image.url}`}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 border-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              index === currentSlide
                ? "border-foreground dark:border-background scale-105"
                : "border-transparent hover:border-gray-300"
            } ${isAnimating ? "pointer-events-none" : ""}`}
            aria-label={`Go to image ${index + 1}`}
          >
            <div className="h-full w-full relative">
              <Image
                fill
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover"
                sizes="96px"
                priority={index < 5}
                onLoad={() => handleImageLoad(index)}
              />
              {!imageLoaded[index] && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
