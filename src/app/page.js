"use client";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TravelMap from "@/components/TravelMap";
import Gallery from "@/components/Gallery";

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
        <TravelMap />
        <Gallery />
      </main>
    </div>
  );
}
