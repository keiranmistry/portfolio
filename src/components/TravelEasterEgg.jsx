"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

const TravelMap = dynamic(() => import("@/components/TravelMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[560px] items-center justify-center text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
});

export default function TravelEasterEgg() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="A little travel easter egg"
        title="Where I've been"
        whileHover={{ scale: 1.12, y: -2, rotate: 12 }}
        whileTap={{ scale: 0.9, rotate: 20 }}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/70 transition-all duration-200 hover:bg-accent hover:text-primary hover:shadow-[0_0_10px_-2px_var(--primary)] cursor-pointer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-3xl rounded-2xl border border-border bg-card p-5 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={handleClose}
                aria-label="Close"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 450, damping: 20 }}
                className="absolute right-4 top-4 z-10 cursor-pointer text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              <div className="h-[500px] sm:h-[560px]">
                <TravelMap />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
