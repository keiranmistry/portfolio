"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from 'react';

// Import Barlow font
import { Barlow } from 'next/font/google';
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Projects() {
  const projects = [
    {
      title: "Project 1",
      description: "e",
      technologies: ["tech1", "tech2", "tech3"],
      github: "github link",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Project 2",
      description: "e",
      technologies: ["tech1", "tech2", "tech3"],
      github: "github link",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Project 3",
      description: "e",
      technologies: ["tech1", "tech2", "tech3"],
      github: "github link",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Portfolio Website",
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

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setWaveKey(k => k + 1);
          hasAnimated.current = true;
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
  }, []);

  const word = 'projects';

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-muted-foreground">Project Preview</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <Separator />
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/yourusername', '_blank')}>
            View All Projects on GitHub
          </Button>
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