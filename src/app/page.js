"use client";

import { motion } from "framer-motion";
import ThemeToggle from "@/components/theme-toggle";
import TravelEasterEgg from "@/components/TravelEasterEgg";
import EntrySection from "@/components/EntrySection";
import Projects from "@/components/Projects";
import { educationEntries, workEntries } from "@/lib/experienceData";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/keiranmistry/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.028-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.353V9h3.413v1.561h.049c.476-.9 1.637-1.852 3.367-1.852 3.599 0 4.263 2.368 4.263 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/keiranmistry",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:k3mistry@uwaterloo.ca",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z" />
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col sm:h-dvh sm:min-h-0 sm:overflow-hidden">
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center overflow-y-auto px-6 py-6 sm:py-8"
      >
        <motion.header variants={item} className="mb-5">
          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text font-[family-name:var(--font-display)] text-5xl font-semibold leading-none tracking-tight text-transparent sm:text-6xl"
          >
            Keiran Mistry
          </motion.h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Looking to build{" "}
            <span className="relative font-medium text-foreground">
              data-driven
              <span className="absolute inset-x-0 -bottom-0.5 h-px rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
            </span>{" "}
            software and machine learning products.
          </p>
        </motion.header>

        <div className="space-y-4">
          <motion.div variants={item}>
            <EntrySection label="Education" entries={educationEntries} />
          </motion.div>
          <motion.div variants={item}>
            <EntrySection label="Work" entries={workEntries} />
          </motion.div>
          <motion.div variants={item}>
            <Projects />
          </motion.div>
        </div>

        <motion.footer
          variants={item}
          className="mt-5 flex items-center justify-between border-t border-border pt-4"
        >
          <nav className="flex items-center gap-1">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.12, y: -1 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/70 transition-all duration-200 hover:bg-accent hover:text-foreground hover:shadow-[0_0_10px_-2px_var(--primary)]"
              >
                {social.icon}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <TravelEasterEgg />
            <ThemeToggle />
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
}
