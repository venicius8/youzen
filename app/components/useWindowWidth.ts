"use client";

import { useEffect, useState } from "react";

/**
 * React hook that tracks the current window innerWidth.
 * Handles initial server-side rendering safety and cleanup on unmount.
 */
export function useWindowWidth() {
  // Initialize with 0 on server, actual width on client to avoid hydration mismatch.
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    // Update width whenever the window is resized.
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
