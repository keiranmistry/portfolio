"use client";
import { useEffect, Suspense, lazy, useState } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";

// Lazy load heavy components
const TravelMap = lazy(() => import("@/components/TravelMap"));
const Gallery = lazy(() => import("@/components/Gallery"));

export default function Home() {
  const [tocOpen, setTocOpen] = useState(false);
  const handleNav = (id) => {
    setTocOpen(false);
    if (typeof window !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <div className="min-h-screen">
      {/* Minimal top-left hamburger with table of contents */}
      <div className="fixed top-3 left-4 z-50 select-none">
        <button
          aria-label={tocOpen ? "Close menu" : "Open menu"}
          onClick={() => setTocOpen(v => !v)}
          className={`w-9 h-9 rounded-md bg-black/30 backdrop-blur-md border border-white/15 flex flex-col items-center justify-center gap-[3px] cursor-pointer hover:bg-black/40 active:scale-95 transition-transform duration-200 ${tocOpen ? 'rotate-90' : ''}`}
        >
          <span className={`w-5 h-[2px] bg-white/90 transition-all duration-200 ${tocOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
          <span className={`w-5 h-[2px] bg-white/90 transition-opacity duration-150 ${tocOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-5 h-[2px] bg-white/90 transition-all duration-200 ${tocOpen ? '-translate-y-[4px] -rotate-45' : ''}`} />
        </button>
        <div className={`origin-top-left mt-2 w-44 rounded-lg border border-white/15 bg-black/50 backdrop-blur-lg shadow-xl p-2 text-sm text-white/85 transform transition-all duration-200 ${tocOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
          <ul className="space-y-1">
              <li><a href="#home" className="block px-2 py-1 hover:text-white" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>Home</a></li>
              <li><a href="#projects" className="block px-2 py-1 hover:text-white" onClick={(e) => { e.preventDefault(); handleNav('projects'); }}>Projects</a></li>
              <li><a href="#experience" className="block px-2 py-1 hover:text-white" onClick={(e) => { e.preventDefault(); handleNav('experience'); }}>Experience</a></li>
              <li><a href="#travel" className="block px-2 py-1 hover:text-white" onClick={(e) => { e.preventDefault(); handleNav('travel'); }}>Travel</a></li>
              <li><a href="#gallery" className="block px-2 py-1 hover:text-white" onClick={(e) => { e.preventDefault(); handleNav('gallery'); }}>Gallery</a></li>
          </ul>
        </div>
      </div>
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Suspense fallback={<div className="py-20 bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center"><div className="text-white text-xl">Loading travel map...</div></div>}>
          <TravelMap />
        </Suspense>
        <Suspense fallback={<div className="py-20 bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center"><div className="text-white text-xl">Loading gallery...</div></div>}>
          <Gallery />
        </Suspense>
      </main>
    </div>
  );
}
