"use client";

import { useEffect, useRef } from 'react';

export default function PerformanceOptimizer() {
  const observerRef = useRef(null);

  useEffect(() => {
    // Optimize performance during zoom operations
    const optimizeForZoom = () => {
      // Add performance classes to elements that need optimization
      const elementsToOptimize = document.querySelectorAll('.backdrop-blur-md, .backdrop-blur-sm, .backdrop-blur-lg');
      
      elementsToOptimize.forEach(element => {
        element.classList.add('backdrop-optimized');
        element.classList.add('zoom-optimized');
      });

      // Optimize background images
      const backgroundElements = document.querySelectorAll('[style*="background"]');
      backgroundElements.forEach(element => {
        element.classList.add('bg-optimized');
      });

      // Optimize animated elements
      const animatedElements = document.querySelectorAll('[class*="animate-"], [class*="motion-"]');
      animatedElements.forEach(element => {
        element.classList.add('animate-optimized');
      });
    };

    // Run optimization on mount
    optimizeForZoom();

    // Set up intersection observer to optimize elements as they come into view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('layout-stable');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Optimize scroll performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Optimize elements during scroll
          const scrollElements = document.querySelectorAll('.zoom-optimized');
          scrollElements.forEach(element => {
            element.style.willChange = 'transform';
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null; // This component doesn't render anything
} 