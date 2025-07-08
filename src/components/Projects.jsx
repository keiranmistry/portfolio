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
      image: "/globe.svg"
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [cardAnim, setCardAnim] = useState('idle');

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
  const selectedProject = projects[selectedIndex];

  const handlePrev = () => {
    if (cardAnim !== 'idle') return;
    setSwipeDirection('left');
    setPendingIndex((selectedIndex - 1 + projects.length) % projects.length);
    setCardAnim('collapsing');
  };
  const handleNext = () => {
    if (cardAnim !== 'idle') return;
    setSwipeDirection('right');
    setPendingIndex((selectedIndex + 1) % projects.length);
    setCardAnim('collapsing');
  };

  return (
    <section
      id="projects"
      className="py-20 bg-[url('/newwallpaper.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Main Project Card */}
        <div className="flex justify-center mb-10">
          <div
            className={`transition-all duration-300 w-full max-w-[1400px] min-h-[420px]
              ${cardAnim === 'collapsing' ? 'animate-card-collapse' : ''}
              ${cardAnim === 'expanding' ? 'animate-card-expand' : ''}
            `}
            onAnimationEnd={() => {
              if (cardAnim === 'collapsing') {
                setSelectedIndex(pendingIndex);
                setCardAnim('expanding');
              } else if (cardAnim === 'expanding') {
                setCardAnim('idle');
              }
            }}
          >
            <Card className="w-full min-h-[420px] group bg-white/30 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  {selectedProject.image ? (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-muted-foreground">No Image</span>
                  )}
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {selectedProject.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {selectedProject.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, techIndex) => (
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
                    onClick={() => window.open(selectedProject.github, '_blank')}
                  >
                    GitHub
                  </Button>
                  {selectedProject.live && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(selectedProject.live, '_blank')}
                    >
                      Live
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Carousel of Project Icons */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrev} 
            aria-label="Previous project"
            className={`bg-white/30 backdrop-blur-sm shadow transition-all duration-200 hover:bg-white/50${cardAnim !== 'idle' ? ' opacity-50 cursor-not-allowed' : ''}`}
            disabled={cardAnim !== 'idle'}
          >
            <span className="sr-only">Previous</span>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </Button>
          <div className="flex items-center justify-center" style={{ height: 72 }}>
            <button
              className="rounded-2xl shadow-2xl px-8 bg-white/30 backdrop-blur-sm transition-all duration-200 overflow-hidden focus:outline-none flex items-center justify-center w-[250px]"
              style={{ height: 72 }}
              aria-label={`Current project: ${projects[selectedIndex].title}`}
            >
              <span
                className={`font-bold text-xl text-center w-full truncate transition-all duration-200
                  ${cardAnim === 'collapsing' ? 'animate-card-collapse' : ''}
                  ${cardAnim === 'expanding' ? 'animate-card-expand' : ''}
                `}
              >
                {cardAnim === 'collapsing' && pendingIndex !== null
                  ? projects[selectedIndex].title
                  : projects[pendingIndex !== null && cardAnim !== 'idle' ? pendingIndex : selectedIndex].title}
              </span>
            </button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNext} 
            aria-label="Next project"
            className={`bg-white/30 backdrop-blur-sm shadow transition-all duration-200 hover:bg-white/50${cardAnim !== 'idle' ? ' opacity-50 cursor-not-allowed' : ''}`}
            disabled={cardAnim !== 'idle'}
          >
            <span className="sr-only">Next</span>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
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
        @keyframes swipe-left {
          0% { opacity: 1; transform: translateX(0); }
          40% { opacity: 0; transform: translateX(-60px); }
          60% { opacity: 0.25; transform: translateX(60px); }
          80% { opacity: 0.5; transform: translateX(60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes swipe-right {
          0% { opacity: 1; transform: translateX(0); }
          40% { opacity: 0; transform: translateX(60px); }
          60% { opacity: 0.25; transform: translateX(-60px); }
          80% { opacity: 0.5; transform: translateX(60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-swipe-left {
          animation: swipe-left 0.4s;
        }
        .animate-swipe-right {
          animation: swipe-right 0.4s;
        }
        @keyframes card-collapse {
          0% { opacity: 1; transform: scale(1); }
          20% { opacity: 0.7; transform: scale(0.97); }
          40% { opacity: 0.3; transform: scale(0.9); }
          100% { opacity: 0; transform: scale(0.85); }
        }
        @keyframes card-expand {
          0% { opacity: 0; transform: scale(0.85); }
          60% { opacity: 0; transform: scale(0.9); }
          80% { opacity: 0.7; transform: scale(0.97); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-card-collapse {
          animation: card-collapse 0.8s forwards cubic-bezier(0.4,0,0.2,1);
        }
        .animate-card-expand {
          animation: card-expand 0.8s forwards cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </section>
  );
} 