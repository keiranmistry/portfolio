"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Stubook",
    shortDescription: "Cross-platform student productivity app",
    github: "https://github.com/keiranmistry/stubook",
  },
  {
    id: 2,
    title: "HDI vs. Happiness Analysis",
    shortDescription: "Statistical analysis of HDI vs. happiness scores",
    github: "https://github.com/keiranmistry/hdi-vs.-happiness",
  },
  {
    id: 3,
    title: "TrackSite",
    shortDescription: "Organizational workspace tool",
    github: "https://github.com/keiranmistry/tracksite",
    live: "https://tracksite.vercel.app",
  },
  {
    id: 4,
    title: "Soccer Tiki Taka Toe",
    shortDescription: "Dynamic soccer-themed tic-tac-toe game",
    github: "https://github.com/keiranmistry/tiki-taka-toe",
    live: "https://tiki-taka-toe-kappa.vercel.app/",
  },
  {
    id: 5,
    title: "Portfolio",
    shortDescription: "Personal portfolio website",
    github: "https://github.com/keiranmistry/portfolio",
  },
];

export default function Projects() {
  return (
    <section>
      <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <span className="font-mono text-primary/70">//</span> Projects
      </h2>

      <div className="space-y-1">
        {projects.map((project) => (
          <motion.a
            key={project.id}
            href={project.live || project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="group relative -mx-2 flex w-full items-center gap-3 overflow-hidden rounded-lg px-2 py-2"
          >
            <span className="pointer-events-none absolute inset-0 -z-10 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-[0_0_8px_var(--primary)] transition-all duration-300 group-hover:h-5 group-hover:opacity-100" />

            <span className="min-w-0 flex-1 truncate text-sm">
              <span className="font-semibold text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                {project.title}
              </span>
              <span className="text-muted-foreground/70 transition-colors duration-300 group-hover:text-muted-foreground">
                {" "}
                — {project.shortDescription}
              </span>
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
        ))}
      </div>
    </section>
  );
}
