"use client";
import { useEffect, Suspense, lazy } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load heavy components
const TravelMap = lazy(() => import("@/components/TravelMap"));
const Gallery = lazy(() => import("@/components/Gallery"));

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Suspense fallback={<div className="py-20 bg-gradient-to-br from-blue-900 to-blue-600"><LoadingSpinner message="Loading travel map..." /></div>}>
          <TravelMap />
        </Suspense>
        <Suspense fallback={<div className="py-20 bg-gradient-to-br from-blue-600 to-red-600"><LoadingSpinner message="Loading gallery..." /></div>}>
          <Gallery />
        </Suspense>
      </main>
    </div>
  );
}
