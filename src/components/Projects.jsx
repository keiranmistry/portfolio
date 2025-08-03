"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Import Barlow font
import { Barlow } from 'next/font/google';
import { Exo_2 } from 'next/font/google';
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['700'],
});

function GlassCard({ children, ...props }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return (
    <div
      {...props}
      style={{
        ...(props.style || {}),
        backdropFilter: isClient ? 'blur(8px)' : undefined,
        WebkitBackdropFilter: isClient ? 'blur(8px)' : undefined,
      }}
    >
      {children}
    </div>
  );
}

export default function Projects() {

  const projects = [
    {
      title: "Stubook",
      description: "e",
      technologies: ["tech1", "tech2", "tech3"],
      github: "github link",
      image: "/globe.svg"
    },
    {
      title: "HDI vs. Happiness Analysis",
      description: "e",
      technologies: ["tech1", "tech2", "tech3"],
      github: "github link",
      image: "/api/placeholder/400/250"
    },
    {
      title: "TrackSite",
      description: "e",
      technologies: ["tech1", "tech2", "tech3"],
      github: "github link",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Soccer Tiki Taka Toe",
      description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and optimal performance.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://your-portfolio.vercel.app",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Portfolio",
      description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and optimal performance.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://your-portfolio.vercel.app",
      image: "/api/placeholder/400/250"
    }
  ];

  const headingRef = useRef(null);
  const [waveKey, setWaveKey] = useState(0);
  const hasAnimated = useRef(false);
  const [hasWaved, setHasWaved] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        controls.start('visible');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasWaved) {
          setWaveKey(k => k + 1);
          setHasWaved(true);
        }
      },
      { threshold: 0.5 }
    );
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, [hasWaved]);

  const word = 'projects';

  return (
    <section
      id="projects"
      className="py-20 bg-[url('/emirates.png')] bg-cover bg-center bg-no-repeat"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className={`text-6xl sm:text-8xl font-bold italic mb-4 ${barlow.className}`}
            style={{ display: 'inline-block' }}
          >
            <em>
              {word.split('').map((char, i) => (
                <span
                  key={waveKey + '-' + i}
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.4s cubic-bezier(0.77,0,0.175,1)',
                    animation: `waveUp 1.4s cubic-bezier(0.4,0,0.2,1) ${i * 0.19}s both`,
                  }}
                >
                  {char}
                </span>
              ))}
            </em>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className={`grid gap-10 ${projects.length % 2 === 1 ? 'sm:grid-cols-2 sm:justify-items-center' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {projects.map((project, idx) => (
            <div key={idx} className={`${projects.length % 2 === 1 && idx === projects.length - 1 ? 'sm:col-span-2 sm:w-1/2' : 'w-full'}`}>
            <GlassCard
              key={idx}
              className="w-full min-h-[540px] group shadow-xl transition-all pt-4 pb-4 rounded-2xl relative overflow-hidden backdrop-blur-md hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(120deg, rgba(255,255,255,0.22) 60%, rgba(255,255,255,0.10) 100%)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid transparent',
                transition: 'all 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(147, 51, 234, 0.3)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 0 20px rgba(147, 51, 234, 0.2), 0 0 40px rgba(59, 130, 246, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid transparent';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.18)';
              }}
            >
              <div className="relative z-10">
                <CardHeader>
                <div className="aspect-[16/9] w-full bg-muted rounded-xl mb-3 mt-0 mx-0 overflow-hidden min-h-[200px] max-h-[420px]">
                    {project.image ? (
                    <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                    />
                    ) : (
                        <span className="text-muted-foreground">No Image</span>
                    )}
            </div>
                  <CardTitle className={`text-3xl group-hover:text-primary transition-colors mb-1 ${barlow.className}`}>
                    <em>{project.title}</em>
                  </CardTitle>
                  <CardDescription className="text-lg mb-2" style={{ color: "#FCFCFC" }}>
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-base px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 text-lg py-3"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      GitHub
                    </Button>
                    {project.live && (
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="flex-1 text-lg py-3"
                        onClick={() => window.open(project.live, '_blank')}
                      >
                        Live
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </GlassCard>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes waveUp {
          0% { transform: translateY(0); }
          30% { transform: translateY(-0.19em); }
          60% { transform: translateY(0.09em); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
} 