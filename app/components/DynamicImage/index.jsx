"use client";
import { useEffect, useState } from "react";
import { Image as AntImage } from "antd";
import React from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

// Cache object for storing loaded animations
const animationCache = new Map();

const DynamicImageClient = ({
  src,
  alt,
  id,
  width,
  height,
  className,
  animType = "loading",
  transparent = false,
  antImage = false,
  onClick,
  placeholder,
  priority = false,
  preview = true,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [lottieAnimation, setLottieAnimation] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const currentSrc = React.useRef(src);
  const imageRef = React.useRef(null);
  const mounted = React.useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        // Check cache first
        if (animationCache.has(animType)) {
          setLottieAnimation(animationCache.get(animType));
          return;
        }

        const response = await fetch(`/anim/${animType}.lottie`);
        if (!response.ok) throw new Error("Failed to load animation");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Store in cache
        animationCache.set(animType, url);
        setLottieAnimation(url);
        setLoadError(false);
      } catch (error) {
        console.error("Animation loading error:", error);
        setLoadError(true);
      }
    };

    if (animType !== "loading" && animType !== "skeleton" && !lottieAnimation) {
      fetchAnimation();
    }

    // Cleanup function
    return () => {
      if (lottieAnimation && !animationCache.has(animType)) {
        URL.revokeObjectURL(lottieAnimation);
      }
    };
  }, [animType, lottieAnimation]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof self !== "undefined" &&
      animType !== "loading" &&
      animType !== "skeleton"
    ) {
      // Only load dotlottie player when actually needed and in browser environment
      import("@dotlottie/player-component").catch((error) => {
        console.warn("Failed to load dotlottie player:", error);
      });
    }
  }, [animType]);

  useEffect(() => {
    // Update the current source reference
    currentSrc.current = src;

    if (!src) {
      setLoading(true);
      return;
    }

    // Reset error state
    setLoadError(false);
    setLoading(true);

    // Check if image is already cached/loaded
    const img = new globalThis.Image();
    img.onload = () => {
      if (currentSrc.current === src && mounted.current) {
        setLoading(false);
      }
    };
    img.onerror = () => {
      if (currentSrc.current === src && mounted.current) {
        setLoading(false);
        setLoadError(true);
      }
    };
    img.src = src;

    // If image is already complete (cached), set loading to false immediately
    if (img.complete) {
      if (currentSrc.current === src && mounted.current) {
        setLoading(false);
      }
    }

    // Add a fallback timeout to prevent stuck loading state
    const timeoutId = setTimeout(() => {
      if (currentSrc.current === src && mounted.current) {
        setLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeoutId);
  }, [src]);

  const handleImageLoad = () => {
    if (currentSrc.current === src && mounted.current) {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    if (currentSrc.current === src && mounted.current) {
      setLoading(false);
      setLoadError(true);
    }
  };

  const anims = {
    cooking: {
      style: { width: "70%" },
      text: "درحال پخت و پز...",
    },
    hand: {},
  };

  return (
    <div
      className={`dark:bg-dark-700 bg-gray-300 overflow-hidden ${
        transparent && "!bg-transparent"
      } ${className}`}
      style={{ position: "relative" }}
    >
      {(!src || loading) && (
        <>
          {animType == "loading" ? (
            <div
              className={`w-full h-full  flex items-center justify-center overflow-hidden dark:bg-dark-700 bg-gray-300`}
            >
              <ClipLoader
                color="#6366F1"
                loading
                margin={3}
                speedMultiplier={1}
              />
            </div>
          ) : animType == "skeleton" ? (
            <div
              className={`w-full h-full animate-ping transition-all  flex items-center justify-center overflow-hidden dark:bg-dark-600 bg-gray-300`}
            ></div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center p-5 w-full h-full  dark:bg-dark-700 bg-gray-300`}
            >
              {lottieAnimation &&
                !loadError &&
                typeof window !== "undefined" && (
                  <dotlottie-player
                    autoplay
                    // controls
                    loop
                    playMode="normal"
                    src={lottieAnimation}
                    style={anims[animType]?.style}
                  ></dotlottie-player>
                )}
              <span className=" whitespace-nowrap">
                {anims[animType]?.text}
              </span>
            </div>
          )}
        </>
      )}
      {src && antImage ? (
        <AntImage
          unoptimized={true}
          ref={imageRef}
          priority={priority}
          id={id}
          key={src} // Add key prop to force remount
          preview={preview} // Disable preview for control
          className={`${className} transition-all duration-1000 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          loading={priority ? undefined : "lazy"}
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={onClick}
          placeholder={placeholder}
          // {...props}
        />
      ) : src && !antImage ? (
        <Image
          unoptimized={true}
          ref={imageRef}
          priority={priority}
          id={id}
          key={src} // Add key prop to force remount
          loading={priority ? undefined : "lazy"}
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`${className} transition-all duration-1000 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onClick={onClick}

          // {...props}
        />
      ) : null}
    </div>
  );
};

// The main component now acts as a wrapper that works in both server and client contexts
const DynamicImage = React.memo((props) => {
  return <DynamicImageClient {...props} />;
});

DynamicImage.displayName = "DynamicImage";

export default DynamicImage;
