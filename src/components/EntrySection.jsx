"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { genericEntryIcons } from "@/components/icons/GenericEntryIcons";

export default function EntrySection({ label, entries }) {
  return (
    <section>
      <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <span className="font-mono text-primary/70">//</span> {label}
      </h2>

      <div className="space-y-1">
        {entries.map((entry) => {
          const GenericIcon = genericEntryIcons[entry.fallbackIcon] ?? genericEntryIcons.data;
          return (
          <motion.a
            key={entry.company}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="group relative -mx-2 flex w-full items-center gap-3 overflow-hidden rounded-lg px-2 py-2"
          >
            <span className="pointer-events-none absolute inset-0 -z-10 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-[0_0_8px_var(--primary)] transition-all duration-300 group-hover:h-5 group-hover:opacity-100" />

            <span className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-md border border-border bg-secondary opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:opacity-100">
              {entry.icon ? (
                <Image src={entry.icon} alt="" fill sizes="32px" className="object-contain p-1" />
              ) : (
                <GenericIcon className="h-full w-full p-1.5 text-muted-foreground" />
              )}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm">
              <span className="font-semibold text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                {entry.company}
              </span>
              <span className="text-muted-foreground/70 transition-colors duration-300 group-hover:text-muted-foreground">
                {" "}
                · {entry.title}
              </span>
            </span>
            <span className="flex-shrink-0 text-xs text-muted-foreground/60 transition-colors duration-300 group-hover:text-muted-foreground">
              {entry.period}
            </span>
            <svg
              className="h-3.5 w-3.5 flex-shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
            </svg>
          </motion.a>
          );
        })}
      </div>
    </section>
  );
}
